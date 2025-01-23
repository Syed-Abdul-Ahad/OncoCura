import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import SingleRecord from "./SingleRecord";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import style from "../../../Styles/Record.module.css";
import { useGlobalContext } from "@/context/GlobalContext";

const Record = () => {
  const [folderName, setFolderName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const { getAllRecords, records } = useGlobalContext();

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
    <div className="flex flex-col gap-10 h-[100%] w-[100%] ml-26 justify-center mt-2 p-10 ">
      <div className="flex flex-col">
        <div className="ml-[-5rem]">
          <h1 className="text-4xl text-center">Manage Your Records!</h1>
        </div>
        <div className="w-full mt-10 text-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className={`bg-slate-700 text-white rounded-lg text-sm ${style.btnColor}`}
                onClick={() => setIsDialogOpen(true)}
              >
                <span className="mr-2 text-lg">+</span> Add New Record
              </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[425px] ${style.bgColor}`}>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Create a New Record!
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="text-left text-black text-lg"
                  >
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
                  <Button
                    type="submit"
                    className={`w-full py-3 mt-4 ${style.btnColor}`}
                  >
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
  );
};

export default Record;
