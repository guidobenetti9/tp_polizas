import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CardActions } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate()

    useEffect(() => {
        setUser({ username: "", password: "" });
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login",
                {},
                {
                    headers: {
                        username: user.username,
                        password: user.password,
                    },
                }
            );
            console.log(response.data)
            localStorage.setItem("token", response.data.token);
            toast.success("login exitoso!");
            navigate("/polizas")

        } catch {
            toast.error("usuario incorrecto!");
            setUser({
                username: "",
                password: "",
            });
        }

    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Grid container spacing={1} direction={'column'} alignItems="center" marginTop={"5vh"}>
                <Grid item size={12} sx={{ justifyItems: "center" }}>
                    <Card sx={{ padding: 3, margin:3, background: "#DE7C7D" }}>
                        <CardContent >
                            <Typography variant="h6" sx={{ padding: 3, textAlign:"center"}} gutterBottom>
                             Iniciar Sesión
                            </Typography>

                            <TextField
                            fullWidth
                            label="Usuario"
                            variant='filled'
                            sx={{background: "#e8e8e8"}}
                            value={user.username}
                            
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                variant='filled'
                                sx={{background: "#e8e8e8"}}
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                sx={{ background: "#D0E8C5", color: "black" }}
                                fullWidth
                                type='submit'
                                variant="contained"
                                color="primary"
                            onClick={handleSubmit}
                            >
                                Ingresar
                            </Button>

                        </CardActions>
                    </Card>
            </Grid>
            </Grid>
        </>
    );
};