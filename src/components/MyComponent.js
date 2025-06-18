import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", age: 25 },
    { id: 2, name: "Trần Thị B", age: 30 },
    { id: 3, name: "Lê Văn C", age: 22 },
  ]);

  const handleAddUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleDeleteUser = (userId) => {
    let newList = listUsers;
    newList = newList.filter((item) => item.id !== userId);
    setListUsers(newList);
  };

  return (
    <div>
      <AddUserInfor handleAddUser={handleAddUser} />
      <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default MyComponent;
