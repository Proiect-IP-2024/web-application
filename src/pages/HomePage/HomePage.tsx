import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useUserStore } from "../../hooks/useUserStore";
import { MyRoutes } from "../../routes/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { authToken, getAuthTokenFromCookies } = useUserStore();

  useEffect(() => {
    if (!(authToken || getAuthTokenFromCookies())) {
      navigate(MyRoutes.LoginPage);
    }
  }, []);

  return (
    <>
      <Header />
      <section className="homepage">
        <h1>Home Page</h1>
        <p>This is the home page.</p>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
