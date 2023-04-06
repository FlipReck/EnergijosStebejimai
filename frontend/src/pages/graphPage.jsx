import { useEffect, useState } from "react";
import graphApi from "../Apis/graphApi";
import Graph from "../components/graph";
import Header from "../components/header";
import { Typography, Box, Container, TextField } from "@mui/material";

export default function GraphPage() {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const grphApi = new graphApi();
        const response = await grphApi.getHourGraph("1", "2023-3-18");
        const response1 = await grphApi.getDayGraph("1", "2023-3-18");
        const response2 = await grphApi.getMonthGraph("1", "2023-3-18");
        setData(response.data);
        setData1(response1.data);
        setData2(response2.data);
        console.log(response.data)
        console.log(response1.data)
        console.log(response2.data)
      } catch (err) {
        setData(null);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
          Data graph
        </Typography>
        {/* <TextField sx={{ py: 5 }} id="test" name="test" label="test:" variant="outlined" type="date" /><br /> */}
        <Typography sx={{ textAlign: "center", my: 4 }}>Average peak power usage on 2023-03-18</Typography>

        {/* <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power"></canvas></Box>
        <Graph data={data} canvas={"power"} type={"day"} /> */}
        <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power1"></canvas></Box>
        <Graph data={data1} canvas={"power1"} type={"month"} />
        {/* <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power2"></canvas></Box>
        <Graph data={data2} canvas={"power2"} type={"year"} /> */}

      </Container>
    </div>
  );
}