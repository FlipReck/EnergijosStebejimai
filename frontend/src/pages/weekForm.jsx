import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import dayApi from "../Apis/dayApi";
import accommodationApi from "../Apis/accommodationApi";
import Header from "../components/header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  
  export default function WeekForm() {
    
    const [rooms, setRooms] = useState([]);
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const api = new accommodationApi();
                const response = await api.getAllAccommendation();
                setRooms(response.data);
            } catch (err) {
                setRooms(null);
            }
        };

        const getDays = async () => {
            try {
                const api = new dayApi();
                const response = await api.getAvailableDays();
                setDays(response.data);
            } catch (err) {
                console.log(err.response.data.message)
                setDays(null);
            }
        };

        getDays();
        getRooms();
    }, []);

      const handleChange = (event) => {
        const {
            target: { value },
        } = event;

      setSelectedDays(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
      
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      postWeek(data.get('roomId'), selectedDays);
    };

    async function postWeek(roomId, days){
        try{
            const response = await axios.post("http://127.0.0.1:5000/weeks", {roomId: roomId});
            const weekId = response.data.id;

            days.forEach(el => {addWeekDays(weekId, el.id)});
            window.alert("Savaitė sukurta");
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

    return (
        <div>
            <Header/>

            <Container component="main" maxWidth="xs">
            <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                Savaitės forma
            </Typography>
                <Box
                sx={{
                marginTop: 8,
                alignItems: 'center'
                }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                name="roomId"
                                required
                                fullWidth
                                id="roomId"
                                label="Patalpa"
                                select
                                defaultValue=""
                                >
                                {rooms.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.pavadinimas}
                                </MenuItem>
                                ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="weekDays-label">Dienos</InputLabel>
                                <Select
                                labelId="weekDays-label"
                                id="weekDays-checkbox"
                                multiple
                                value={selectedDays}
                                onChange={handleChange}
                                input={<OutlinedInput label="Dienos" />}
                                renderValue={(selected) => selected.map((x) => x.savaites_diena).join(', ')}
                                MenuProps={MenuProps}
                                >
                                {days.map((x) => (
                                    <MenuItem key={x.id} value={x} disabled={selectedDays.some(el => el.savaites_diena === x.savaites_diena) && !selectedDays.some(el => el.id === x.id)}>
                                    <Checkbox checked={selectedDays.indexOf(x) > -1}/>
                                    <ListItemText primary={x.savaites_diena} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
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