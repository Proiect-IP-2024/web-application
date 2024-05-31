import React, { Dispatch, SetStateAction } from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./Header.scss";
import { HomeNavigation } from "../../models/models";
import { stringAvatar } from "../../utils/utils";
import { useUserStore } from "../../hooks/useUserStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Header = ({
  handleDrawerToggle,
  currentPage,
  setCurrentPage,
}: {
  handleDrawerToggle: () => void;
  currentPage: HomeNavigation;
  setCurrentPage: Dispatch<SetStateAction<HomeNavigation>>;
}) => {
  const { user } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header>
      <Toolbar className="container">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="h6">
          {currentPage.currentPage}
        </Typography>
        {user && (
          <>
            <div className="profile" onClick={handleMenu}>
              <div className="icon">
                <Stack direction="row" spacing={2}>
                  <Avatar
                    {...stringAvatar(`${user.first_name} ${user.last_name}`)}
                  />
                </Stack>
              </div>
              <div className="name">
                <h3>{user.first_name}</h3>
              </div>
              <ExpandMoreIcon className="icon" />
            </div>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                }}
              >
                Close
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </header>
  );
};

export default Header;
