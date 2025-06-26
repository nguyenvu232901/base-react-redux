import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss"; // Assuming you have a CSS file for styling
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import {
  getAllUsers,
  getUserWithPaginate,
} from "../../../services/apiServices";
import ModelUpdateUser from "./ModelUpdateUser";
import ModelViewUser from "./ModelViewUser";
import ModelDeleteUser from "./ModelDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 3;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
  const [showModelViewUser, setShowModeViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [showModelDeleteUser, setShowModelDeleteuser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  //componentDidMount
  useEffect(() => {
    fetchListUsersPaginate(1);
    // fetchListUsers();
    // console.log("run second effect");
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    console.log(res);
    if (res.EC === 0) {
      console.log("res.dt = ", res.DT);
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModelUpdateUser(true);
    setDataUpdate(user);
    console.log("Update user", user);
  };

  const resetUpdateData = () => {
    setDataUpdate();
  };

  const handleClickBtnView = (user) => {
    setShowModeViewUser(true);
    setDataUpdate(user);
    console.log("Update user", user);
  };

  const handleClickBtnDelete = (user) => {
    setShowModelDeleteuser(true);
    setDataDelete(user);
    console.log("Delete user", user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModelCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}

          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersPaginate={fetchListUsersPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModelCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersPaginate={fetchListUsersPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModelUpdateUser
          show={showModelUpdateUser}
          setShow={setShowModelUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersPaginate={fetchListUsersPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModelViewUser
          show={showModelViewUser}
          setShow={setShowModeViewUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        />

        <ModelDeleteUser
          show={showModelDeleteUser}
          setShow={setShowModelDeleteuser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
          fetchListUsersPaginate={fetchListUsersPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
