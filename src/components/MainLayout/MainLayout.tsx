import Header from "../Header/Header";
import { useUserStore } from "../../hooks/useUserStore";
import { MyRoutes } from "../../routes/routes";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import LeftMenu from "../LeftMenu/LeftMenu";
import { HomeNavigation } from "../../models/models";

const MainLayout = ({
  children,
  currentPage,
  setCurrentPage,
}: {
  children: ReactNode;
  currentPage: HomeNavigation;
  setCurrentPage: Dispatch<SetStateAction<HomeNavigation>>;
}) => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const { authToken, getAuthTokenFromCookies, getUserData, refreshUserToken } =
    useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const fetchuser = async () => {
    const isUser = await getUserData();

    if (!isUser) {
      const responseRefreshToken = await refreshUserToken();

      if (!responseRefreshToken) {
        navigate(MyRoutes.LoginPage);
      }
    }
  };

  useEffect(() => {
    if (!(authToken || getAuthTokenFromCookies())) {
      navigate(MyRoutes.LoginPage);
    }
  }, []);

  useEffect(() => {
    fetchuser();
  }, [authToken]);

  // useEffect(() => {
  //   console.log("User", user);
  // }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Header
          handleDrawerToggle={handleDrawerToggle}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#151828",
              justifyContent: "center",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <LeftMenu currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#151828",
              justifyContent: "center",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <LeftMenu currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
