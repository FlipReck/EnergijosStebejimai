import {
    Typography,
} from "@mui/material";
import Chart from 'chart.js/auto'

var myChart = null;

export default function Graph({ data }) {
    if (data === null || data.length === 0) {
        return (
            <Typography sx={{ textAlign: "center" }}>It's empty!</Typography>
        );
    }

    //var hours = Array.from(Array(24).keys())
    

    
    if(myChart){
        myChart.clear();
        myChart.destroy();
    }
    myChart = new Chart(
        document.getElementById('power'),
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.hour),
                datasets: [
                    {
                        label: 'avrg power',
                        data: data.map(row => row.power)
                    }
                ],
                
            }
        }
    );

    return (
        <></>
    );
}