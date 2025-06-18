import React, { useState } from "react";

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const hanhdleOnChangeInput = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name || !age) {
    //   alert("Missing required parameters!");
    //   return;
    // }
    props.handleAddUser({ id: Math.floor(Math.random() * 1000), name, age });
    setName("");
    setAge("");
  };
  return (
    <div>
      My name is {name} and I am {age} years old.
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Your name: </label>
        <input
          value={name}
          type="text"
          onChange={(e) => hanhdleOnChangeInput(e)}
        />
        <label>Your age: </label>
        <input
          value={age}
          type="number"
          onChange={(e) => handleOnChangeAge(e)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserInfor;
