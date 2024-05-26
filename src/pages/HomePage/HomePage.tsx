import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { HomeNavigation } from "../../models/models";
import ListaPacienti from "../../components/ListaPacienti/ListaPacienti";
import AddPacientList from "../../components/AddPacientList/AddPacientList";
import { useUserStore } from "../../hooks/useUserStore";
import AdminPannel from "../../components/AdminPannel/AdminPannel";
import PatientPannel from "../../components/PatientPannel/PatientPannel";
import ViewPacient from "../../components/ViewPacient/ViewPacient";

const HomePage = () => {
  const { user } = useUserStore();
  const [pacientID, setPacientID] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<HomeNavigation>({
    currentPage: undefined,
  });

  useEffect(() => {
    if (user && user.userPower === 5) {
      setCurrentPage({ currentPage: "Patient" });
    } else if (user && user.userPower === 1) {
      setCurrentPage({ currentPage: "Admin" });
    } else {
      setCurrentPage({ currentPage: "Patient List" });
    }
  }, [user]);

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage.currentPage === "Patient List" && user?.userPower !== 5 && (
        <ListaPacienti setPacientID={setPacientID} setCurrentPage={setCurrentPage} />
      )}
      {currentPage.currentPage === "Add Patient" && user?.userPower !== 5 && (
        <AddPacientList />
      )}
      {currentPage.currentPage === "Patient" && user?.userPower === 5 && (
        <PatientPannel />
      )}
      {currentPage.currentPage === "Admin" && user?.userPower === 1 && (
        <AdminPannel />
      )}
      {currentPage.currentPage === "View Patient" &&
        pacientID &&
        user?.userPower !== 5 && <ViewPacient pacientID={pacientID} />}
    </MainLayout>
  );
};

export default HomePage;
