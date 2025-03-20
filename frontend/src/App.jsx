import { useState } from "react";

import ImageUpload from "./components/ImageUpload";
import Home from "./components/Home";
import IngredientList2 from "./components/IngredientList2";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {


  return (
    <>
    <Navbar/>
    <Outlet />
    <ToastContainer />
    <Footer/>
    </>
  );
}

export default App;
