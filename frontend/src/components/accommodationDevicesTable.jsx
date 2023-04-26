import React from 'react';
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";

export default function DevicesTable({data1, setData1, navigate}){
    function deleteButtonHandle(id){
        if (window.confirm("Ar tikrai norite ištrinti prietaisą?")){
            deleteDevice(id);
        }
    }

    async function deleteDevice(deviceId){
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/devices/${deviceId}`);
            if (response.status === 204){
                window.alert("Prietaisas pašalintas");
                setData1(data1.filter(item => item.id !== deviceId));
            }
        } catch (error) {
            console.error(error);
            window.alert('Nepavyko pašalinti prietaiso');
        }
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography sx={{ textAlign: "center" }}>Prietaisai</Typography>
            <Box sx={{mb: 1}} display="flex" justifyContent="flex-end" >
                <Button style={{ background: "#1DA1F2", color: "white" }} 
                    onClick={() => navigate(`addDevice`)}>Pridėti prietasą</Button>
            </Box>
                    {data1 === null || data1.length === 0 ? (
                        <Typography sx={{ textAlign: "center" }}>Nėra pridėtų prietaisų</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Prietaiso pavadinimas
                                    </TableCell>
                                    <TableCell>
                                        IP adresas
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data1.map((row) => (
                                    <TableRow key={row.id}> 
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.ip_address}
                                        </TableCell>
                                        <TableCell>
                                            <Button sx={{mr: 1}} style={{ background: "#1DA1F2", color: "white" }}>
                                                Išjungti
                                            </Button>

                                            <Button  sx={{mr: 1}} style={{ background: "crimson", color: "white" }}
                                                onClick={() => navigate(`/accommodation/${row.id_patalpa}/editDevice/${row.id}`)}>
                                                Redaguoti
                                            </Button>
                                            <Button style={{ background: "crimson", color: "white" }}
                                                onClick={() => deleteButtonHandle(row.id)}>
                                                Ištrinti
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Box>
    )
}