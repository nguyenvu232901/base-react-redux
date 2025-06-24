import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss"; // Assuming you have a CSS file for styling
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiServices";

const ManageUser = (props) => {
  const [showModelCreateuser, setShowModelCreateuser] = useState(false);
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
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModelCreateuser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModelCreateUser
          show={showModelCreateuser}
          setShow={setShowModelCreateuser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
