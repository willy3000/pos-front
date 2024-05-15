import React, { useState } from "react";
import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  Tooltip,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import moment from "moment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FormatListBulletedRounded, Key } from "@mui/icons-material";
import Activate from "./activate";
import CodeCopied from "./code-copied";
import HourglassBottomSharpIcon from "@mui/icons-material/HourglassBottomSharp";

export default function PaymentHistoryTable(props) {
  const { payments } = props;
  const [code, setCode] = useState();
  const [openActivateCode, setOpenActivateCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const onCloseCodeCopied = () => {
    setCodeCopied(false);
  };

  console.log("payments in table", payments);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
  };

  const onCloseActivateCode = () => {
    setOpenActivateCode(false);
  };

  const handleOpenActivateCode = (code) => {
    setCode(code);
    setOpenActivateCode(true);
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Date Generated</TableCell>
            <TableCell align="center">Date Activated</TableCell>
            <TableCell align="center">Expiry Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Code</TableCell>
            <TableCell align="center">Key</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => {
            return (
              <TableRow key={payment.id}>
                <TableCell align="left">
                  {moment(payment?.dateGenerated).format("DD, MMM, YYYY")}
                </TableCell>
                <TableCell align="center">
                  {payment.dateActivated ? (
                    moment(payment?.dateActivated).format("DD, MMM, YYYY")
                  ) : (
                    <>--</>
                  )}
                </TableCell>
                <TableCell align="center">
                  {payment.expiry ? (
                    moment(payment?.expiry).format("DD, MMM, YYYY")
                  ) : (
                    <>--</>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: "bold" }}>
                    {payment?.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={payment?.code}>
                    <Typography
                      sx={{ cursor: "pointer" }}
                    >{`${payment?.code.substring(0, 10)}...`}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={payment?.key}>
                    <Typography sx={{ cursor: "pointer" }}>
                      {payment?.key ? payment.key : <>--</>}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={"copy code"}>
                    <IconButton onClick={() => copyCode(payment?.code)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"activate this code"}>
                    <IconButton
                      onClick={() => handleOpenActivateCode(payment?.code)}
                    >
                      <Key />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Activate
        {...{ open: openActivateCode, onClose: onCloseActivateCode, code }}
      />
      <CodeCopied {...{ open: codeCopied, onClose: onCloseCodeCopied }} />
    </Card>
  );
}
