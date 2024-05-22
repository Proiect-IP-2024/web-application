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
  GetAssignedPacients: '/user/getAssignedPacientList',
  GetUnassignedPacients: '/user/getUnassignedPacientList',
};
