import React from "react";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Grid container sx={{ backgroundColor: "#580000", color: 'white', width: '100%', marginBottom:"5vh" }}>
            <Grid item size={12} sm={6}>
                <Typography variant="h6" component="div" textAlign={"left"} paddingLeft={"2vh"}>
                    Gestión de Pólizas de Seguros
                </Typography>
            </Grid>
            <Grid item size={12}>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item size={2}>
                            <Typography variant="body1" component={Link} to="/polizas" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                                Ver pólizas
                            </Typography>
                        </Grid>
                        <Grid item size={2}>
                            <Typography variant="body1" component={Link} to="/crearPolizas" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                                Crear pólizas
                            </Typography>
                        </Grid>
                        <Grid item size={2}>
                            <Typography variant="body1" component={Link} to="/editarPolizas" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                                Editar pólizas
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}