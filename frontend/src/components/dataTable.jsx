import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography,
} from "@mui/material";

export default function DataTable({data}) {
    return (
      <TableContainer sx={{ width: 1000, margin: "0 auto" }}>
        { data === null || data.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
        ) : (
        <div>
          <Table>
            <TableHead>
             <TableRow>
              <TableCell>
                id
              </TableCell>
              <TableCell>
                sensor Id
              </TableCell>
              <TableCell>
                power
              </TableCell>
              <TableCell>
                reading time
              </TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                 {row.id}
                </TableCell>
                <TableCell>
                 {row.sensor_id}
                </TableCell>
                <TableCell>
                 {row.power}
                </TableCell>
                <TableCell>
                 {row.reading_time}
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>)}
        </TableContainer>
    );
  }