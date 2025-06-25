import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss"; // Assuming you have a CSS file for styling
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiServices";
import ModelUpdateUser from "./ModelUpdateUser";
import ModelViewUser from "./ModelViewUser";
import ModelDeleteUser from "./ModelDeleteUser";

const ManageUser = (props) => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
  const [showModelViewUser, setShowModeViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [showModelDeleteUser, setShowModelDeleteuser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  //componentDidMount
  useEffect(() => {
    fetchListUsers();
    console.log("run second effect");
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res.EC === 0) {
      setListUsers(res.DT);
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
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <ModelCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModelUpdateUser
          show={showModelUpdateUser}
          setShow={setShowModelUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
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
        />
      </div>
    </div>
  );
};

export default ManageUser;
