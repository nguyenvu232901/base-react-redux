import ModelCreateUser from "./ModelCreateUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="">
          <button>Add new users</button>
        </div>
        <div className="">
          table users
          <ModelCreateUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
