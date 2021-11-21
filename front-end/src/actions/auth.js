import { myPost, myDelete } from "../utils/ajax";
export const loginUser = async (data) => {
  return await myPost("/api/sessions/", data);
};

export const signupUser = async (data) => {
  return await myPost("/api/sessions/signup/", data);
};

export const logoutUser = async (data) => {
  return await myDelete("/api/sessions/", data);
};

export const loginDemo = async () => {
  return await loginUser({ email: "demo@gmail.com", password: "password" });
};
