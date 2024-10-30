import React from "react";
import { Button } from "@/components/ui/button";

const Record = () => {
  return (
    <div className="bg-red-500 h-full w-full">
      <div>
        <h1>Manage Your Records!</h1>
        <Button>Create new Record</Button>
      </div>
    </div>
  );
};

export default Record;
