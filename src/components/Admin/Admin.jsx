import SideBar from './SideBar';
import './Admin.scss'; // Assuming you have a CSS file for styling
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };

  const handleCollapsedChange = () => {
    if (isMobile) {
      setToggled(!toggled);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && toggled) {
      setToggled(false);
    }
  };

  // Get the appropriate icon for header
  const getHeaderIcon = () => {
    if (isMobile && toggled) {
      return <FaTimes onClick={handleCollapsedChange} />;
    }
    return <FaBars onClick={handleCollapsedChange} />;
  };

  return (
    <div className='admin-container'>
      {/* Mobile overlay */}
      {isMobile && toggled && (
        <div
          className='mobile-overlay show'
          onClick={handleOverlayClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOverlayClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      <div className='admin-sidebar'>
        <SideBar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <div className='header-left'>
            {getHeaderIcon()}
          </div>
          <div className='header-right'>
            <span>Admin Panel</span>
          </div>
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
