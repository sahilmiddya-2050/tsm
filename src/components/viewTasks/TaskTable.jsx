import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import More from "./More";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TaskTable({ tasks, setTasks }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Task Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time (status)</StyledTableCell>
            <StyledTableCell align="center">More</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <StyledTableRow key={task.startTime}>
              <StyledTableCell component="th" scope="row">
                {task.taskname}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title={task.description}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      noWrap
                      align="center"
                      sx={{ maxWidth: "200px" }}
                    >
                      {task.description}
                    </Typography>
                  </Box>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="center">
                {new Date(task.startTime).toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task.endTime === null
                  ? "Pending"
                  : new Date(task.endTime).toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                <More task={task} setTasks={setTasks} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
