import { useEffect, useState } from "react";
import graphApi from "../Apis/graphApi";
import Graph from "../components/graph";
import Header from "../components/header";
import { Typography, Box } from "@mui/material";

export default function GraphPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const grphApi = new graphApi();
            const response = await grphApi.getHourGraph();
            setData(response.data);
          } catch (err) {
            setData(null);
          }
        };
        getData();
      }, []);

    return (
        <div>
            <Typography sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl:2 }}>
                Data graph
            </Typography>
            <Header/>
            <Typography sx={{ textAlign: "center" , my: 4}}>Average peak power usage for each hour on 2023-02-15</Typography>
            <Box sx={{ width: 1000, margin: "0 auto", mb: 4 }}><canvas id="power"></canvas></Box>
            <Graph data={data}/>
        </div>
    );
  }