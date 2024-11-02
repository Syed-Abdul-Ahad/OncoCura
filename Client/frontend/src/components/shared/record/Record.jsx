import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import SingleRecord from "./SingleRecord";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import style from "../../../Styles/Record.module.css";

const Record = () => {
  const [records, setRecords] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const getAllRecords = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/record", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(response.data.data.records);
      console.log("response : ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/record",
        {
          recordName: folderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllRecords();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  useEffect(() => {
    getAllRecords();
  }, [token]);

  return (
    <>
      <div className="flex flex-col gap-10 h-[80vh] w-[80%] ml-40 mt-2 p-10">
        <div className="flex flex-col">
          <div>
            <h1 className="text-4xl text-center">Manage Your Records!</h1>
          </div>
          <div className="w-full mt-10 text-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-slate-700 text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Add New Record
                </Button>
              </DialogTrigger>
              <DialogContent className={`sm:max-w-[425px] ${style.bgColor}`}>
                <DialogHeader>
                  <DialogTitle>Create New Record</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="name" className="text-left text-black">
                      Name
                    </Label>
                    <Input
                      id="name"
                      onChange={(e) => {
                        setFolderName(e.target.value);
                      }}
                      className="col-span-3 text-black"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Create Record
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="h-full">
          <SingleRecord records={records} />
        </div>
      </div>
    </>
  );
};

export default Record;
