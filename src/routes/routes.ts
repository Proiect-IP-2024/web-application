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
  GetPacientProfile: "/user/getPacientProfile",
  GetIstoricAlarme: "/pacient/getIstoricAlarme",

  AddPacient: "/user/addPacient",
  AddMedic: "/user/addMedic",
  AddIngrijitor: "/user/addIngrijitor",
  AddAdmin: "/user/setAdmin",

  SetAlarmConfigToPacient: "/pacient/setAlarmConfigToPacient",

  SetRecomandareMedic: "/user/setRecomandareMedic",
};
