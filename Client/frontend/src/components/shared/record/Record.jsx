import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalContext";
import SingleRecord from "./SingleRecord";

const Record = () => {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/record",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(response.data.data.records);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRecords();
  }, []);

  return (
    <div className="bg-red-500 h-full w-full">
      <div>
        <h1>Manage Your Records!</h1>
        <Button>Create new Record</Button>
        <SingleRecord records={records} />
      </div>
    </div>
  );
};

export default Record;
