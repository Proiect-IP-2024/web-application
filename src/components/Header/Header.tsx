import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";
import { HomeNavigation } from "../../models/models";

const Header = ({
  handleDrawerToggle,
  currentPage,
}: {
  handleDrawerToggle: () => void;
  currentPage: HomeNavigation;
}) => {
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
      </Toolbar>
    </header>
  );
};

export default Header;
