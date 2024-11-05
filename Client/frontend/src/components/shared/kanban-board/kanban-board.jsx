import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function KanbanBoard({ state }) {
  const { records, getAllRecords, token } = useGlobalContext();
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogInput, setDialogInput] = useState("");
  const [dialogColumnId, setDialogColumnId] = useState(null);

  const params = useParams();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const columnsId = useMemo(
    () => (columns && columns?.map((col) => col?.id)) || "",
    [columns]
  );

  let item = records.find((item) => item._id === params.id);

  useEffect(() => {
    const fetchRecords = async () => {
      await getAllRecords();
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    const fetchKanbanData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/kanban/generate-kanban",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              analysisResult: "Your analysis result here",
            }),
          }
        );

        const data = await response.json();

        const existingRecordsResponse = await axios.get(
          `http://localhost:3000/api/v1/record/${params?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const existingRecords =
          existingRecordsResponse.data.data.record?.kanbanRecords;

        const mergedColumns = mergeColumns(
          existingRecords?.columns,
          data?.columns
        );
        const mergedTasks = mergeTasks(existingRecords?.tasks, data?.tasks);

        setColumns(mergedColumns);
        setTasks(mergedTasks);

        await updateKanbanRecords(mergedColumns, mergedTasks);
      } catch (error) {
        console.log("error : ", error);
      }
    };

    fetchKanbanData();
  }, [params.id, token]);

  const openDialog = (type, columnId = null) => {
    setDialogType(type);
    setDialogInput("");
    setDialogColumnId(columnId);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async () => {
    if (!dialogInput) return; // avoid empty inputs

    if (dialogType === "newColumn") {
      const newColumn = { id: generateId(), title: dialogInput };
      const updatedColumns = [...columns, newColumn];
      setColumns(updatedColumns);
      await updateKanbanRecords(updatedColumns, tasks);
    } else if (dialogType === "newTask" && dialogColumnId) {
      const newTask = {
        id: generateId(),
        columnId: dialogColumnId,
        content: dialogInput,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await updateKanbanRecords(columns, updatedTasks);
    } else if (dialogType === "updateColumn") {
      const updatedColumns = columns.map((col) =>
        col.id === activeColumn.id ? { ...col, title: dialogInput } : col
      );
      setColumns(updatedColumns);
      await updateKanbanRecords(updatedColumns, tasks);
    } else if (dialogType === "updateTask") {
      const updatedTasks = tasks.map((task) =>
        task.id === activeTask.id ? { ...task, content: dialogInput } : task
      );
      setTasks(updatedTasks);
      await updateKanbanRecords(columns, updatedTasks);
    }

    setIsDialogOpen(false); // close dialog after submission
  };

  const mergeColumns = (existingColumns, newColumns) => {
    const existingIds = new Set(
      existingColumns && existingColumns?.map((col) => col?.id)
    );
    return [
      ...(existingColumns || []),
      ...newColumns?.filter((newCol) => !existingIds.has(newCol.id)),
    ];
  };

  const mergeTasks = (existingTasks, newTasks) => {
    const existingIds = new Set(
      existingTasks && existingTasks?.map((task) => task.id)
    );
    return [
      ...(existingTasks || []),
      ...newTasks?.filter((newTask) => !existingIds.has(newTask.id)),
    ];
  };

  const updateKanbanRecords = async (mergedColumns, mergedTasks) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/record/${params?.id}`,
        {
          kanbanRecords: { columns: mergedColumns, tasks: mergedTasks },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setColumns(mergedColumns);
      setTasks(mergedTasks);
    } catch (error) {
      console.error("Error updating Kanban records:", error);
    }
  };

  const createNewColumn = () => openDialog("newColumn");

  const createTask = (columnId) => openDialog("newTask", columnId);

  const onDragEnd = async (event) => {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    const isActiveATask = active.data.current?.type === "Task";

    if (isActiveAColumn) {
      setColumns((prevColumns) => {
        const activeIndex = prevColumns.findIndex(
          (col) => col.id === active.id
        );
        const overIndex = prevColumns.findIndex((col) => col.id === over.id);
        const newColumns = arrayMove(prevColumns, activeIndex, overIndex);
        updateKanbanRecords(newColumns, tasks); // Trigger update here
        return newColumns;
      });
    } else if (isActiveATask) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === active.id);
        const overIndex = prevTasks.findIndex((t) => t.id === over.id);
        const newTasks = [...prevTasks];

        // If moving to a different column
        if (newTasks[activeIndex].columnId !== over.data.current?.columnId) {
          newTasks[activeIndex].columnId = over.data.current.columnId;
        }

        // Update the tasks with new ordering
        const reorderedTasks = arrayMove(newTasks, activeIndex, overIndex);
        updateKanbanRecords(columns, reorderedTasks); // Trigger update here
        return reorderedTasks;
      });
    }
  };

  return (
    <div className="mt-5 h-[200vh] min-h-screen w-72 ml-[-5rem] text-white">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex absolute mt-16 ml-[13rem]  ">
          <p className="font-poppins font-bold text-3xl text-black relative left-80">
            View Generated Plan!
          </p>
        </div>
        <div>
          <button
            onClick={() => openDialog("newColumn")}
            className="flex mb-10 h-[60px] w-[200px] min-w-[200px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-[#004DFF] hover:ring-2 relative top-32 ml-[70rem] text-[#004DFF]"
          >
            Add Column
          </button>
        </div>
        <div className="flex gap-4 flex-wrap w-[90vw]">
          <div className="flex gap-4 flex-wrap ">
            <SortableContext items={columnsId}>
              {columns &&
                columns?.map((col) => (
                  <ColumnContainer
                    openDialog={openDialog}
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={
                      tasks && tasks?.filter((task) => task.columnId === col.id)
                    }
                  />
                ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={
                  tasks &&
                  tasks?.filter((task) => task?.columnId === activeColumn?.id)
                }
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document?.body
        )}
      </DndContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md p-6  bg-white rounded-lg shadow-lg">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {dialogType.includes("Column") ? "Column" : "Task"}{" "}
            {dialogType.includes("new") ? "Creation" : "Update"}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            {dialogType.includes("new") ? "Enter new " : "Update"}{" "}
            {dialogType.includes("Column") ? "column title" : "task content"}.
          </DialogDescription>
          <input
            type="text"
            value={dialogInput}
            onChange={(e) => setDialogInput(e.target.value)}
            className="mt-4 w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none transition"
            placeholder={`Enter ${
              dialogType.includes("Column") ? "column title" : "task content"
            }`}
          />
          <div className="flex items-center justify-end mt-6 space-x-3">
            <DialogClose asChild>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDialogSubmit}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  function deleteTask(id) {
    const newTasks = tasks?.filter((task) => task?.id !== id);
    setTasks(newTasks);
  }

  function updateColumn(id) {
    const newTitle = prompt("Enter new column title:");
    if (!newTitle) return; // Prevent empty titles

    const updatedColumns = columns.map((col) =>
      col.id === id ? { ...col, title: newTitle } : col
    );
    setColumns(updatedColumns);
    updateKanbanRecords(updatedColumns, tasks);
  }

  // Update an existing task's content
  function updateTask(id) {
    const newContent = prompt("Enter new task content:");
    if (!newContent) return; // Prevent empty content

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, content: newContent } : task
    );
    setTasks(updatedTasks);
    updateKanbanRecords(columns, updatedTasks);
  }

  function deleteColumn(id) {
    setColumns(columns?.filter((col) => col?.id !== id));
    setTasks(tasks?.filter((task) => task?.columnId !== id));
  }

  // function updateColumn(id, title) {
  //   setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)));
  // }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);
          updateKanbanRecords(columns, reorderedTasks); // Trigger update here
          return reorderedTasks;
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else if (isActiveATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        tasks[activeIndex].columnId = over.id;
        updateKanbanRecords(columns, tasks); // Trigger update here
        return [...tasks];
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}
