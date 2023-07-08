import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  About,
  CChangeName,
  CName,
  CPassword,
  Contact,
  DForm,
  Login,
  PNF,
  Register,
  Users,
} from "./pages";
import { IsAuth, IsValid, MGuard } from "./components";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MGuard>
              <Layout />
            </MGuard>
          }
        >
          <Route index element={<Users />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="remove_account" element={<DForm />} />
          <Route path="change_password" element={<CPassword />} />
          <Route path="change_name">
            <Route index element={<CName />} />
            <Route
              path="confirmation"
              element={
                <IsValid>
                  <CChangeName />
                </IsValid>
              }
            />
          </Route>
        </Route>
        <Route
          path="/register"
          element={
            <IsAuth>
              <Register />
            </IsAuth>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <IsAuth>
              <Login />
            </IsAuth>
          }
        ></Route>
        <Route path="*" element={<PNF />}></Route>
      </Routes>
    </div>
  );
};

export default App;
