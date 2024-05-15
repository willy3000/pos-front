import React, { useState } from "react";
import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import moment from "moment";

const applyPagination = (reports, page, rowsPerPage) => {
  let newReports = {};
  let count = 0;
  const startIndex = rowsPerPage * page;
  Object.keys(reports).map((key, index) => {
    if (index >= startIndex && count < rowsPerPage) {
      console.log("report to be added", reports[key]);
      newReports[key] = [...reports[key]];
      count += 1;
    }
  });
  console.log("new reports", newReports);
  return newReports;
};

export default function ReportsTable(props) {
  const { reports } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  console.log("reports in table", reports);

  const getItemsInSale = (sales) => {
    const items = [];
    sales.map((sale) => {
      sale.items.map((item) => {
        items.push(item);
      });
    });
    console.log(items);
    return items;
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleChangePage = (e, value) => {
    setPage(Number(value));
  };

  const getReportTotal = (report) => {
    console.log('total reports', report)
    let total = 0;
    report.map((item) => {
      total += item.quantity * item.price;
    });
    return total.toLocaleString();
  };

  const paginatedReports = applyPagination(reports, page, rowsPerPage);

  return (
    <Card>
      <Table>
        {Object.keys(paginatedReports).map((key, index) => {
          console.log("key", key);
          return (
            <>
              <TableHead sx={{ backgroundColor: "black" }} key={index}>
                <TableRow>
                  <TableCell>
                    <Box
                      sx={
                        {
                          // marginTop: "15px",
                          // paddingTop: "15px",
                          // paddingX: "8px",
                        }
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {moment(key).format("DD, MM, YYYY, dddd")}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="title"
                      fontSize={'18px'}
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {getReportTotal(paginatedReports[key])}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="center">quantity</TableCell>
                  <TableCell align="center">unit price</TableCell>
                  <TableCell align="right">total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReports[key].map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell align="left">{item?.name}</TableCell>
                      <TableCell align="center">{item?.quantity}</TableCell>
                      <TableCell align="center">{item?.price}</TableCell>
                      <TableCell align="right">
                        {item?.price * item?.quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          );
        })}
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 2, 5, 10]}
        component="div"
        count={Object.keys(reports).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
