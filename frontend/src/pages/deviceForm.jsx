import * as React from 'react';
import axios from "axios";
import Header from "../components/header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
  
  export default function DeviceForm() {

    const id = useParams().id;
    const navigate = useNavigate();

    const [validation, setValidation] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (!ValidateIPaddress(data.get('address')))
      {
        setValidation(true);
      }
      else
      {
        postDevice(id, data.get('computer'), data.get('address'));
      }
    };

    function ValidateIPaddress(ipaddress) 
    {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
        {
            return (true)
        }
        return (false)
    }

    async function postDevice(roomId, computerName, ipAddress){
        try{
            const response = await axios.post(`http://127.0.0.1:5000/accommodations/${roomId}/devices`, {
                deviceName: computerName,
                ipAddress: ipAddress
            });
            if (response.status === 201){
                window.alert("Prietaisas pridėtas");
                navigate(-1);
            }
            
        } catch (error){
            console.error(error);
            window.alert('Nepavyko pridėti prietaiso');
        }
    }

    return (
        <div>
            <Header/>

            <Container component="main" maxWidth="xs">
            <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                Prietaiso pridėjimas
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
                                name="computer"
                                required
                                fullWidth
                                id="computer"
                                label="Prietaiso pavadinimas"
                                defaultValue=""
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                name="address"
                                required
                                fullWidth
                                id="address"
                                label="Prietaiso IP adresas"
                                defaultValue=""
                                error={validation}
                                helperText={validation === false ? "" : "Netinkamas IP adresas"}
                                />
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