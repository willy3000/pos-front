import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
// import { FormatColorReset } from "@mui/icons-material";
import Empty from "@/components/hocs/empty";
import AuthGuard from "@/components/hocs/auth-guard";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "@/components/dashboard/projects/project-list";
import { fetchProjects } from "@/slices/projects";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "@/components/dashboard/projects/cart";
import LoadingAnimation from "@/components/hocs/loading-animation";
import { fetchCustomers } from "@/slices/customers";

const applyFilters = (projects, filters) => {
  if (projects) {
    if (filters.name) {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    return projects;
  }
  return projects;
};

export default function MyProjects() {
  const { projects } = useSelector(({ projects }) => projects);
  const { items, discount } = useSelector(({ cart }) => cart);
  const { user } = useSelector(({ user }) => user.user);
  const [openConfimationDialog, setOpenConfirmationDialog] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    name: null,
  });

  const dispatch = useDispatch();

  const getProjects = async () => {
    setLoading(true);
    try {
      await dispatch(fetchProjects(user?.userId));
      console.log("projects", projects);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const getCustomers = async () => {
    try {
      dispatch(fetchCustomers());
    } catch (err) {
      console.log(err.message);
    }
  };

  const filteredProjects = applyFilters(projects ?? [], filters);

  const onCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = () => {
    console.log("confirmed");
  };

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  useEffect(() => {
    getProjects();
    getCustomers();
  }, []);

  console.log(projects);

  const handleSearchChange = (query) => {
    setPage(0);
    console.log(query);
    setFilters({ ...filters, name: query });
  };

  return (
    // <AuthGuard>
    <DashboardNavbar>
      {/* <AuthGuard> */}
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Point Of Sale</Typography>
          </Grid>
          <Grid item>
            {/* <Button variant="outlined" onClick={() => setOpen(true)}>
              Add Item
            </Button> */}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TextField
          placeholder="search items"
          fullWidth
          onChange={(e) => handleSearchChange(e.target.value)}
        ></TextField>
        <Box sx={{ paddingX: "15px" }}>
          <Badge badgeContent={items.length} color="primary" overlap="circular">
            <IconButton onClick={handleOpenCart}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Box>
      </Box>
      {loading ? (
        <LoadingAnimation {...{ loading }} />
      ) : !projects.length > 0 ? (
        <Box>
          <Empty></Empty>
        </Box>
      ) : (
        <ProjectList
          {...{ projects: filteredProjects, items, page, setPage }}
        ></ProjectList>
      )}

      {/* </AuthGuard> */}
      <Cart
        {...{ open: cartOpen, setOpen: setCartOpen, items, discount }}
      ></Cart>
    </DashboardNavbar>
    // </AuthGuard>
  );
}
