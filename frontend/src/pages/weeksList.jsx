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
import weekApi from "../Apis/weekApi";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import axios from "axios";

export default function WeeksList() {
    
    const [accommodationWeeks, setAccommodationWeeks] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();    

    useEffect(() => {
        const accommodationWeeks = async (id) => {
            try {
                const api = new weekApi();
                const response = await api.getAccommodationWeeks(id);
                setAccommodationWeeks(response.data);
            } catch (err) {
                console.log(err.response.data.message)
                setAccommodationWeeks(null);
            }
        };
        accommodationWeeks(id);
    }, [id]);

    function deleteButtonHandle(id){
        if (window.confirm("Ar tikrai norite ištrinti savaitę?")){
            deleteWeek(id);
        }
    }

    async function deleteWeek(accommodationId){
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/weeks/${accommodationId}`);
            if (response.status === 204){
                window.alert("Savaitė pašalinta");
                setAccommodationWeeks(accommodationWeeks.filter(item => item.id !== accommodationId));
            }
        } catch (error) {
            console.error(error);
            window.alert('Nepavyko pašalinti prietaiso');
        }
    }

    async function setActiveWeek(weekId, roomId){
        if (accommodationWeeks.find(x => x.id === weekId).active !== 1)
        {
            try{
                const response = await axios.put(`http://127.0.0.1:5000/weeks/${weekId}/setActive`);
                if (response.status === 200)
                {
                    await axios.put(`http://127.0.0.1:5000/weeks/${weekId}/checkActive`, {
                        weekId: weekId,
                        room: roomId
                    });
                }
                setAccommodationWeeks(accommodationWeeks.map(x => {
                    if (x.id === weekId){
                        return {...x, active: 1}
                    }
                    else if(x.active === 1 && x.id !== weekId){
                        return {...x, active: 0}
                    }
                    return x;
                }))
                window.alert("Savaitė aktyvuota");
            } catch (error){
                console.error(error);
                window.alert('klaida');
            }
        }
    }

    async function postWeek(roomId){
        try{
            const response = await axios.post("http://127.0.0.1:5000/weeks", {roomId: roomId});
            if (response.status === 201)
            {
                const weekId = response.data.id;
                const newObj = {id: weekId, active: 0, id_patalpa: parseInt(roomId)}
                setAccommodationWeeks([...accommodationWeeks, newObj])
                window.alert("Savaitė pridėta");
            }
        } catch (error){
            console.error(error);
            window.alert('klaida');
        }
    }

    return (
        <div>
            <Header />
            <Container>
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Tvarkaraščio savaitės
                </Typography>
                
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{mb: 1}} display="flex" justifyContent="flex-end" >
                    <Button style={{ background: "#1DA1F2", color: "white" }}
                        onClick={() => postWeek(id)}>Pridėti naują savaitę</Button>
                </Box>
                
                {accommodationWeeks === null || accommodationWeeks.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>Nėra pridėtų savaičių</Typography>) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Savaitės numeris
                                </TableCell>
                                <TableCell>
                                    Aktyvi savaitė
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {accommodationWeeks.map((row) => (
                                <TableRow key={row.id}> 
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.active === 1 ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankIcon/>)}
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{mr: 1}} style={{ background: "#1DA1F2", color: "white" }}
                                        onClick={() => navigate(`${row.id}`)}>
                                            Peržiūrėti
                                        </Button>

                                        <Button sx={{mr: 1}} style={{ background: "MediumSeaGreen", color: "white" }}
                                        onClick={() => setActiveWeek(row.id, id)}>
                                            Aktyvuoti
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
            </Container>
        </div>
    );
}