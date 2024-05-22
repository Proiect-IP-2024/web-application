import { useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { HomeNavigation } from "../../models/models";
import ListaPacienti from "../../components/ListaPacienti/ListaPacienti";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<HomeNavigation>({
    currentPage: "Pacients List",
  });

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage.currentPage === "Pacients List" && <ListaPacienti />}
    </MainLayout>
  );
};

export default HomePage;
