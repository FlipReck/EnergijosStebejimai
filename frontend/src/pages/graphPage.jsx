import { useEffect, useState } from "react";
import graphApi from "../Apis/graphApi";
import accommodationApi from "../Apis/accommodationApi";
import Graph from "../components/graph";
import Header from "../components/header";
import { Typography, Box, Container, TextField, Button, MenuItem, Grid } from "@mui/material";
import React, { useRef } from 'react';


export default function GraphPage() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const types = ['Metai', 'Menuo', 'Diena'];
  const chartRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const grphApi = new graphApi();
        const response = await grphApi.getHourGraph("1", "2023-3-18");
        setData(response.data);
      } catch (err) {
        console.log(err.response.data.message)
        setData(null);
      }
    };

    const getAccomodations = async () => {
      try {
        const accmApi = new accommodationApi();
        const response1 = await accmApi.getAllAccommendation();
        setData1(response1.data);
      } catch (err) {
        console.log(err.response.data.message)
        setData1(null);
      }
    };

    getData();
    getAccomodations();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const type = data.get('type');
    const accom = data.get('accomodation');
    const date = data.get('date');
    console.log(type);
    console.log(date);
    console.log(accom);
    getEntriesByDate(date, accom, type);

    //postDay(roomId, selectedTimes);
  };



  async function getEntriesByDate(date, accom, type) {
    const grphApi = new graphApi();
    let response;
    if (type === 'Metai') {
      response = await grphApi.getMonthGraph(accom, date);
      chartRef.current.updateData(response.data, 'Mėnuo');
    }
    else if (type === 'Menuo') {
      response = await grphApi.getDayGraph(accom, date);
      chartRef.current.updateData(response.data, 'Diena');
    }
    else if (type === 'Diena') {
      response = await grphApi.getHourGraph(accom, date);
      chartRef.current.updateData(response.data, 'Valanda');
    }
    console.log(response.data);
    
  }

  return (
    <div>
      <Header />
      <Container>
        <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
          Duomenų diagrama
        </Typography>
        {/* <TextField sx={{ py: 5 }} id="test" name="test" label="test:" variant="outlined" type="date" /><br /> */}
        <Typography sx={{ textAlign: "center", my: 4 }}>Vidutinė momentinė galia pasirinktu laiko intervalu</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="type"
                required
                fullWidth
                id="type"
                label="Grafo tipas"
                select
                defaultValue=""
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="accomodation"
                required
                fullWidth
                id="accomodation"
                label="Patalpa"
                select
                defaultValue=""
              >
                {data1.map((accomodation) => (
                  <MenuItem key={accomodation.id} value={accomodation.id}>
                    {accomodation.pavadinimas + ' ' + accomodation.atsakingo_asmens_pavarde}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth InputLabelProps={{ shrink: true }} id="date" name="date" label="Data:" variant="outlined" type="date" />
            </Grid>
          </Grid>
          <Button type="submit">Pateikti</Button>
        </Box>


        {/* <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power" aria-label="Hello ARIA World" role="img"></canvas></Box> */}
        <Graph ref={chartRef} data={data} scale={"hour"} />
        {/* <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power1" aria-label="Hello ARIA World" role="img"></canvas></Box>
        <Graph data={data1} canvas={"power1"} scale={"day"} /> */}
        {/* <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power2" aria-label="Hello ARIA World" role="img"></canvas></Box>
        <Graph data={data2} canvas={"power2"} scale={"month"} /> */}

      </Container>
    </div>
  );
}