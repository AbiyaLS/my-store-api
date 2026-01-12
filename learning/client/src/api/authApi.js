import API from "./axios";

export const registerUser = async (payload) => {
  const response = await API.post("/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await API.post("/login", payload);
  return response.data;
};
