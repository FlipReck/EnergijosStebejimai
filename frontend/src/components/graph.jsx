import {
    Typography,
} from "@mui/material";
import Chart from 'chart.js/auto'

let myChart = null;

export default function Graph({ data, canvas, type }) {
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
    if (type == "day") {
        myChart = new Chart(
            document.getElementById(canvas).getContext('2d'),
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
    }
    else if (type == "month") {
        myChart = new Chart(
            document.getElementById(canvas).getContext('2d'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.day),
                    datasets: [
                        {
                            label: 'avrg power',
                            data: data.map(row => row.power)
                        }
                    ],
                    
                }
            }
        );
    }
    else if (type == "year") {
        myChart = new Chart(
            document.getElementById(canvas).getContext('2d'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.month),
                    datasets: [
                        {
                            label: 'avrg power',
                            data: data.map(row => row.power)
                        }
                    ],
                    
                }
            }
        );
    }
    

    return (
        <></>
    );
}