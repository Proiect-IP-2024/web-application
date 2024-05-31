import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { HomeNavigation } from "../../models/models";
import ListaPacienti from "../../components/ListaPacienti/ListaPacienti";
import AddPacientList from "../../components/AddPacientList/AddPacientList";
import { useUserStore } from "../../hooks/useUserStore";
import AdminPannel from "../../components/AdminPannel/AdminPannel";
import ViewPacient from "../../components/ViewPacient/ViewPacient";

import PatientPannel from "../../components/PatientPannel/PatientPannel";
import ProfileScreen from "../../components/ProfileScreen/ProfileScreen";

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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage.currentPage === "Patient List" && user?.userPower !== 5 && (
        <ListaPacienti
          setPacientID={setPacientID}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage.currentPage === "Add Patient" && user?.userPower !== 5 && (
        <AddPacientList />
      )}
      {currentPage.currentPage === "Patient" &&
        user &&
        user.user_id &&
        user.userPower === 5 && (
          <ViewPacient pacientID={user.user_id} showOptions={false} />
        )}

      {currentPage.currentPage === "Admin" && user?.userPower === 1 && (
        <AdminPannel />
      )}
      {currentPage.currentPage === "View Patient" &&
        pacientID &&
        user?.userPower !== 5 && (
          <ViewPacient pacientID={pacientID} showOptions={true} />
        )}
    </MainLayout>
  );
};

export default HomePage;
