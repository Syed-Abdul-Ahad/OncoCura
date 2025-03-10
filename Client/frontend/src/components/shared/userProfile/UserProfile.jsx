import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import style from "../../../Styles/UserProfile.module.css";
import { ProfileLoader } from "../../common/Loader";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [info, setInfo] = useState({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getProfileById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/get-user-by-id/${params?.id}`
        );

        setUser(response?.data?.user);
      } catch (err) {
        console.log("Error : ", err);
      }
    };

    getProfileById();
  }, []);

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/v1/users/changePassword",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Password changed successfully");
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      alert("Failed to change password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };


  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name: info.name,
        email: info.email,
      };

      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/update-user`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 'success') {
        alert('Profile updated successfully');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };


  return (
    <div className="flex flex-col gap-2 w-full h-full  justify-center items-center py-10">
      <div className="relative w-[100%] max-w-[1267px] h-auto p-6 bg-white rounded-[25px] shadow-[5px_5px_40px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col w-full h-full gap-20 ml-14 mt-10 mb-12">
          <div className="flex flex-row items-center mb-4">
            {user.name ? (
              <div className="w-20 h-20 bg-blue-700 rounded-lg mr-4 items-center text-center text-6xl text-white">
                <p className="mt-2 font-normal">
                  {(user?.name && user?.name.at(0)?.toUpperCase()) || ""}
                </p>
              </div>
            ) : (
              <div className="w-64">
                <ProfileLoader />
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold capitalize">{user.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-10">
            <h1 className="text-xl font-semibold mb-2">Personal Details</h1>
            <div className="flex flex-row gap-56 ">
              <div className="flex flex-col w-2/6 ">
                <InputWithLabel label="Name" placeholder="Johnny Johnny"
                  value={info.name || ''}
                  onChange={(e) => setInfo({ ...user, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col w-2/6">
                <InputWithLabel
                  label="Email"
                  placeholder="example123@gmail.com "
                  value={info.email || ''}
                  onChange={(e) => setInfo({ ...user, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-2 gap-[50rem] w-3/4 ">
            <Button className="bg-transparent text-black px-4 py-6 rounded-lg border border-black"
              onClick= {()=> setInfo({})}
            >
              Discard Changes
            </Button>
            <Button
              className={`${style.btnColor}  text-white px-4 py-6 rounded-lg`}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* new password */}
      <div className="w-[100%] max-w-[1267px] h-[655px] mt-10 mb-10 bg-white rounded-[25px] shadow-[3px_3px_40px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col w-full h-full gap-12 p-8 ml-12 mt-12">
          <h1 className="text-2xl font-semibold mb-2 ">Change Password</h1>
          <div className="flex flex-col gap-10 w-full">
            <InputWithLabel
              label="Old Password"
              type="password"
              placeholder="Enter current password"
              style="w-5/6"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleInputChange}
            />
            <InputWithLabel
              label="New Password"
              type="password"
              placeholder="Enter new password"
              style="w-5/6"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
            <InputWithLabel
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              style="w-5/6"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row flex-2 gap-[46rem] w-3/4">
            <Button className="bg-transparent text-black px-4 py-6 rounded-lg border border-black">
              Discard Changes
            </Button>
            <Button
              className={`${style.btnColor}  text-white px-4 py-6 rounded-lg`}
              onClick={handleChangePassword}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
