import * as React from 'react';
import { useEffect, useState } from "react";
import Header from "../components/header";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from "react-router-dom";
import timeApi from '../Apis/timeApi';
import { Button } from '@mui/material';

export default function TimeView() {

    const { id } = useParams();

    const [time, setTime] = useState();

    useEffect(() => {
        const getTimeInfo = async (id) => {
            try {
                const api = new timeApi();
                const response = await api.getTime(id);
                setTime(response.data[0]);
            } catch (err) {
                setTime(null);
            }
        };
        getTimeInfo(id);
    }, []);

    return (
        <div>
            <Header />

            <Container component="main" maxWidth="xs">
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4}}>
                    Laiko puslapis
                </Typography>
                <Button sx={{ mr: 1, mb: 4, }} style={{ background: "crimson", color: "white" }}
                    // onClick={() => navigate(``)}
                    >
                    Redaguoti
                </Button>
                {time != null ? (
                    <Box sx={{ alignItems: 'center' }} >
                        <Typography sx={{ textAlign: "left" }}>
                            {time.pradzia} - {time.pabaiga}
                        </Typography>
                        <Typography sx={{ textAlign: "left" }}>
                            Asmenų kiekis: {time.asmenu_kiekis}
                        </Typography>
                    </Box>
                ) : ''}
            </Container>
        </div>
    );
}