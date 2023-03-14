import { Typography } from "@mui/material";
import Header from "../components/header";

export default function Home() {
    return (
        <div>
            <Typography sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wind_turbines_in_southern_California_2016.jpg/495px-Wind_turbines_in_southern_California_2016.jpg" alt="Wind" width={100} height={100} ></img>
                Home page
            </Typography>
            <Header />
        </div>
    );
}