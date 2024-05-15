import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";

export default function DashboardItem(props) {
  const { section, index } = props;

  const router = useRouter();

  const navigateToPath = (path) => {
    router.push(path);
  };

  const isActive = () => {
    if (window.location.pathname === section.path) {
      return true;
    } else {
      if (router.pathname.includes(section.path)) {
        return false;
      }
    }
    return false;
  };

  const styles = { backgroundColor: "primary.main", color: "white" };

  return (
    <ListItem
      key={section.id}
      disablePadding

    >
      <ListItemButton onClick={() => navigateToPath(section.path)}>
        <ListItemIcon>
          {section.icon}
        </ListItemIcon>
        <ListItemText primary={section.name} />
      </ListItemButton>
    </ListItem>
  );
}

// sx={
//   isActive
//     ? { margin: "15px", borderRadius: "2ch", ...styles }
//     : { margin: "15px", borderRadius: "2ch" }
// }


// sx={isActive ? { color: "white" } : {}}
