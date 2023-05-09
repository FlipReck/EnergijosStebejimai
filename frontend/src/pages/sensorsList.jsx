import Header from "../components/header";
import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Typography
} from "@mui/material";
import { Container } from "@mui/system";
import sensorApi from "../Apis/sensorApi";

export default function SensorsList() {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [sensors, setSensors] = useState([]);    

    useEffect(() => {
        const getSensors = async (accommodationId) => {
            try {
                const api = new sensorApi();
                const response = await api.getAccommodationSensors(accommodationId);
                setSensors(response.data);
            } catch (err) {
                console.log(err.response.data.message)
                setSensors(null);
            }
        };
        getSensors(id);
    }, [id]);

    function deleteButtonHandle(sensorId){
        if (window.confirm("Ar tikrai norite ištrinti sensorių?")){
            deleteSensor(id, sensorId);
        }
    }

    async function deleteSensor(accommodationId, sensorId){
        try {
            const api = new sensorApi();
            const response = await api.deleteAccommodationSensor(accommodationId, sensorId)
            if (response.status === 204){
                window.alert("Sensorius pašalintas");
                setSensors(sensors.filter(item => item.id !== sensorId));
            }
        } catch (error) {
            console.error(error);
            window.alert('Nepavyko pašalinti sensoriaus');
        }
    }

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="sm">
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Sensoriai
                </Typography>
                
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{mb: 1}} display="flex" justifyContent="flex-end" >
                    <Button style={{ background: "#1DA1F2", color: "white" }}
                        onClick={() => navigate('new')}>Pridėti sensorių</Button>
                </Box>
                
                {sensors === null || sensors.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>Patalpa neturi pridėto sensoriaus/sensorių</Typography>) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Sensoriaus numeris
                                </TableCell>
                                
                                <TableCell/>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {sensors.map((row) => (
                                <TableRow key={row.id}> 
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>

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
            </Container>
        </div>
    );
}