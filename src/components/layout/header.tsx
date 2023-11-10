"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Container, Link } from "@mui/material";
import NavLink from "../shares/NavLink";
import Image from "next/image";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    href: "/",
    title: "Asosiy",
  },
  {
    href: "/about",
    title: "Biz haqimizda",
  },
  {
    href: "/card",
    title: "Savat",
    icon: "/images/cart2.png",
  },
  {
    href: "/favourite",
    title: "Saralanganlar",
    icon: "/images/favorite.svg",
  },
  {
    href: "/login",
    title: "Kirish",
  },
  {
    href: "/register",
    title: "Ro'yhatdan o'tish",
  },
];

const Header = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <NavLink key={item.title} href={item.href}>
              {item.title}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Logo
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <NavLink key={item.title} href={item.href}>
                  {item.title}
                  {item.icon && (
                    <span>
                      <Badge badgeContent={1} color="error">
                        <Image
                          src={item.icon}
                          alt="cart"
                          height={20}
                          width={20}
                        />
                      </Badge>
                    </span>
                  )}
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </Container>
  );
};

export default Header;
