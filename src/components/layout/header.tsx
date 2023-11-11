"use client";
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
import { Badge, Container } from "@mui/material";
import NavLink from "../shares/NavLink";
import Image from "next/image";
import useAuth from "@/store/auth";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAddCart from "@/store/cart";

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
  const router = useRouter();
  
  const [userOpen, setUserOpen] = useState(false);

  const { window } = props;

  const { logOut, isAuthenticated } = useAuth();
  const {  cart, } = useAddCart();


  const totalPrice = cart.reduce(
    (acc: number, pr: any) => acc + pr.prQuantity,
    0
    )

  
  

  const handleLogOut = () => {
    logOut(router);
  };

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/card">
                <Badge badgeContent={totalPrice} color="error">
                  <Image
                    src="/images/cart2.png"
                    alt="cart"
                    height={20}
                    width={20}
                  />
                </Badge>
              </NavLink>
              <NavLink href="/favourite">
                <Badge badgeContent={cart.length} color="error">
                  <Image
                    src="/images/favorite.svg"
                    alt="cart"
                    height={20}
                    width={20}
                  />
                </Badge>
              </NavLink>
              <NavLink href="#">
                {isAuthenticated ? (
                  <div
                    onClick={handleButtonClick}
                    className="z-50 cursor-pointer relative inline"
                  >
                    <Image
                      src={"/images/users.png"}
                      width={30}
                      height={60}
                      alt="user"
                    />
                    {userOpen && (
                      <div className="user_modal z-50 absolute p-5 w w-[200px] right-0">
                        <div className="flex justify-start mb-3 items-center text-white">
                          <Image
                            src={"/images/accounticon.png"}
                            width={24}
                            height={24}
                            alt="order"
                          />
                          <Link href={"/account"} className="ml-2 text-black">
                            Account
                          </Link>
                        </div>

                        <div
                          onClick={handleLogOut}
                          className="flex justify-start items-center text-white"
                        >
                          <Image
                            src={"/images/logouticon.png"}
                            width={24}
                            height={24}
                            alt="log-out"
                          />
                          <span className="ml-2 text-black">Log out</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Fragment>
                    <NavLink href="/login">Kirish</NavLink>
                    <NavLink href="/register">Register</NavLink>
                  </Fragment>
                )}
              </NavLink>
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
