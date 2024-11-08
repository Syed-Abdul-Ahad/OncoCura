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
import PlaceOrder from "./Pages/e-commerce/PlaceOrder";
import Orders from "./Pages/e-commerce/Orders";
import { routes } from "./utils/constants";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route
          path={routes.home}
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path={routes.login}
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path={routes.signup}
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.userProfile} element={<UserProfilePage />} />
          <Route path={routes.records} element={<Records />} />
          <Route path={routes.kanbanBoard} element={<KanbanBoardPage />} />
          <Route path={routes.kanbanBoardPage} element={<KanbanBoard />} />
          <Route path={routes.collection} element={<Collection />} />
          <Route path={routes.product} element={<Product />} />
          <Route path={routes.cart} element={<Cart />} />
          <Route path={routes.placeOrder} element={<PlaceOrder />} />
          <Route path={routes.orders} element={<Orders />} />
        </Route>
        <Route path={routes.error} element={<Error />} />
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
