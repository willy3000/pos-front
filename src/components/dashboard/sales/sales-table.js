import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Tooltip,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SaleDetails from "./sale-details";

const applyPagination = (sales, page, rowsPerPage) =>
  sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export default function SalesTable(props) {
  const { sales, page, setPage } = props;
  const [open, setOpen] = useState(false);
  const [sale, setSale] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onClose = () => {
    setOpen(false);
  };

  const handleOpenSaleDetails = (sale) => {
    setSale(sale);
    setOpen(true);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleChangePage = (e, value) => {
    setPage(Number(value));
  };

  const paginatedSales = applyPagination(sales, page, rowsPerPage);

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>SubTotal</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedSales.map((sale) => {
            return (
              <TableRow key={sale.id}>
                <TableCell>
                  {moment
                    .utc(sale?.datetime)
                    .local()
                    .format("DD, MMM, YYYY, ddd")}
                </TableCell>
                <TableCell>
                  {/* moment.utc(date).local().format() */}
                  {moment.utc(sale?.datetime).local().format("hh:mm a")}
                </TableCell>
                <TableCell>{sale?.paymentMethod}</TableCell>
                <TableCell>{sale?.subTotal}</TableCell>
                <TableCell>{sale?.discount}</TableCell>
                <TableCell>{sale?.total}</TableCell>
                <TableCell>
                  <Box>
                    <Tooltip title="view sale details">
                      <IconButton onClick={() => handleOpenSaleDetails(sale)}>
                        <TextSnippetIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sales.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <SaleDetails {...{ sale, open, onClose }}></SaleDetails>
    </Card>
  );
}
