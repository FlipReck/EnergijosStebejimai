import * as React from 'react';
import { useEffect, useState } from "react";
import Header from "../components/header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from "react-router-dom";
import sensorApi from '../Apis/sensorApi';

export default function SensorForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [validation, setValidation] = useState(false);
  const [sensors, setSensors] = useState([]);   

  useEffect(() => {
    const getSensors = async () => {
        try {
            const api = new sensorApi();
            const response = await api.getAllAccommodationSensors();
            setSensors(response.data);
        } catch (err) {
            console.log(err.response.data.message)
            setSensors(null);
        }
    };
    getSensors();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sensorId = data.get('sensorId');

    if (checkSameValues(sensorId, sensors))
    {
        !validation && setValidation(true);
    }
    else
    {
        postSensor(id, sensorId);
    }
  };

    async function postSensor(accommodationId, sensorId){
        try{
            const api = new sensorApi();
            const response = await api.postAccommodationSensor(accommodationId, sensorId)
            if (response.status === 201)
            {
                window.alert('sensorius pridėtas');
                navigate(-1)
            }
        } catch (error){
            console.error(error);
            window.alert('klaida');
        }
    }

  const checkSameValues = (newId, sensors) => {
    return sensors.some((el) => el.id === parseInt(newId));
  }

  return (
    <div>
        <Header/>

        <Container component="main" maxWidth="xs">
        <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
            Sensoriaus pridėjimas
        </Typography>
            <Box
              sx={{alignItems: 'center'}}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            name="sensorId"
                            required
                            fullWidth
                            id="sensorId"
                            label="Sensoriaus ID"
                            type="number"
                            InputProps={{ inputProps: { min: 1} }}
                            error={validation}
                            helperText={validation ? "Pasirinktas sensorius negalimas, naudojamas kitoje patalpoje" : ""}
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