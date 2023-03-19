// import { useEffect, useState } from "react";
// import dayApi from "../Apis/dayApi";
import { Box, TextField, Button } from "@mui/material";
import Header from "../components/header";

export default function TimeForm() {

  // const [data, setData] = useState('');

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const dApi = new dayApi();
  //       const response = await dApi.getAll();
  //       setData(response.data);
  //       console.log(response.data);
  //     } catch (err) {
  //       setData(null);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <div>
      <Header />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        action="/newTime"
        method="post"
      >
        <TextField InputLabelProps={{ shrink: true }} id="pradzia" name="pradzia" label="Pradzia:" variant="outlined" type="time" /><br />

        <TextField InputLabelProps={{ shrink: true }} id="pabaiga" name="pabaiga" label="Pabaiga:" variant="outlined" type="time" /><br />

        <TextField id="asmenu_kiekis" name="asmenu_kiekis" label="Asmenu kiekis:" variant="outlined" type="number" /><br />

        {/* <InputLabel id="demo-simple-select-label">Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Day"
          name="Diena"
        >
          {data.map((row) => (
            <MenuItem value={row.id}>
              {row.savaites_diena}
            </MenuItem>
          ))}
        </Select><br/>  */}

        <Button type="submit">Submit</Button>
      </Box>
    </div>
  );
}