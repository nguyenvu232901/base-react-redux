import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = props => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <DiReact size={'3em'} color={'00bfff'} />
              Nguyen Vu Coder
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem icon={<MdDashboard />}>
              <Link to='/admins' style={{ textDecoration: 'none', color: 'inherit' }}>
                Dashboard
              </Link>
            </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              // icon={<FaRegLaughWink />}
              icon={<FaGem />}
              title='Features'
            >
              <MenuItem>
                <Link to='/admins/manage-users' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Quản lý Users
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/admins/manage-quizzes' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Quản lý Bài Quiz
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/admins/manage-questions' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Quản lý câu hỏi
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href='https://github.com/nguyenvu232901'
              target='_blank'
              className='sidebar-btn'
              rel='noopener noreferrer'
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                &#160; Code by Nguyen Vu
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggled: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
};

export default SideBar;
