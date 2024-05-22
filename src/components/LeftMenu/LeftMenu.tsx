import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HomeNavigation } from "../../models/models";
import { useUserStore } from "../../hooks/useUserStore";

interface LeftMenuItem {
  text: string;
  icon: any;
  onClickFuntion: () => void;
}

const LeftMenu = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: HomeNavigation;
  setCurrentPage: Dispatch<SetStateAction<HomeNavigation>>;
}) => {
  const { logout } = useUserStore();
  const [leftMenuItems, setMenuIcons] = useState<LeftMenuItem[] | null>(null);

  useEffect(() => {
    setMenuIcons([
      {
        text: "Patient List",
        icon: <InboxIcon />,
        onClickFuntion: () => {
          setCurrentPage({ currentPage: "Patient List" });
        },
      },
      {
        text: "Add Patient",
        icon: <InboxIcon />,
        onClickFuntion: () => {
          setCurrentPage({ currentPage: "Add Patient" });
        },
      },
      {
        text: "Logout",
        icon: <InboxIcon />,
        onClickFuntion: () => {
          logout();
        },
      },
    ]);
  }, []);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {leftMenuItems?.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={item.onClickFuntion}
              className={currentPage.currentPage === item.text ? "active" : ""}
              sx={{
                "& div": { color: "var(--c-white)" },
                "&:hover": {
                  backgroundColor: "var(--c-white)",
                  "& div": {
                    color: "#151828",
                  },
                },
                "&.active": {
                  backgroundColor: "var(--c-white)",
                  "& div": {
                    color: "#151828",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LeftMenu;
