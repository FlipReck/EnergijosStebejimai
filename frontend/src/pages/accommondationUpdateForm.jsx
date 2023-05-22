import Header from "../components/header";
import * as React from 'react';
import { useEffect, useState } from "react";
import { Button, Container, Typography, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import accommodationApi from "../Apis/accommodationApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AccommondationUpdateForm() {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(true);
      
    const handleChange = (event) => {
          setChecked(event.target.checked);
        };

    useEffect(() => {
        const getData = async () => {
            try {
                const repApi = new accommodationApi();
                const response = await repApi.getAccommendation(id);
                setData(response.data);
                console.log(response.data[0].asmeniniai_prietaisai)
                setChecked(checking(response.data[0].asmeniniai_prietaisai));
            } catch (err) {
                console.log(err.response.data.message)
                setData(null);
            }
            
        };
        getData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const accommondationData = ({
            accommondationId: id,
            pavadinimas: data.get('pavadinimas'),
            atsakingo_asmens_vardas: data.get('atsakingo_asmens_vardas'),
            atsakingo_asmens_pavarde: data.get('atsakingo_asmens_pavarde'),
            atsakingo_asmens_kontaktas: data.get('atsakingo_asmens_kontaktas'),
            kompiuteriu_kiekis: data.get('kompiuteriu_kiekis'),
            energijos_riba_per_zmogu: data.get('energijos_riba_per_zmogu'),
            min_energija_ispejimui: data.get('min_energija_ispejimui'),
            asmeniniai_prietaisai: checkingSubmit(data.get('asmeniniai_prietaisai'))
        });
        console.log(accommondationData);
        axios.post(`http://127.0.0.1:5000/updateAccommendation`, accommondationData).then(response => {
            // console.log(response);
            if (response.status == 201) {
                window.alert("Patalpa redaguota");
                navigate(`/accommodation/${id}`)
            }
        }).catch(error => alert(error.response.statusText));
    };

    function checking(asmeniniai_prietaisai) {
        if (asmeniniai_prietaisai === 0) {
            return false;
        }
        else return true
    }

    function checkingSubmit(asmeniniai_prietaisai) {
        if (asmeniniai_prietaisai === null) {
            return 0;
        }
        else return 1
    }

    return (
        <div>
            <Header />
            <Container>
                <Typography className="page-title" sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl: 2 }}>
                    Patalpos redagavimo forma
                </Typography>
                {data === null || data.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
                ) : (
                    <Box sx={{ pl: 3 }}
                        component="form"
                        onSubmit={handleSubmit}>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                            <TextField sx={{ my: 5 }} InputLabelProps={{ shrink: true }} id="pavadinimas" name="pavadinimas" label="Pavadinimas" variant="outlined" type="text" defaultValue={data[0].pavadinimas} /><br />

                            <TextField sx={{ my: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_vardas" name="atsakingo_asmens_vardas" label="Atsakingo asmens vardas" variant="outlined" type="text" defaultValue={data[0].atsakingo_asmens_vardas} /><br />

                            <TextField sx={{ my: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_pavarde" name="atsakingo_asmens_pavarde" label="Atsakingo asmens pavardė" variant="outlined" type="text" defaultValue={data[0].atsakingo_asmens_pavarde} /><br />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                            <TextField sx={{ my: 5 }} InputLabelProps={{ shrink: true }} id="atsakingo_asmens_kontaktas" name="atsakingo_asmens_kontaktas" label="Atsakingo asmens kontaktas" variant="outlined" type="text" defaultValue={data[0].atsakingo_asmens_kontaktas} /><br />

                            <TextField sx={{ my: 5 }} id="kompiuteriu_kiekis" name="kompiuteriu_kiekis" label="Kompiuterių kiekis" variant="outlined" type="number" defaultValue={data[0].kompiuteriu_kiekis} /><br />

                            <TextField sx={{ my: 5 }} id="energijos_riba_per_zmogu" name="energijos_riba_per_zmogu" label="Energijos riba per žmogų" variant="outlined" type="number" defaultValue={data[0].energijos_riba_per_zmogu} /><br />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                            <TextField sx={{ my: 5 }} InputLabelProps={{ shrink: true }} id="min_energija_ispejimui" name="min_energija_ispejimui" label="Min. energija nuo kurios siųsti įpėjimą" variant="outlined" type="number" defaultValue={data[0].min_energija_ispejimui} /><br />

                            <FormControlLabel control={<Checkbox sx={{ my: 5 }} id="asmeniniai_prietaisai" name="asmeniniai_prietaisai" checked={checked} onChange={handleChange}/>} label="Ar bus asmeninių kompiuterių?"  /><br />
                        </Box>

                        <Button style={{ background: "#1DA1F2", color: "white" }} type="submit">Pateikti</Button>
                    </Box>
                )}
            </Container>
        </div>
    );
}