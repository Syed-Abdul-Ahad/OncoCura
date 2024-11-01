import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
    <div className=" flex flex-col gap-10  bg-red-500 h-full w-full mt-20 ">
      <div>
        <h1>Manage Your Records!</h1>
        <Button>Create new Record</Button>
      </div>
      <div>
        <SingleRecord records={records} />
      </div>
    </div>
  );
};

export default Record;
