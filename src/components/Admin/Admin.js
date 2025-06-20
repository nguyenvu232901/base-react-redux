import SideBar from "./SideBar";
import "./Admin.scss"; // Assuming you have a CSS file for styling
import { FaBars } from "react-icons/fa";
import React, { useState } from "react";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars onClick={() => setCollapsed(!collapsed)} />
        aa
      </div>
    </div>
  );
};

export default Admin;
