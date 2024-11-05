import { useGlobalContext } from "@/context/GlobalContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { mergeColumns, mergeTasks } from "../utils/kanbanUtils";

export default function useKanbanData({ setColumns, setTasks, token }) {
  const params = useParams();

  const fetchKanbanData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/kanban/generate-kanban",
        {
          analysisResult: "Your analysis result here",
        }
      );

      const existingRecordsResponse = await axios.get(
        `http://localhost:3000/api/v1/record/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const existingRecords =
        existingRecordsResponse.data.data.record?.kanbanRecords;

      const mergedColumns = mergeColumns(
        existingRecords?.columns,
        response.data.columns
      );
      const mergedTasks = mergeTasks(
        existingRecords?.tasks,
        response.data.tasks
      );

      setColumns(mergedColumns);
      setTasks(mergedTasks);
    } catch (error) {
      console.error("Error fetching Kanban data:", error);
    }
  };

  return { fetchKanbanData };
}
