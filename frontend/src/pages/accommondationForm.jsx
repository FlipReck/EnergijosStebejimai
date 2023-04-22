import DataTable from "../components/dataTable";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import reportApi from "../Apis/reportApi";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import accommodationApi from "../Apis/accommodationApi";
import { useNavigate } from "react-router-dom";

export default function AccommondationForm() {
    const [pavadinimas, setPavadinimas] = useState(null);
    const [atsakingo_asmens_vardas, setAtsakingo_asmens_vardas] = useState(null);
    const [atsakingo_asmens_pavarde, setAtsakingo_asmens_pavarde] = useState(null);
    const [atsakingo_asmens_kontaktas, setAtsakingo_asmens_kontaktas] = useState(null);
    const [kompiuteriu_kiekis, setKompiuteriu_kiekis] = useState(null);
    const [energijos_riba_per_zmogu, setEnergijos_riba_per_zmogu] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
          if(pavadinimas === null || pavadinimas === ""){
            setPavadinimas(undefined);
            setPavadinimas(undefined);
          } 
          if(atsakingo_asmens_vardas === null || atsakingo_asmens_vardas === ""){
            setAtsakingo_asmens_vardas(undefined);
            setAtsakingo_asmens_vardas(undefined);
          }
          if(atsakingo_asmens_pavarde === null || atsakingo_asmens_pavarde === ""){
            setAtsakingo_asmens_pavarde(undefined);
            setAtsakingo_asmens_pavarde(undefined);
          } 
          if(atsakingo_asmens_kontaktas === null || atsakingo_asmens_kontaktas === ""){
            setAtsakingo_asmens_kontaktas(undefined);
            setAtsakingo_asmens_kontaktas(undefined);
          }
          if(kompiuteriu_kiekis === null || kompiuteriu_kiekis === ""){
            setKompiuteriu_kiekis(undefined);
            setKompiuteriu_kiekis(undefined);
          }
          if(energijos_riba_per_zmogu === null || energijos_riba_per_zmogu === ""){
            setEnergijos_riba_per_zmogu(undefined);
            setEnergijos_riba_per_zmogu(undefined);
          }
          if(pavadinimas !== null  && atsakingo_asmens_vardas !== null && atsakingo_asmens_pavarde !== null && 
              atsakingo_asmens_kontaktas !== null && kompiuteriu_kiekis > 0 && energijos_riba_per_zmogu > 0){
            const repApi = new accommodationApi();
            const response = await repApi.newPatalpa(pavadinimas, atsakingo_asmens_vardas, atsakingo_asmens_pavarde, atsakingo_asmens_kontaktas, kompiuteriu_kiekis, energijos_riba_per_zmogu);
            navigate(`/accommodation/${response.data.insertId}`);
          }
          else{
            setError("Nieko neįrašyta");
          }
        } catch (err) {
          setError(err.response.data.message);
          console.log(err);
        }
      };
    
    return (
        <div>
            <Header />
            <Container>
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Patalpos forma
                </Typography>
                <Box sx={{ pl: 3 }}>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                        <TextField sx={{ py: 5 }} InputLabelProps={{ shrink: true }} id="pavadinimas" name="pavadinimas" label="Pavadinimas" variant="outlined" type="text" onChange={(event) => {setPavadinimas(event.target.value);}}/><br />

                        <TextField sx={{ py: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_vardas" name="atsakingo_asmens_vardas" label="Atsakingo asmens vardas" variant="outlined" type="text" onChange={(event) => {setAtsakingo_asmens_vardas(event.target.value);}}/><br />

                        <TextField sx={{ py: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_pavarde" name="atsakingo_asmens_pavarde" label="Atsakingo asmens pavardė" variant="outlined" type="text" onChange={(event) => {setAtsakingo_asmens_pavarde(event.target.value);}}/><br />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                        <TextField sx={{ py: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_kontaktas" name="atsakingo_asmens_kontaktas" label="Atsakingo asmens kontaktas" variant="outlined" type="text" onChange={(event) => {setAtsakingo_asmens_kontaktas(event.target.value);}}/><br />

                        <TextField sx={{ py: 5 }} id="kompiuteriu_kiekis" name="kompiuteriu_kiekis" label="Kompiuterių kiekis" variant="outlined" type="number" onChange={(event) => {setKompiuteriu_kiekis(event.target.value);}}/><br />

                        <TextField sx={{ py: 5 }} id="energijos_riba_per_zmogu" name="energijos_riba_per_zmogu" label="Energijos riba per žmogų" variant="outlined" type="number" onChange={(event) => {setEnergijos_riba_per_zmogu(event.target.value);}}/><br />
                    </Box>

                    <Button style={{ background: "#1DA1F2", color: "white" }} onClick={handleClick}>Pateikti</Button>
                </Box>
                <Typography sx={{ mt: 3, color:'red'}}>
                {error}
                </Typography>
            </Container>
        </div>
    );
}