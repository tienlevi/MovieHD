import { useState } from "react";
import { useForm } from "react-hook-form";
import SideBar from "./SideBar";
import "./style.scss";

function Update() {
  const { register } = useForm();
  return (
    <>
      <header className="header-profile">
        <h2>Dashboard</h2>
      </header>
      <SideBar />
      <div className="overview-profile">
        <h1>Update Profile</h1>
        <div className="overview-input">
          <input type="text" {...register("name")} placeholder="Name" />
          <input type="text" {...register("name")} placeholder="Email" />
          <input type="text" {...register("name")} placeholder="Phone Number" />
        </div>
      </div>
      <footer className="footer-profile">
        © FlixTV.template, 2021. Create by Dmitry Volkov
      </footer>
    </>
  );
}

export default Update;
