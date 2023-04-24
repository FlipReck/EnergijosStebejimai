import Header from "../components/header";
import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import accommodationApi from "../Apis/accommodationApi";
import graphApi from "../Apis/graphApi";
import Graph from "../components/graph";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Container } from "@mui/system";

export default function Accommondation() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [time, setTime] = useState(null);
    const [occupiedTimes, setOccupiedTimes] = useState(null);
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();
    const chartRef = useRef();
    let dayTemp = 0;

    useEffect(() => {
        const getData = async () => {
            try {
                const repApi = new accommodationApi();
                const response = await repApi.getAccommendation(id);
                const response1 = await repApi.getAllDevices(id);
                const response2 = await repApi.getAllWeeks(id);
                const response3 = await repApi.getAllTime();
                const response4 = await repApi.getAccommodationTimes(id);
                setData(response.data);
                setData1(response1.data);
                setData2(response2.data);
                setTime(response3.data);
                setOccupiedTimes(response4.data);
            } catch (err) {
                console.log(err.response.data.message)
                setData(null);
            }
        };

        const getEntries = async () => {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const day = today.getDate().toString().padStart(2, '0');
                const todayString = `${year}-${month}-${day}`;
                const grphApi = new graphApi();
                const response = await grphApi.getHourGraph(id, todayString);
                setEntries(response.data);
                console.log(todayString)
            } catch (err) {
                console.log(err.response.data.message)
                setEntries(null);
            }
          };

        getData();
        getEntries();
    }, []);

    function checking(uz_laikas, diena, extension)
    {
        var hold = occupiedTimes.filter(x => x.id_uzimtumo_laikas === uz_laikas && x.savaites_diena === diena)
        if(hold !== undefined && hold !== null && hold.length !== 0)
        {
            // var tag = (uz_laikas-1).toString()+ extension
            // console.log(tag)
            // document.getElementById(tag).style.backroundColor = "#1DA1F2";
            return "busy";
        }
    }

    return (
        <div>
            <Header />
            <Container>
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Patalpa
                </Typography>
                {data === null || data.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
                ) : (
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                        {console.log(data)}
                        <List>
                            <ListItem>Pavadinimas</ListItem>
                            <ListItem>Atsakingas asmuo</ListItem>
                            <ListItem>Atsakingo asmens kontaktas</ListItem>
                            <ListItem>Kompiuterių kiekis</ListItem>
                            <ListItem>Energijos riba per žmogų</ListItem>
                            <ListItem><Button style={{ background: "#1DA1F2", color: "white" }} onClick={() => navigate(`/accommodation/update/${id}`)}>
                                Redaguoti
                            </Button></ListItem>
                            <ListItem><Button style={{ background: "#1DA1F2", color: "white" }} onClick={() => navigate(`/accommodation/schedule/${id}`)}>
                                Patalpos tvarkaraštis
                            </Button></ListItem>
                        </List>
                        <List>
                            <ListItem>{data[0].pavadinimas}</ListItem>
                            <ListItem>{data[0].atsakingo_asmens_vardas} {data[0].atsakingo_asmens_pavarde}</ListItem>
                            <ListItem>{data[0].atsakingo_asmens_kontaktas}</ListItem>
                            <ListItem>{data[0].kompiuteriu_kiekis}</ListItem>
                            <ListItem>{data[0].energijos_riba_per_zmogu}</ListItem>
                        </List>
                    </Box>)}
                    <Typography sx={{ textAlign: "center" }}>Šiandienos momentinių enegijos sąnaudų diagrama</Typography>
                    <Graph ref={chartRef} data={entries} scale={"Valanda"} />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    {data1 === null || data1.length === 0 ? (
                        <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        id
                                    </TableCell>
                                    <TableCell>
                                        prietaiso pavadinimas
                                    </TableCell>
                                    <TableCell>
                                        IP adresas
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data1.map((row) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.ip_address}
                                        </TableCell>
                                        <TableCell>
                                            <Button style={{ background: "#1DA1F2", color: "white" }}>
                                                Išjungti
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Box>

                <center>
                    <Button style={{ background: "#1DA1F2", color: "white" }}>
                        Ištrinti įspėjimą
                    </Button>
                </center>

                <Box sx={{ flexGrow: 1, p: 3 }}>
                    {data1 === null || data1.length === 0 ? (
                        <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        
                                    </TableCell>
                                    <TableCell>
                                        Pimadienis
                                    </TableCell>
                                    <TableCell>
                                        Antradienis
                                    </TableCell>
                                    <TableCell>
                                        Trečiadienis
                                    </TableCell>
                                    <TableCell>
                                        Ketvirtadienis
                                    </TableCell>
                                    <TableCell>
                                        Penktadienis
                                    </TableCell>
                                    <TableCell>
                                        Šeštadienis
                                    </TableCell>
                                    <TableCell>
                                        Sekmadienis
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {time.map((row, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {row.pradzia} - {row.pabaiga}
                                            </TableCell>
                                            <TableCell  id={index+"t1"}>
                                                {(checking(index+1, 'Pirmadienis', "t1"))}
                                            </TableCell>
                                            <TableCell  id={index+"t2"}>
                                                {checking(index+1, 'Antradienis', "t2")}
                                            </TableCell>
                                            <TableCell  id={index+"t3"}>
                                                {checking(index+1, 'Trečiadienis', "t3")}
                                            </TableCell>
                                            <TableCell  id={index+"t4"}>
                                                {checking(index+1, 'Ketvirtadienis', "t4")}
                                            </TableCell>
                                            <TableCell  id={index+"t5"}>
                                                {checking(index+1, 'Penktadienis', "t5")}
                                            </TableCell>
                                            <TableCell  id={index+"t6"}>
                                                {checking(index+1, 'Šeštadienis', "t6")}
                                            </TableCell>
                                            <TableCell  id={index+"t7"}>
                                                {checking(index+1, 'Sekmadienis', "t7")}
                                            </TableCell>
                                        </TableRow>
                                    )

                                })}
                            </TableBody>
                        </Table>
                    )}
                </Box>
            </Container>
        </div>
    );
}