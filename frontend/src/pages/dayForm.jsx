import { Box, TextField, Button } from "@mui/material";
import Header from "../components/header";

export default function DayForm() {

  return (
    <div>
      <Header/>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        action="/newDay"
        method="post"
      >
        <TextField id="savaites_diena" name="savaites_diena" label="Savaites diena:" variant="outlined" type="text" /><br/>
        
        <Button type="submit">Submit</Button>
        <Button href="/getDay/100">Get day id=100</Button>
        <Button href="/deleteDay/100" method="delete">Delete day id=100</Button>
      </Box>
    </div>
  );
}