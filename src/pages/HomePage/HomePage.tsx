import { useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { HomeNavigation } from "../../models/models";
import ListaPacienti from "../../components/ListaPacienti/ListaPacienti";
import AddPacientList from "../../components/AddPacientList/AddPacientList";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<HomeNavigation>({
    currentPage: "Patient List",
  });

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage.currentPage === "Patient List" && <ListaPacienti />}
      {currentPage.currentPage === "Add Patient" && <AddPacientList />}
    </MainLayout>
  );
};

export default HomePage;
