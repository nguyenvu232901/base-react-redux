import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TableUser = props => {
  const { listUsers } = props;
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

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map(item => {
              return (
                <tr key={`table-users-${item.id}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className='btn btn-secondary btn-sm'
                        onClick={() => props.handleClickBtnView(item)}
                        title="View user details"
                      >
                        {isMobile ? <FaEye /> : 'View'}
                      </button>
                      <button
                        className='btn btn-warning btn-sm mx-1'
                        onClick={() => props.handleClickBtnUpdate(item)}
                        title="Update user"
                      >
                        {isMobile ? <FaEdit /> : 'Update'}
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => props.handleClickBtnDelete(item)}
                        title="Delete user"
                      >
                        {isMobile ? <FaTrash /> : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={'4'}>Not Found Data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

TableUser.propTypes = {
  listUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
    })
  ).isRequired,
  handleClickBtnView: PropTypes.func.isRequired,
  handleClickBtnUpdate: PropTypes.func.isRequired,
  handleClickBtnDelete: PropTypes.func.isRequired,
};

export default TableUser;
