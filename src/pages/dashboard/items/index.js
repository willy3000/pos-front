import React, { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Box, Grid, Button, Typography, Card, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProjects } from "@/slices/projects";
import ItemsTable from "@/components/dashboard/items/items-table";
import AddProject from "@/components/dashboard/items/add-project";
import EditItem from "@/components/dashboard/items/edit-item";


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


export default function Items() {
  const { projects } = useSelector(({ projects }) => projects);
  const { user } = useSelector(({ user }) => user.user);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(0)

  const [filters, setFilters] = useState({
    name: null,
  });

  const dispatch = useDispatch();

  const getProjects = async () => {
    try {
      dispatch(fetchProjects(user?.userId));
      console.log("projects", projects);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleOpenEditDialog = (item) => {
    setItem(item);
    setOpenEditDialog(true);
  };

  const onCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSearchChange = (query) => {
    setPage(0)
    console.log(query);
    setFilters({ ...filters, name: query });
  };

    const filteredProjects = applyFilters(projects ?? [], filters);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Manage Items</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Add Item
            </Button>
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
      </Box>
      <Card sx={{ margin: "15px" }}>
        <ItemsTable
          {...{ items: filteredProjects, getProjects, handleOpenEditDialog, page, setPage }}
        />
      </Card>
      <AddProject {...{ open, onClose, userId: user?.userId }}></AddProject>
      <EditItem
        {...{
          item,
          open: openEditDialog,
          onClose: onCloseEditDialog,
          userId: user?.userId,
        }}
      ></EditItem>
    </DashboardNavbar>
  );
}
