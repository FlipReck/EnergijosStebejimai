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
import { useEffect, useState } from "react";
import accommodationApi from '../Apis/accommodationApi';
  
  export default function DeviceForm() {

    const id = useParams().id;
    const deviceId = useParams().deviceId;

    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (deviceId) {
            const getData = async () => {
                try {
                    const repApi = new accommodationApi();
                    const response = await repApi.getDevice(id);
                    setName(response.data[0].name);
                    setIpAddress(response.data[0].ip_address);
                } catch (err) {
                    console.log(err.response.data.message)
                }
            };
            getData();
        }
    }, []);


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (!ValidateIPaddress(data.get('address')))
      {
        setValidation(true);
      }
      else
      {
        if(deviceId){
            patchDevice(id, data.get('computer'), data.get('address'), deviceId);
        } else {
            postDevice(id, data.get('computer'), data.get('address'));
        }
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

    async function patchDevice(roomId, computerName, ipAddress, deviceId){
        try{
            const response = await axios.patch(`http://127.0.0.1:5000/accommodations/${roomId}/devices/${deviceId}/update`, {
                deviceName: computerName,
                ipAddress: ipAddress
            });
            if (response.status === 201){
                window.alert("Prietaisas redaguotas");
                navigate(-1);
            }
            
        } catch (error){
            console.error(error);
            window.alert('Nepavyko redaguoti prietaiso');
        }
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
                Prietaiso {deviceId ? 'redagavimas' : 'pridėjimas'}
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
                                value={name}
                                onChange={(event) => {setName(event.target.value)}}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                name="address"
                                required
                                fullWidth
                                id="address"
                                label="Prietaiso IP adresas"
                                value={ipAddress}
                                onChange={(event) => {setIpAddress(event.target.value)}}
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
                            {deviceId ? 'Redaguoti' : 'Pridėti'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}