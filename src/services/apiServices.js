import axios from "../utils/axiosCustomize"; //axios kia la bien dat ten thoi va no = instance

const postCreateNewUser = (email, password, username, role, image) => {
  // Cách 2: dùng cho gửi file
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userIamge", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreateNewUser, getAllUsers };
