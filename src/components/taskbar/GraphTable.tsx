import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { day: 'Monday', busNumber: "NB604", busTagSuc: 6, busTagFai: 24, date: "03/20/2023" },
  { day: 'Tuesday', busNumber: "NB605", busTagSuc: 9, busTagFai: 37, date: "03/21/2023" },
  { day: 'Wednesday', busNumber: "NB606", busTagSuc: 16, busTagFai: 24, date:  "03/22/2023" },
  { day: 'Thursday', busNumber: "NB607", busTagSuc: 3.7, busTagFai: 67, date: "03/23/2023" },
  { day: 'Friday', busNumber: "NB608", busTagSuc: 16, busTagFai: 49, date: "03/24/2023" },
];

const TableExample = () => {
  return (
    <TableContainer component={Paper} style={{width: 500}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="right">Bus Number</TableCell>
            <TableCell align="right">Bus Tag Succeed</TableCell>
            <TableCell align="right">Bus Tag Failed</TableCell>
            <TableCell align="right">Bus Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row:any) => (
            <TableRow key={row.day}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="right">{row.busNumber}</TableCell>
              <TableCell align="right">{row.busTagSuc}</TableCell>
              <TableCell align="right">{row.busTagFai}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableExample;
