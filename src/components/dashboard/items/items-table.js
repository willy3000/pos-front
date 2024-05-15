import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Box,
  IconButton,
  Typography,
  Collapse,
  Grow,
  TablePagination,
} from "@mui/material";
import { getInitials } from "@/utils/constants";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { EditOutlined } from "@mui/icons-material";
import { projectsApi } from "@/api/Projects";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";

const applyPagination = (items, page, rowsPerPage) =>
  items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export default function ItemsTable(props) {
  const { items, getProjects, handleOpenEditDialog, page, setPage } = props;
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [itemId, setItemId] = useState(null);

  const onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleChangePage = (e, value) => {
    setPage(Number(value));
  };

  let timeout = 0;

  const handleDeleteItem = async () => {
    try {
      const data = await projectsApi.deleteProject(itemId);
      getProjects();
    } catch (err) {}
  };

  const handleOpenConfirm = (id) => {
    setItemId(id);
    setOpenConfirm(true);
  };

  const paginatedItems = applyPagination(items, page, rowsPerPage);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center"> Quantity</TableCell>
            <TableCell align="center"> Price</TableCell>
            <TableCell align="right"> Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((item) => {
            const bufferData = item?.imageFile?.buffer;
            const base64String = bufferData
              ? bufferData.toString("base64")
              : null;

            //   timeout += 650;

            //   setTimeout(() => {
            //     // do stuff function with item
            //   }, 500);

            return (
              // <Grow in={true}>
              <TableRow key={item.id}>
                <TableCell align="left">
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{ height: 60, width: 60, fontSize: "50px" }}
                    >
                      {!item.imageFile ? (
                        getInitials(item?.name)
                      ) : (
                        <img
                          src={`data:image/jpeg;base64, ${base64String}`}
                          alt="Red Dot"
                          width={"100%"}
                        />
                      )}
                    </Avatar>
                    <Typography variant="subtitle2">{item?.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{item?.quantity}</TableCell>
                <TableCell align="center">{item?.price}</TableCell>
                <TableCell align="right">
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEditDialog(item)}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={() => handleOpenConfirm(item.id)}
                    >
                      <DeleteOutlineRounded
                        fontSize="small"
                        sx={{ color: "red" }}
                      />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              // </Grow>
            );
          })}
        </TableBody>
        <ConfirmationDialog
          {...{
            open: openConfirm,
            onClose: onCloseConfirm,
            onOk: handleDeleteItem,
            confirmationMessage:
              "Are you sure you want to delete this item? This operation is irreversable.",
          }}
        />
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
