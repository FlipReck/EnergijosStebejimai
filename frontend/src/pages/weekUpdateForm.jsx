import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import weekApi from "../Apis/weekApi";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { MenuProps } from "../helpers/menuProps";
  
  export default function WeekUpdateForm() {
    
    const [week, setWeek] = useState();
    const [isActive, setIsActive] = useState([])
    const [rooms, setRooms] = useState([]);
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [currentSelectedDays, setCurrentSelectedDays] = useState([]);

    const id = useParams().id;

    useEffect(() => {
        const getRooms = async () => {
            try {
                const api = new accommodationApi();
                const response = await api.getAllAccommendation();
                setRooms(response.data);
            } catch (err) {
                console.log(err.response.data.message)
                setRooms(null);
            }
        };

        const getWeek = async (id) => {
            try {
                const api = new weekApi();
                const response = await api.getOneWeek(id);
                setWeek(response.data);
                setIsActive(response.data.active === 0 ? false : true);
            } catch (err) {
                console.log(err.response.data.message)
                setWeek(null);
                setIsActive(false);
            }
        };

        const getWeekDays = async (id) => {
            try {
                const api_day = new dayApi();
                const api_week = new weekApi();

                const response_day = await api_day.getAvailableDays();
                const response_week = await api_week.getWeekDays(id);

                setSelectedDays(response_week.data);
                setCurrentSelectedDays(response_week.data);
                setDays(response_week.data.concat(response_day.data));
            } catch (err) {
                console.log(err.response.data.message)
                setSelectedDays(null);
                setCurrentSelectedDays(null);
                setDays(null);
            }
        };

        getRooms();
        getWeek(id);
        getWeekDays(id);

    }, [id]);

      const handleChange = (event) => {
        const {target: { value }} = event;

        setCurrentSelectedDays(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
      
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      updateWeek(id, data.get('roomId'), isActive, selectedDays, currentSelectedDays);
    };

    const handleCheckbox = (event) => {
        setIsActive(event.target.checked);
      };

    async function updateWeek(weekId, roomId, isActive, selectedDays, currentSelectedDays){
        try{
            const response = await axios.put(`http://127.0.0.1:5000/weeks/${weekId}`, {
                isActive: isActive === true ? 1 : 0,
                room: roomId
            });
            if (response.status === 200){
                if (isActive)
                {
                    const response1 = await axios.put(`http://127.0.0.1:5000/weeks/${weekId}/checkActive`, {
                        weekId: weekId,
                        room: roomId
                    });
                    if (response1.status === 200){
                        selectedDays.forEach(day => {!currentSelectedDays.some(el => day.id === el.id) && deleteWeekDay(weekId, day.id)});
                        currentSelectedDays.forEach(day => {!selectedDays.some(el => day.id === el.id) && addWeekDay(weekId, day.id)});
                    }
                }
                else{
                    selectedDays.forEach(day => {!currentSelectedDays.some(el => day.id === el.id) && deleteWeekDay(weekId, day.id)});
                    currentSelectedDays.forEach(day => {!selectedDays.some(el => day.id === el.id) && addWeekDay(weekId, day.id)});
                }
            }
            window.alert("Savaitė pakoreguota");
        } catch (error){
            console.error(error);
            window.alert('klaida');
        }
    }

    async function addWeekDay(weekId, dayId){
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

    async function deleteWeekDay(weekId, dayId){
        try {
            await axios.delete(`http://127.0.0.1:5000/weeks/${weekId}/deleteDay`, {
                data : {dayId: dayId}
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
            {week === null || week === undefined ? <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography> :
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
                                defaultValue={week.id_patalpa}
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
                                value={currentSelectedDays}
                                onChange={handleChange}
                                input={<OutlinedInput label="Dienos" />}
                                renderValue={(selected) => selected.map((x) => x.savaites_diena).join(', ')}
                                MenuProps={MenuProps}
                                >
                                {days.map((x) => (
                                    <MenuItem key={x.id} value={x} disabled={currentSelectedDays.some(el => el.savaites_diena === x.savaites_diena) && !currentSelectedDays.some(el => el.id === x.id)}>
                                    <Checkbox checked={currentSelectedDays.indexOf(x) > -1}/>
                                    <ListItemText primary={x.savaites_diena} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={isActive}
                                            onChange={handleCheckbox}/>}
                                label="Padaryti šią savaitę aktyvią"
                                />
                            </Grid>  
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Redaguoti
                        </Button>
                    </Box>
                </Box>}
            </Container>
        </div>
    );
  }