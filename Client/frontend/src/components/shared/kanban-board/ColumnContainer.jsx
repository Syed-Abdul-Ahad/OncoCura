import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { IconPlus, IconTrash } from "@tabler/icons-react";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // // Positioning the column
  // const positionStyle = {
  //   position: 'absolute',
  //   top: '42px', // 32 pixels from the top
  //   left: '32px', // 32 pixels from the left
  // };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-[#1c1c24] opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      // complete columns
      className="rounded-2xl border flex h-[420px] max-h-[500px] w-[280px] flex-col bg-white shadow-lg relative top-32 left-40"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md m-2 flex h-[40px] mt-3 cursor-grab items-center justify-between rounded-xl bg-[#F0F0F0] p-3 font-bold font-poppins text-black "
      >
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <input
              className="rounded border px-2 outline-none border-[#004DFF] focus:border-green-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="rounded stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor hover:stroke-white"
        >
          <IconTrash className="text-[#004DFF]" />
        </button>
      </div>
      {/* add task portion */}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2 bg-white  shadow-lg">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* create task with icon */}
      <button
        className="flex items-center gap-2 text-black rounded-md bg-white   shadow-lg p-4 hover:text-[#004DFF] active:bg-[#F0F0F0] h-[40px] text-xs font-bold font-poppins relative"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <IconPlus className="h-[20px] w-[20px]" />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
