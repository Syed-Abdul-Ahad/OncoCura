import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Pages/login/loginPage";
import SignUp from "./Pages/signup/signupPage";
import UserProfilePage from "./Pages/UserProfile/userProfilePage";
import Records from "./Pages/record/recordPage";
import KanbanBoardPage from "./Pages/kanban-board/kanban-board";
import KanbanBoard from "./components/shared/kanban-board/kanban-board";
import Home from "./Pages/Home/Home";
import RootLayout from "./layout/RootLayout";
import { GlobalProvider } from "./context/GlobalContext";
import Collection from "./Pages/e-commerce/Collection";
import ShopContextProvider from "./context/ShopContextProvider";
import Product from "./Pages/e-commerce/Product";
import Cart from "./Pages/e-commerce/Cart";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Error from "./components/common/Error";
import AuthRoute from "./components/common/AuthRoute";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile/:id" element={<UserProfilePage />} />
          <Route path="/records" element={<Records />} />
          <Route path="records/:id" element={<KanbanBoardPage />} />
          <Route path="/kanban-board/:id" element={<KanbanBoard />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer position="bottom-right" />
      <GlobalProvider>
        <ShopContextProvider>
          <RouterProvider router={router} />
        </ShopContextProvider>
      </GlobalProvider>
    </>
  );
};

export default App;
