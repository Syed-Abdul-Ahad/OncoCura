import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/login/loginPage";
import SignUp from "./Pages/signup/signupPage";
import UserProfilePage from "./Pages/UserProfile/userProfilePage";
import Records from "./Pages/record/recordPage";
import KanbanBoard from "./Pages/kanban-board/kanban-board";
import Home from "./Pages/Home/Home";
import RootLayout from "./layout/RootLayout";
import { GlobalProvider } from "./context/GlobalContext";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-profile/:id" element={<UserProfilePage />} />
        <Route path="/records" element={<Records />} />
        <Route path="generate-plan" element={<KanbanBoard />} />
      </Route>
    )
  );

  return (
    <>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </>
  );
};

export default App;
