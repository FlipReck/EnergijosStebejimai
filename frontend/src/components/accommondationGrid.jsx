import { Box, Grid } from "@mui/material";
import * as React from "react";
import AccommondationGridItem from "./accommondationGridItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import accommodationApi from "../Apis/accommodationApi";
export default function AccommondationGrid() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const repApi = new accommodationApi();
        const response = await repApi.getAllAccommendation();
        setData(response.data);
        console.log(data)
      } catch (err) {
        console.log(err)
        setData(null);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      { data === null || data.length === 0 ? (
      <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
      ) : (
      <Grid
        container
        spacing={2}
        sx={{
          gap: 3,
        }}
      >
        {data.map((el, index) => (
          <AccommondationGridItem
            data={el}
            key={index}
            onClick={() => navigate(`/accommodation/${index + 1}`)}
          />
        ))}
      </Grid>)}
    </Box>
  );
}