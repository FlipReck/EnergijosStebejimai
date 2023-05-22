import { Container, Typography, Box, Button } from "@mui/material";
import * as React from "react";
import Header from "../components/header";
import AccommondationGrid from "../components/accommondationGrid";
import { useParams, useNavigate, Link } from "react-router-dom";


export default function AccommondationList() {

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
        <Typography
          className="page-title"
          variant="h3"
          sx={{ borderBottom: "1px solid gray", pb: 1, my: 4 }}
        >
          Patalpos
        </Typography>
        <Box sx={{ mb: 1 }} display="flex" justifyContent="flex-end" >
          <Button style={{ background: "#1DA1F2", color: "white" }}
           onClick={() => navigate(`/accommodation/new`)}>Nauja patalpa</Button>
        </Box>
        <div className="middle-section">
          <AccommondationGrid />
        </div>
      </Container>
    </>
  );
}