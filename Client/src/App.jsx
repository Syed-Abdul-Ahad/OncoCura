import React from "react";
import LoginPage from "./Pages/login/loginPage";
import SignUp from "./Pages/signup/signupPage";
import UserProfilePage from "./Pages/UserProfile/userProfilePage";
import Records from "./Pages/record/recordPage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-profile/:id" element={<UserProfilePage />} />
        <Route path="/records" element={<Records />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
