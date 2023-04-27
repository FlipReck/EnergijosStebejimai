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
import { useEffect, useState } from "react";

export default function SchdeuleDays({times, weekName, navigate, dayId, weekId}){

    const [dayTimes, setDayTimes] = useState([]);

    useEffect(() => {
        const setDaytimes = () => {
            setDayTimes(times);
        };
        setDaytimes();
    }, [times]);
    
    async function postDay(weekName, weekId){
        try{
            const response = await axios.post("http://127.0.0.1:5000/newday", {savaites_diena: weekName});
            if (response.status === 201)
            {
                const dayId = response.data.id;
                await addWeekDays(weekId, dayId)
                return dayId;
            }
        } catch (error){
            console.error(error);
            window.alert('klaida');
        }
      }

    async function addWeekDays(weekId, dayId){
        try {
            await axios.post("http://127.0.0.1:5000/weeks/addDay", {
                weekId: weekId,
                dayId: dayId
            });

        } catch (error) {
            console.error(error);
            window.alert('klaida');
        }
    }

    async function navigateNewDay(dayId, weekName, weekId){
        const result = await postDay(weekName, weekId);
        navigate(`/accommodation/${dayId}/weeks/${weekId}/days/${result}/times/new`)
    }

    function deleteButtonHandle(id){
        if (window.confirm("Ar tikrai norite šį laiką?")){
            deleteTime(id);
        }
    }

    async function deleteTime(timeId){
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/times/${timeId}`);
            if (response.status === 204){
                deleteDayTime(timeId);
                window.alert("Laikas pašalintas");
                setDayTimes(dayTimes.filter(item => item.id_uzimtumo_laikas !== timeId));
            }
        } catch (error) {
            console.error(error);
            window.alert('Nepavyko pašalinti laiko');
        }
    }

    async function deleteDayTime(timeId){
        try {
            await axios.delete(`http://127.0.0.1:5000/dayTime/${timeId}`);
        } catch (error) {
            console.error(error);
            window.alert('Klaida');
        }
    }

    return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>{weekName}</Typography>
        
        <Box sx={{mb: 1}} display="flex" justifyContent="flex-end">
            <Button style={{ background: "#1DA1F2", color: "white" }}
                onClick={() => times.length === 0 ? (navigateNewDay(dayId, weekName, weekId)) :
                    (navigate(`/accommodation/${dayId}/weeks/${weekId}/days/${dayTimes[0].id_diena}/times/new`))}>
                Pridėti laiką</Button>
        </Box>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Pradžia
                    </TableCell>
                    <TableCell>
                        Pabaiga
                    </TableCell>
                    <TableCell>
                        Asmenų skaičius
                    </TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>

            <TableBody>
                {dayTimes.map(x => {
                    if (x.id_uzimtumo_laikas !== null) {return (<TableRow key={x.id_uzimtumo_laikas}>
                        <TableCell>
                            {x.pradzia}
                        </TableCell>
                        <TableCell>
                            {x.pabaiga}
                        </TableCell>
                        <TableCell>
                            {x.asmenu_kiekis}
                        </TableCell>
                        <TableCell>
                            <Button sx={{mr: 1}} style={{ background: "#1DA1F2", color: "white" }}
                            >
                                Redaguoti laiką
                            </Button>

                            <Button style={{ background: "crimson", color: "white" }}
                            onClick={() => deleteButtonHandle(x.id_uzimtumo_laikas)}>
                                Ištrinti
                            </Button>
                        </TableCell>
                    </TableRow>)}
                })}
            </TableBody>
        </Table>
    </Box>)
}