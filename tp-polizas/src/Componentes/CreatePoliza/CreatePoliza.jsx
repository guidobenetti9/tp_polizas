import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid2';

export default function CreatePoliza() {
    const [poliza, setPoliza] = useState({
        id: 0,
        nombreAsesor: "",
        matricula: "",
        objetoAsegurado: "",
        tipoCambio: "",
        fechaVencimiento: "",
        deBaja: true,
        clienteId: 0,
        tipoSeguroId: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/polizas", poliza, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success("Póliza creada exitosamente!");
        } catch (error) {
            toast.error("Error al crear la póliza!");
        } finally {
            setLoading(false);
        }
    };//si el toasty crea la poliza deshabilito el btn

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Card sx={{background: "#DE7C7D"}} >
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Crear Póliza
                    </Typography>
                    <Grid container spacing={3} alignItems="center" >
                        <Grid item size={6}>
                            <TextField
                                label="Nombre del Asesor"
                                fullWidth
                                value={poliza.nombreAsesor}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, nombreAsesor: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Matrícula"
                                fullWidth
                                value={poliza.matricula}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, matricula: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Objeto Asegurado"
                                fullWidth
                                value={poliza.objetoAsegurado}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, objetoAsegurado: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Tipo de Cambio"
                                fullWidth
                                value={poliza.tipoCambio}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, tipoCambio: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Fecha de Vencimiento"
                                type="datetime-local"
                                fullWidth
                                value={poliza.fechaVencimiento}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                slotProps={{
                                    inputLabel: { shrink: true }
                                }}
                                onChange={(e) => setPoliza({ ...poliza, fechaVencimiento: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Cliente ID"
                                type="number"
                                fullWidth
                                value={poliza.clienteId}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, clienteId: e.target.value })}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <TextField
                                label="Tipo de Seguro ID"
                                type="number"
                                fullWidth
                                value={poliza.tipoSeguroId}
                                sx={{background: "#e8e8e8", borderRadius:"4px" , '& .MuiInputLabel-root': { color: 'black', background:"#e8e8e8", borderRadius:"4px" } }}
                                onChange={(e) => setPoliza({ ...poliza, tipoSeguroId: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Grid item size={6}>
                        <Button variant="contained" 
                        color="primary" 
                        fullWidth 
                        onClick={handleSubmit}
                        disabled={loading}>
                            {loading ? "Creando" : "Crear poliza"}
                        </Button>
                    </Grid>

                </CardActions>

            </Card>


        </Container>
    );
}