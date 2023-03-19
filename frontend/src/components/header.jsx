import {
    Button,
    ButtonGroup,
    Container
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export default function Header() {
    return (
        <>
            <ButtonGroup variant="contained" size="large" aria-label="text button group" sx={{ pl:4 }}>
                <Button href="./" startIcon={<HomeIcon />}>Homepage</Button>
                <Button href="./data" startIcon={<TableChartIcon />}>Sensor Data</Button>
                <Button href="./graph" startIcon={<EqualizerIcon />}>Graph</Button>
                <Button href="./sensorForm" startIcon={<EqualizerIcon />}>Sensor Form</Button>
                <Button href="./dayForm" startIcon={<EqualizerIcon />}>Day Form</Button>
                <Button href="./timeForm" startIcon={<EqualizerIcon />}>Time Form</Button>
            </ButtonGroup>
        </>
    );
}