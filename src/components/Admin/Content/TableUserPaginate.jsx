import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TableUserPaginate = props => {
  const { listUsers, pageCount } = props;
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

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    props.fetchListUsersPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
  };

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
              <td colSpan={'4'}>Not Found Data </td>
            </tr>
          )}
        </tbody>
      </Table>
      {pageCount > 0 && (
        <div className='user-pagination d-flex justify-content-center '>
          <ReactPaginate
            nextLabel='Next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel='< Prev'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
            renderOnZeroPageCount={null}
            forcePage={props.currentPage - 1}
          />
        </div>
      )}
    </>
  );
};

TableUserPaginate.propTypes = {
  listUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
    })
  ).isRequired,
  pageCount: PropTypes.number.isRequired,
  fetchListUsersPaginate: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  handleClickBtnView: PropTypes.func.isRequired,
  handleClickBtnUpdate: PropTypes.func.isRequired,
  handleClickBtnDelete: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default TableUserPaginate;
