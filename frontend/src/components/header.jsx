import {
    Menu,
    MenuItem,
    Button,
    ButtonGroup,
    Container,
    AppBar,
    Typography,
    Box
} from "@mui/material";
import React, { useState } from "react"
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useNavigate } from "react-router-dom";

const forms = [
    {
      name: "Patalpa",
      link: "",
    },
    {
      name: "Savaite",
      link: "",
    },
    {
      name: "Diena",
      link: "",
    },
    {
      name: "Uzimtumo laikas",
      link: "",
    },
    {
      name: "Sensorius",
      link: "sensorForm",
    },
  ];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    }
  
    return (
        <AppBar position="static">
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button style={{color:'white', px:5}}href="./">
                <Typography sx={{pr:3}} >Energijos stebejimas</Typography>
            </Button>
            <React.Fragment>
                <Button onClick={handleMenuClick} style={{color:'white', width:60, pl:5}}>
                    Formos
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={closeMenu}
                    onClick={closeMenu}>
                    {forms.map((form) => (
                        <MenuItem
                            key={form.name}
                            onClick={function () {
                            navigate(`/${form.link}`);
                            }}>
                        {form.name}
                        </MenuItem>
                    ))}
                </Menu>
            </React.Fragment>
            <Button href="./data" startIcon={<TableChartIcon />} style={{color:'white', pl:5}}>Sensor Data</Button>
            <Button href="./graph" startIcon={<EqualizerIcon />} style={{color:'white', pl:5}}>Graph</Button>
            </Box>
        </AppBar>
    );
    // return (
    //     <>
    //         <div>
    //             <ButtonGroup variant="contained" size="large" aria-label="text button group" sx={{ pl:4 }}>
                    
    //                 <Button href="./" startIcon={<HomeIcon />}>Homepage</Button>
    //                 <Button href="./data" startIcon={<TableChartIcon />}>Sensor Data</Button>
    //                 <Button href="./graph" startIcon={<EqualizerIcon />}>Graph</Button>
    //                 <Button href="./sensorForm" startIcon={<EqualizerIcon />}>Sensor Form</Button>
    //                 <Button href="./temp" startIcon={<EqualizerIcon />}>Temp</Button>
    //                 <Button href="./temp" startIcon={<EqualizerIcon />}>Temp</Button>
    //             </ButtonGroup>
    //         </div> 
    //     </>
    // );
}