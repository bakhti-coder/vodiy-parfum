"use client";

import Children from "@/types/children";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string } & Children) => {
  const pathname = usePathname();
  return (
    <Link
      style={{ color: "black", fontSize: '12px' }}
      href={href}
      className={pathname === href ? "active" : "navlink"}
    >
      <Button color="inherit" size="small">{children}</Button>
    </Link>
  );
};

export default NavLink;
