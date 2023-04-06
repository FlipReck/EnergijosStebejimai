import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import timeApi from "../Apis/timeApi";
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
import { MenuProps } from "../helpers/menuProps";

export default function DayForm() {

  const days = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis',
    'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const getTimes = async () => {
        try {
            const api = new timeApi();
            const response = await api.getAll();
            setTimes(response.data);
        } catch (err) {
          setTimes(null);
        }
    };
    getTimes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roomId = data.get('dayId');
    postDay(roomId, selectedTimes);
  };

  const handleChange = (event) => {
    const {target: { value }} = event;

    setSelectedTimes((typeof value === 'string' ? value.split(',') : value));
};

async function postDay(weekDay, times){
  try{
      const response = await axios.post("http://127.0.0.1:5000/newday", {savaites_diena: weekDay});
      const dayId = response.data.id;

      times.forEach(el => {addDayTimes(dayId, el.id)});
      window.alert("Diena sukurta");
  } catch (error){
      console.error(error);
      window.alert('klaida');
  }
}

async function addDayTimes(dayId, timeId){
  try {
      await axios.post(`http://127.0.0.1:5000/days/${dayId}/addtime`, {
        timeId: timeId
      });
  } catch (error) {
      console.error(error);
      window.alert('klaida');
  }
}

const checkTime = (day) => {
  let flag = false;
  selectedTimes.forEach(x => {
    if (x.pradzia <= day.pabaiga) {
      if (x.pabaiga > day.pradzia)
      {
        flag = true;
      }
    }
  });
  return flag;
}

  return (
    <div>
        <Header/>

        <Container component="main" maxWidth="xs">
        <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
            Dienos forma
        </Typography>
            <Box
              sx={{alignItems: 'center'}}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            name="dayId"
                            required
                            fullWidth
                            id="dayId"
                            label="Savaitės diena"
                            select
                            defaultValue=""
                            >
                            {days.map((day) => (
                            <MenuItem key={day} value={day}>
                                {day}
                            </MenuItem>
                            ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="times-label">Laikai</InputLabel>
                            <Select
                            labelId="times-label"
                            id="times-checkbox"
                            multiple
                            value={selectedTimes}
                            onChange={handleChange}
                            input={<OutlinedInput label="Laikai" />}
                            renderValue={(selected) => selected.map((x) => x.pradzia + '-' +  x.pabaiga).join(', ')}
                            MenuProps={MenuProps}
                            >
                            {times.map((x) => (
                                <MenuItem key={x.id} value={x} disabled={!selectedTimes.some(el => el.id === x.id) && checkTime(x)}>
                                <Checkbox checked={selectedTimes.indexOf(x) > -1}/>
                                <ListItemText primary={x.pradzia + '-' +  x.pabaiga} />
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