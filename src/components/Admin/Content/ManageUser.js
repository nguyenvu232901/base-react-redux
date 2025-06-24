import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss"; // Assuming you have a CSS file for styling
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {
  const [showModelCreateuser, setShowModelCreateuser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={setShowModelCreateuser}>
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          <TableUser />
        </div>
        <ModelCreateUser
          show={showModelCreateuser}
          setShow={setShowModelCreateuser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
