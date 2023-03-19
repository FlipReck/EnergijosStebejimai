import { Box, Grid } from "@mui/material";
import * as React from "react";
import AccommondationGridItem from "./AccommondationGridItem";
import { useNavigate } from "react-router-dom";

export default function AccommondationGrid() {
  const navigate = useNavigate();
  const data = ["Place1", "Place2", "Place3", "Place4", "Place5"];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
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
      </Grid>
    </Box>
  );
}