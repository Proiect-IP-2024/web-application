import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyRoutes } from "./routes/routes";
import { UserStoreProvider } from "./context/UserContext";
import "./styles/main.scss";

const App = () => {
  return (
    <UserStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path={MyRoutes.HomePage} element={<HomePage />} />
          <Route path={MyRoutes.LoginPage} element={<LoginPage />} />
          <Route path={MyRoutes.RegisterPage} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </UserStoreProvider>
  );
};

export default App;
