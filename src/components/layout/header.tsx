"use client";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Container } from "@mui/material";
import NavLink from "../shares/NavLink";
import Image from "next/image";
import useAuth from "@/store/auth";
import Link from "next/link";
import useAddCart from "@/store/cart";
import useAddFavourite from "@/store/favourite";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const Header = (props: Props) => {
  const router = useRouter();
  const { window } = props;

  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { logOut, isAuthenticated, user } = useAuth();
  const handleLogOut = () => {
    logOut(router);
  };

  

  const { cart } = useAddCart();
  const totalPrice = cart.reduce(
    (acc: number, pr: any) => acc + pr.prQuantity,
    0
  );

  const { favourite } = useAddFavourite();

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };

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
      <List className="flex flex-col justify-center">
        <NavLink href="/home">Bosh sahifa</NavLink>
        <NavLink href="/about">Biz haqimizda</NavLink>
        <NavLink href="/products">Mahsulotlar</NavLink>
        <NavLink href="/card">
          Savat
          <Badge badgeContent={totalPrice} color="error">
            <Image
              src="/images/cart2.png"
              alt="cart"
              height={20}
              width={20}
              className="ml-1"
            />
          </Badge>
        </NavLink>
        <NavLink href="/favourite">
          Saralangan
          <Badge badgeContent={favourite.length} color="error">
            <Image
              src="/images/favorite.svg"
              alt="cart"
              height={20}
              width={20}
              className="ml-1"
            />
          </Badge>
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/orders">Buyurtmalarim</NavLink>

            
            <div onClick={handleLogOut} className="flex justify-center items-center cursor-pointer">
              <Image
                src={"/images/logouticon.png"}
                width={24}
                height={24}
                alt="log-out"
              />
              <span className="ml-2 text-black">Log out</span>
            </div>
          </>
        ) : (
          <>
            <NavLink href="/login">Kirish</NavLink>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
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
              <Link href="/">Logo</Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">Biz haqimizda</NavLink>
              <NavLink href="/products">Mahsulotlar</NavLink>
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
                <Badge badgeContent={favourite.length} color="error">
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
                        <div className="flex justify-start mb-3 items-center text-white">
                          <Image
                            src={"/images/accounticon.png"}
                            width={24}
                            height={24}
                            alt="orders"
                          />
                          <Link href={"/orders"} className="ml-2 text-black">
                            Buyurtmalarim
                          </Link>
                        </div>
                        {user?.role === 1 && <div className="flex justify-start mb-3 items-center text-white">
                          <Image
                            src={"/images/accounticon.png"}
                            width={24}
                            height={24}
                            alt="orders"
                          />
                          <Link href={"/admin"} className="ml-2 text-black">
                            Dashboard
                          </Link>
                        </div>}
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
                          <span className="ml-2 text-black">Chiqish</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <NavLink href="/login">Kirish</NavLink>
                    <NavLink href="/register">Register</NavLink>
                  </div>
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
