import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const TableUserPaginate = props => {
  const { listUsers, pageCount } = props;

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
