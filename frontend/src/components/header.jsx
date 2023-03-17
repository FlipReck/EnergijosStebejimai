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
                <Button href="./temp" startIcon={<EqualizerIcon />}>Temp</Button>
                <Button href="./temp" startIcon={<EqualizerIcon />}>Temp</Button>
            </ButtonGroup>
        </>
    );
}