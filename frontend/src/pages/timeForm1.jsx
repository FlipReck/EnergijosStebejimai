import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from "react-router-dom";
import accommodationApi from '../Apis/accommodationApi';
import timeApi from '../Apis/timeApi';

export default function TimeForm1() {

  const { id, dayId } = useParams();
  const navigate = useNavigate();

  const[accommodation, setAccommodation] = useState();
  const[times, setTime] = useState();
  const[timeValidation, setTimeValidation] = useState(false);
  const[computerValidation, setComputerValidation] = useState(false);

  useEffect(() => {
    const getAccommodation = async (id) => {
        try {
            const api = new accommodationApi();
            const response = await api.getAccommendation(id);
            setAccommodation(response.data[0]);
        } catch (err) {
            setAccommodation(null);
        }
    };

    const getDayTimes = async (dayId) => {
        try {
            const api = new timeApi();
            const response = await api.getDayTimes(dayId);
            setTime(response.data);
        } catch (err) {
            setTime(null);
        }
    };
    getAccommodation(id);
    getDayTimes(dayId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const startTime = data.get('pradzia');
    const endTime = data.get('pabaiga');
    const amount = data.get('kiekis');

    if (checkTime(times, startTime, endTime))
    {
        setTimeValidation(true);
    }
    else if (checkComputerAmount(accommodation, amount))
    {
        setComputerValidation(true);
        timeValidation && setTimeValidation(false);
    }
    else
    {
        postTime(startTime, endTime, amount, dayId);
    }
  };

    async function postTime(startTime, endTime, amount, dayId){
        try{
            const response = await axios.post("http://127.0.0.1:5000/newTime", {
                pradzia: startTime,
                pabaiga: endTime,
                asmenu_kiekis: amount
            });
            if (response.status === 201)
            {
                const timeId = response.data.id;
                addDayTimes(dayId, timeId)
            }
        } catch (error){
            console.error(error);
            window.alert('klaida');
        }
    }

  async function addDayTimes(dayId, timeId){
    try {
        const response = await axios.post(`http://127.0.0.1:5000/days/${dayId}/addtime`, {
          timeId: timeId
        });
        if (response.status === 201)
        {
            window.alert("Laikas pridėtas");
            navigate(-1);
        }
    } catch (error) {
        console.error(error);
        window.alert('klaida');
    }
  }

  const checkTime = (times, startTime, endTime) => {
    let flag = false;
    times.forEach(x => {
      if (x.pradzia <= endTime) {
        if (x.pabaiga > startTime)
        {
          flag = true;
        }
      }
    });
    return flag;
  }

  const checkComputerAmount = (roomDetails, computerCount) => {
    if (roomDetails.kompiuteriu_kiekis >= computerCount)
    {
        return false;
    }
    else
    {
        return true;
    }

  }

  return (
    <div>
        <Header/>

        <Container component="main" maxWidth="xs">
        <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
            Laiko pridėjimas
        </Typography>
            <Box
              sx={{alignItems: 'center'}}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            name="pradzia"
                            required
                            fullWidth
                            id="pradzia"
                            label="Pradžia"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            error={timeValidation}
                            helperText={timeValidation ? "Netinkamas laikas - persidengia su kitais laikais" : ""}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            name="pabaiga"
                            required
                            fullWidth
                            id="pabaiga"
                            label="Pabaiga"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            error={timeValidation}
                            helperText={timeValidation ? "Netinkamas laikas - persidengia su kitais laikais" : ""}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            name="kiekis"
                            required
                            fullWidth
                            id="kiekis"
                            label="Asmenų kiekis"
                            type="number"
                            InputProps={{ inputProps: { min: 0} }}
                            error={computerValidation}
                            helperText={computerValidation ? "Patalpoje nėra tiek kompiuterių" : ""}
                            >
                            </TextField>
                        </Grid>
                        
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Pridėti
                    </Button>
                </Box>
            </Box>
        </Container>
    </div>
);
}