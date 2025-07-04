import SideBar from './SideBar';
import './Admin.scss'; // Assuming you have a CSS file for styling
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <SideBar 
          collapsed={collapsed} 
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className='admin-content'>
        <div className='admin-header'>
          <FaBars onClick={handleCollapsedChange} />
        </div>
        <div className='admin-main'>
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default Admin;
