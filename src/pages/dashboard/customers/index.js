import React, { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Box, Grid, Button, Typography, Card, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProjects } from "@/slices/projects";
import ItemsTable from "@/components/dashboard/items/items-table";
import AddProject from "@/components/dashboard/items/add-project";
import EditItem from "@/components/dashboard/items/edit-item";
import AddCustomer from "@/components/dashboard/customers/add-customer";
import { fetchCustomers } from "@/slices/customers";
import CustomersTable from "@/components/dashboard/customers/customers-table";

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
  const { customers } = useSelector(({ customers }) => customers);
//   const { user } = useSelector(({ user }) => user.user);
  const [openAddCustomer, setOpenAddCustomer] = useState(false);


  const [filters, setFilters] = useState({
    name: null,
  });

  const dispatch = useDispatch();

  const getCustomers = async () => {
    try {
      dispatch(fetchCustomers());
    } catch (err) {
      console.log(err.message);
    }
  };

  const onCloseAddCustomer = () => {
    setOpenAddCustomer(false);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleOpenEditDialog = (item) => {
    setItem(item);
    setOpenEditDialog(true);
  };

  const onCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSearchChange = (query) => {
    setPage(0);
    console.log(query);
    setFilters({ ...filters, name: query });
  };

//   const filteredProjects = applyFilters(projects ?? [], filters);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Manage Customers</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setOpenAddCustomer(true)}>
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </Box>
      <AddCustomer {...{open: openAddCustomer, onClose: onCloseAddCustomer}}/>
      <CustomersTable {...{customers}}></CustomersTable>
    </DashboardNavbar>
  );
}
