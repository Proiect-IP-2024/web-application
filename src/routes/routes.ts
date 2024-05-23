export const BASE_URL = "http://localhost:1000";

export const MyRoutes = {
  HomePage: "/",
  LoginPage: "/login",
  RegisterPage: "/register",
};

export const endpoints = {
  Login: "/user/login",
  Register: "/user/createUser",
  RefreshToken: "/user/refreshToken",
  GetUserData: "/user/getUserData",
  GetUserType: "/user/getUserType",
  GetMedicData: "/user/getMedicData",
  GetPacientData: "/user/getPacientData",
  GetIngrijitorData: "/user/getIngrijitorData",
  GetAssignedPacients: "/user/getAssignedPacientList",
  GetUnassignedPacients: "/user/getUnassignedPacientList",
};
