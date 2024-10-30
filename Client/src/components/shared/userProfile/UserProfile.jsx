import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";

const UserProfile = () => {
  const params = useParams();
  console.log("params : ", params);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfileById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/get-user-by-id/${params?.id}`
        );
        setUser(response?.data?.user);
        console.log("response.data : ", response.data);
      } catch (err) {
        console.log("Error : ", err);
      }
    };

    getProfileById();
  }, []);

  console.log("user : ", user);

  return (
    <div className="flex flex-col gap-2 w-full h-full bg-[#F0F0F0] justify-center items-center py-10">
      <div className="relative w-[80%] max-w-[1267px] h-auto p-6 bg-white rounded-[25px] shadow-[3px_3px_40px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col w-full h-full gap-20 ml-14 mt-10 mb-12">
          <div className="flex flex-row items-center mb-4">
            <div className="w-20 h-20 bg-blue-700 rounded-lg mr-4 items-center text-center text-6xl text-white">
              <p className="mt-2 font-normal">
                {(user?.name && user?.name.at(0)?.toUpperCase()) || ""}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold capitalize">{user.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-10">
            <h1 className="text-xl font-semibold mb-2">Personal Details</h1>
            <div className="flex flex-row gap-48 ">
              <div className="flex flex-col w-2/6 ">
                <InputWithLabel label="Name" placeholder="Johnny Johnny" />
              </div>
              <div className="flex flex-col w-2/6">
                <InputWithLabel
                  label="Email"
                  placeholder="example123@gmail.com "
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-2 gap-[46rem] w-3/4 ">
            <Button className="bg-transparent text-black px-4 py-6 rounded-lg border border-black">
              Discard Changes
            </Button>
            <Button className=" text-white bg-blue-700 px-4 py-6 rounded-lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* new password */}
      <div className="w-[80%] max-w-[1267px] h-[655px] mt-10 mb-10 bg-white rounded-[25px] shadow-[3px_3px_40px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col w-full h-full gap-12 p-8 ml-12 mt-12">
          <h1 className="text-2xl font-semibold mb-2 ">Change Password</h1>
          <div className="flex flex-col gap-10 w-full">
            <InputWithLabel
              label="Old Password"
              type="password"
              placeholder="Enter current password"
              style="w-5/6"
            />
            <InputWithLabel
              label="New Password"
              type="password"
              placeholder="Enter new password"
              style="w-5/6"
            />
            <InputWithLabel
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              style="w-5/6"
            />
          </div>
          <div className="flex flex-row flex-2 gap-[42rem] w-3/4">
            <Button className="bg-transparent text-black px-4 py-6 rounded-lg border border-black">
              Discard Changes
            </Button>
            <Button className=" text-white bg-blue-700 px-4 py-6 rounded-lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
