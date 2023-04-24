import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
                Sensoriaus Id
              </TableCell>
              <TableCell>
                Momentinė galia
              </TableCell>
              <TableCell>
                Sąnaudos
              </TableCell>
              <TableCell>
                Duomenų perkaitymo laikas
              </TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                 {row.id_sensorius}
                </TableCell>
                <TableCell>
                 {row.galia}
                </TableCell>
                <TableCell>
                 {row.sanaudos}
                </TableCell>
                <TableCell>
                {row.laikas}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>)}
        </TableContainer>
    );
  }