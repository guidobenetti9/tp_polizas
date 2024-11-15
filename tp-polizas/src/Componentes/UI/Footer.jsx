import React from "react";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function Footer() {
    return (
        <Grid container sx={{ backgroundColor: '#580000', color: 'white', padding: '16px', width: '100%', marginTop:'5vh'}}>
            <Grid item size={12}> 
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}> 
                    &copy; 2024 Mi Sitio Web. Todos los derechos reservados. 
                </Typography> 
            </Grid>
        </Grid>
    );
}