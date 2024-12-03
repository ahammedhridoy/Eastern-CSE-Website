"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Sidebar from "./Sidebar";

const DashMobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div className="lg:ml-[260px] flex justify-end ml-0">
      <Button onClick={toggleDrawer(true)}>Open Dashboard Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Sidebar />
      </Drawer>
    </div>
  );
};

export default DashMobileMenu;
