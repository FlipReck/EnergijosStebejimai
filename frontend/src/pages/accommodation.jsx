import Header from "../components/header";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import accommodationApi from "../Apis/accommodationApi";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

export default function Accommondation() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
      const getData = async () => {
        try {
          const repApi = new accommodationApi();
          const response = await repApi.getAccommendation(id);
          const response1 = await repApi.getAllDevices(id);
          setData(response.data);
          setData1(response1.data);
        } catch (err) {
          console.log(err.response.data.message)
          setData(null);
        }
      };
      getData();
    }, []);

    return (
        <div>
            <Header/>
            <Typography sx={{ borderBottom: "1px solid gray", pb: 1, my: 4, pl:2 }}>
                Patalpa
            </Typography>
            { data === null || data.length === 0 ? (
            <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
            ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
                {console.log(data)}
            <List>
                <ListItem>Pavadinimas</ListItem>
                <ListItem>Atsakingas asmuo</ListItem>
                <ListItem>Atsakingo asmens kontaktas</ListItem>
                <ListItem>Kompiuterių kiekis</ListItem>
                <ListItem>Energijos riba per žmogų</ListItem>
                <ListItem><Button style={{background:"#1DA1F2", color:"white"}} onClick={() => navigate(`/accommodation/update/${id}`)}>
                    Redaguoti
                </Button></ListItem>
                <ListItem><Button style={{background:"#1DA1F2", color:"white"}} onClick={() => navigate(`/accommodation/schedule/${id}`)}>
                    Patalpos tvarkaraštis
                </Button></ListItem>
            </List>
            <List>
                <ListItem>{data[0].pavadinimas}</ListItem>
                <ListItem>{data[0].atsakingo_asmens_vardas} {data[0].atsakingo_asmens_pavarde}</ListItem>
                <ListItem>{data[0].atsakingo_asmens_kontaktas}</ListItem>
                <ListItem>{data[0].kompiuteriu_kiekis}</ListItem>
                <ListItem>{data[0].energijos_riba_per_zmogu}</ListItem>
            </List>
            
            </Box>)}
            <Box sx={{ flexGrow: 1, p: 3 }}>
            { data1 === null || data1.length === 0 ? (
                <Typography sx={{ textAlign: "center" }}>Wow, so empty!</Typography>
            ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    id
                                </TableCell>
                                <TableCell>
                                    prietaiso pavadinimas
                                </TableCell>
                                <TableCell>
                                    IP adresas
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data1.map((row) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    {row.id}
                                    </TableCell>
                                    <TableCell>
                                    {row.name}
                                    </TableCell>
                                    <TableCell>
                                    {row.ip_address}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                </Table>
            )}
            </Box>
            <center>
                <Button style={{background:"#1DA1F2", color:"white"}}>
                    Ištrinti įspėjimą
                </Button>
            </center>
        </div>
    );
  }