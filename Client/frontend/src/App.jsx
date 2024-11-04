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
// import KanbanBoard from "./Pages/kanban-board/kanban-board";
import Home from "./Pages/Home/Home";
import RootLayout from "./layout/RootLayout";
import { GlobalProvider } from "./context/GlobalContext";
import Collection from "./Pages/e-commerce/Collection";
import ShopContextProvider from "./context/ShopContextProvider";
import Product from "./Pages/e-commerce/Product";
import Cart from "./Pages/e-commerce/Cart";
import PlaceOrder from "./Pages/e-commerce/PlaceOrder";
import Orders from "./Pages/e-commerce/Orders";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-profile/:id" element={<UserProfilePage />} />
        <Route path="/records" element={<Records />} />
        {/* <Route path="records/:id" element={<KanbanBoard />} /> */}
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
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
