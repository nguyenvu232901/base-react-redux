import axios from "../utils/axiosCustomize"; //axios kia la bien dat ten thoi va no = instance

//post data
const postCreateNewUser = (email, password, username, role, image) => {
  // Cách 2: dùng cho gửi file
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

//get all data
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

//update data
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

//delete user
const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

//paginate user
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUsers,
  getUserWithPaginate,
};
