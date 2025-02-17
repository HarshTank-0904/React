import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact";
import Github from "./components/Github/Github";
import User from "./components/User/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<><Layout/></>}>
      <Route path="" element={<Home />} /> 
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="github" element={<Github />} />
      <Route path="user" element={<User />}>
        <Route path=":userid" element={<User />} />
      </Route>
      <Route path="*" element={<div>404 : Not Found Bruh..</div>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
