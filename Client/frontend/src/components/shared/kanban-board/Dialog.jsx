import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import style from "../../../Styles/KanbanBoard.module.css";
import { Description } from "@radix-ui/react-dialog";

export function Dialogs({
  isDialogOpen,
  dialogType,
  dialogInput,
  setDialogInput,
  onSubmit,
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={() => {}}>
      <DialogContent
        className={`w-full max-w-md mx-auto p-6 rounded-lg shadow-lg ${style.dialogBgColor}`}
      >
        <DialogTitle className="text-lg font-semibold text-gray-700 mb-4">
          {dialogType === "newColumn" ? "Add Column" : "Add Task"}
        </DialogTitle>
        <Description>
          {dialogType === "newColumn"
            ? "Enter the title of the new column"
            : "Enter the title of the new task"}
        </Description>

        <input
          type="text"
          value={dialogInput}
          onChange={(e) => setDialogInput(e.target.value)}
          placeholder="Enter text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
