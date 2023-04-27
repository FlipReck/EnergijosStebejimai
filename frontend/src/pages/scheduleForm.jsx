import Header from "../components/header";
import React from 'react';
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import weekApi from "../Apis/weekApi";
import SchdeuleDays from "../components/scheduleDays";
import { useParams, useNavigate } from "react-router-dom";

export default function ScheduleForm() {
    
    const navigate = useNavigate();
    
    const { id, weekId } = useParams();
    const[days, setDays] = useState([]);

    useEffect(() => {
        const getData = async (id, weekId) => {
            try {
                const api = new weekApi();
                const responose = await api.getWeekSchedule(id, weekId);
                setDays(responose.data);

            } catch (err) {
                console.log(err.response.data.message)
                setDays(null);
            }
        };
        getData(id, weekId);
    }, []);

    return (
        <div>
            <Header />
            <Container>
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Savaitės Nr. {weekId} tvarkaraštis
                </Typography>

                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Pirmadienis')} weekName={'Pirmadienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Antradienis')} weekName={'Antradienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Trečiadienis')} weekName={'Trečiadienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Ketvirtadienis')} weekName={'Ketvirtadienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Penktadienis')} weekName={'Penktadienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Šeštadienis')} weekName={'Šeštadienis'} navigate={navigate} dayId={id} weekId={weekId}/>
                <SchdeuleDays times={days.filter(x => x.savaites_diena === 'Sekmadienis')} weekName={'Sekmadienis'} navigate={navigate} dayId={id} weekId={weekId}/>

            </Container>
        </div>
    );
}