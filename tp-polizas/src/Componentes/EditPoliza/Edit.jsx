import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid2';

export default function EditPoliza() {
    const [id, setId] = useState('');
    const [showList, setShowList] = useState(false);
    const [polizas, setPolizas] = useState([]);

    const [poliza, setPoliza] = useState({
        id: "",
        nombreAsesor: "",
        matricula: "",
        objetoAsegurado: "",
        tipoCambio: "",
        fechaVencimiento: "",
        deBaja: true,
        clienteId: 0,
        tipoSeguroId: 0
    });

    const findPoliza = async () => {
        if (!id) {
            toast.error("Por favor, ingresa un ID de póliza");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/polizas/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            setPoliza(response.data);
        } catch (error) {
            toast.error("Error al cargar la póliza!");
            console.error(error);
        }
    };

    const findAllPolizas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/polizas", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            setPolizas(response.data);
        } catch (error) {
            toast.error("Error al cargar las pólizas!");
            console.error(error);
        }
    };

    const handleToggle = () => {
        setShowList(!showList);
        if (!showList) {
            findAllPolizas();
        }
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/polizas/${id}`, poliza, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Póliza actualizada exitosamente!");
        } catch (error) {
            toast.error("Error al actualizar la póliza!");
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <Container sx={{background: "#DE7C7D"}} >
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Typography variant="h4" align="center" gutterBottom>
                Editar Póliza
            </Typography>
            <Grid container spacing={3} width={"100%"} sx={{ borderRadius: "5px", justifyContent: 'flex-end' }}>
                <Grid item size={3}>
                    <Card sx={{ padding: 3, margin: 3, background: "#e8e8e8" }}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom>
                                Busca tu poliza!
                            </Typography>
                            <TextField
                                label="ID de la Póliza"
                                fullWidth
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />

                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={findPoliza} sx={{ mt: 2 }}>
                                Cargar Póliza
                            </Button>
                        </CardActions>

                    </Card>


                </Grid>
                <Grid container>
                    <Card sx={{ padding: 5, margin: 3, background: "#e8e8e8" }}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom>
                                Actualizar polizas
                            </Typography>
                            <Grid item size={12}>
                                <TextField
                                    label="Nombre del Asesor"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.nombreAsesor}
                                    onChange={(e) => setPoliza({ ...poliza, nombreAsesor: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} md={6}>
                                <TextField
                                    label="Matrícula"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.matricula}
                                    onChange={(e) => setPoliza({ ...poliza, matricula: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} md={6}>
                                <TextField
                                    label="Objeto Asegurado"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.objetoAsegurado}
                                    onChange={(e) => setPoliza({ ...poliza, objetoAsegurado: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} md={6}>
                                <TextField
                                    label="Tipo de Cambio"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.tipoCambio}
                                    onChange={(e) => setPoliza({ ...poliza, tipoCambio: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} >
                                <TextField
                                    label="Fecha de Vencimiento"
                                    type="datetime-local"
                                    fullWidth
                                    variant="standard"
                                    slotProps={{
                                        inputLabel: {shrink:true}
                                    }}
                                    value={poliza.fechaVencimiento ? new Date(poliza.fechaVencimiento).toISOString().slice(0, -8) : ''}
                                    onChange={(e) => setPoliza({ ...poliza, fechaVencimiento: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} md={6}>
                                <TextField
                                    label="Cliente ID"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.clienteId}
                                    onChange={(e) => setPoliza({ ...poliza, clienteId: e.target.value })}
                                />
                            </Grid>
                            <Grid item size={12} md={6}>
                                <TextField
                                    label="Tipo de Seguro ID"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={poliza.tipoSeguroId}
                                    onChange={(e) => setPoliza({ ...poliza, tipoSeguroId: e.target.value })}
                                />
                            </Grid>

                        </CardContent>
                        <CardActions>
                            <Grid item xs={12}>
                                <Button variant="contained" 
                                color="primary"
                                fullWidth 
                                disabled={loading}
                                onClick={handleSubmit}>
                                    {loading ? "Actualizando" : "Actualizar poliza"}
                                </Button>
                            </Grid>
                        </CardActions>

                    </Card>

                </Grid>
                <Grid container>
                    <Grid item size={12}>
                        <Card sx={{ padding: 3, margin: 3, background: "#e8e8e8" }}>
                            <CardContent>
                                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                                <Typography variant="h4" align="center" gutterBottom>
                                    Listar Pólizas
                                </Typography>
                                <Button variant="contained" color="primary" onClick={handleToggle} sx={{ marginBottom: 2 }}>
                                    {showList ? 'Ocultar Pólizas' : 'Mostrar Pólizas'}
                                </Button>
                                {showList && (
                                    <List>
                                        {polizas.map((poliza) => (
                                            <ListItem key={poliza.id} sx={{ borderBottom: '1px solid #ccc' }}>
                                                <ListItemText
                                                    primary={`ID:${poliza.id}`}
                                                    secondary={<> {`Nombre del Asesor: ${poliza.nombreAsesor}`}<br /> {`Matrícula: ${poliza.matricula}`} </>}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}

                            </CardContent>
                        </Card>



                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}