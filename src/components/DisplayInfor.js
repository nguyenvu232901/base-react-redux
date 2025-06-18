import React, { useEffect, useState } from "react";

const DisplayInfor = (props) => {
  const { listUsers, handleDeleteUser } = props;
  const [isShow, setIsShow] = useState(true);

  const hanhleShowHide = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    setTimeout(() => {
      document.title = `Số người dùng: ${listUsers.length}`;
    }, 3000);
    console.log("Component DisplayInfor mounted or updated");
  });

  return (
    <>
      <div></div>
      <button onClick={hanhleShowHide}>{isShow ? "Ẩn" : "Hiện"}</button>
      {isShow && (
        <>
          {listUsers.length === 0 ? (
            <p>Không có người dùng nào trong danh sách.</p>
          ) : (
            <ul>
              {listUsers.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.age} tuổii
                  <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default DisplayInfor;
