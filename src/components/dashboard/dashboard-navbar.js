import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useSelector } from "react-redux";
import DashboardDrawer from "./dashboard-drawer";
import HomeIcon from "@mui/icons-material/Home";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Book } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ProfileEdit from "./profile/profile-edit";
import SettingsDrawer from "./settings/settings-drawer";
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';

const drawerWidth = 240;

const sections = [
  {
    id: 0,
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: 1,
    name: "Point of Sale",
    path: "/dashboard/projects",
    icon: <PointOfSaleIcon />,
  },
  {
    id: 2,
    name: "Manage Items",
    path: "/dashboard/items",
    icon: <Inventory2Icon />,
  },
  {
    id: 2,
    name: "Customers",
    path: "/dashboard/customers",
    icon: <GroupsIcon />,
  },
  {
    id: 3,
    name: "Sales",
    path: "/dashboard/sales",
    icon: <MonetizationOnIcon />,
  },
  {
    id: 4,
    name: "Reports",
    path: "/dashboard/joined-projects",
    icon: <EqualizerIcon />,
  },
  {
    id: 5,
    name: "Activate",
    path: "/dashboard/payment",
    icon: <VerifiedUserIcon />,
  },
];

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector(({ user }) => user.user);
  const [openSettings, setOpenSettings] = useState(false)


  const onCloseSettings = () => {
    setOpenSettings(false)
  }
  

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [base64String, setBase64String] = useState(null);

  const getBase64String = () => {
    const bufferData = user?.logo?.buffer;
    const base64String = bufferData ? bufferData.toString("base64") : null;
    setBase64String(base64String);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const onCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  // console.log('user',user)

  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateToPath = (path) => {
    router.push(path);
  };

  const drawer = <DashboardDrawer {...{ sections, user }} />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogOut = () => {
    localStorage.removeItem("persist:root");
    localStorage.removeItem("user");
    router.push("/authentication/login");
  };

  useEffect(() => {
    getBase64String();
  }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              {user.logo ? (
                <Avatar>
                  <img
                    src={`data:image/jpeg;base64, ${base64String}`}
                    alt=""
                    width={"100%"}
                  />
                </Avatar>
              ) : (
                <Avatar></Avatar>
              )}
              <Typography>{`${user?.username}`}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => setOpenEditProfile(true)}>
          {user.logo ? (
            <Avatar sx={{ width: 100, height: 100 }}>
              <img
                src={`data:image/jpeg;base64, ${base64String}`}
                alt=""
                width={"100%"}
              />
            </Avatar>
          ) : (
            <Avatar sx={{ width: 100, height: 100 }}></Avatar>
          )}
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <ProfileEdit
        {...{ open: openEditProfile, onClose: onCloseEditProfile, user }}
      />
      <SettingsDrawer {...{open: openSettings, setOpen: setOpenSettings}}/>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
