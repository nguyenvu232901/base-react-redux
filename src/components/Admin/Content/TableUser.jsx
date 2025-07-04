import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

const TableUser = props => {
  const { listUsers } = props;

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
          {listUsers
            && listUsers.length > 0
            && listUsers.map((item) => {
              return (
                <tr key={`table-users-${item.id}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() => props.handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className='btn btn-warning mx-3'
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
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
