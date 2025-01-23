export function mergeColumns(existingColumns = [], newColumns = []) {
  const existingIds = new Set(existingColumns.map((col) => col.id));
  return [
    ...existingColumns,
    ...newColumns.filter((col) => !existingIds.has(col.id)),
  ];
}

export function mergeTasks(existingTasks = [], newTasks = []) {
  const existingIds = new Set(existingTasks.map((task) => task.id));
  return [
    ...existingTasks,
    ...newTasks.filter((task) => !existingIds.has(task.id)),
  ];
}

export function updateKanbanRecords(columns, tasks, token, recordId) {
  axios
    .put(
      `http://localhost:3000/api/v1/record/${recordId}`,
      {
        kanbanRecords: {
          columns,
          tasks,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Updated Kanban records:", response);
    })
    .catch((error) => {
      console.error("Error updating Kanban records:", error);
    });
}
