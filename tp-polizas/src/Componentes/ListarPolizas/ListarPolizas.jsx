import { Typography } from "@mui/material";
import useFetch from "../CustomHook/useFetch";
import React from 'react'; import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button ,Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListarPolizas() {
    const { data, loading } = useFetch("http://localhost:8080/polizas")
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/polizas/${selectedId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Póliza eliminada exitosamente!");
            navigate(0); // Recarga la página para actualizar la lista de pólizas
        } catch (error) {
            toast.error("Error al eliminar la póliza!");
        }
        handleClose();
    };


    useEffect(() => { 
        if (loading) { toast.info("Cargando datos...", 
            { autoClose: false, toastId: 'loadingToast' }); } 
            else { toast.dismiss('loadingToast'); } 
        }, [loading]);

        return (
            <>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <TableContainer component={Paper}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Pólizas
                    </Typography>
                    <Table sx={{alignItems:"center", background:"#DE7C7D"}}>
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{fontWeight: "bold"}}>Id</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Nombre de Asesor</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Matrícula</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Objeto Asegurado</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Tipo de Cambio</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Fecha de Vencimiento</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>De Baja</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Cliente ID</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Tipo de Seguro ID</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.slice(0, 10).map((dato) => (
                                <TableRow key={dato.id}>
                                    <TableCell>{dato.id}</TableCell>
                                    <TableCell>{dato.nombreAsesor}</TableCell>
                                    <TableCell>{dato.matricula}</TableCell>
                                    <TableCell>{dato.objetoAsegurado}</TableCell>
                                    <TableCell>{dato.tipoCambio}</TableCell>
                                    <TableCell>{new Date(dato.fechaVencimiento).toLocaleDateString()}</TableCell>
                                    <TableCell>{dato.deBaja ? "Sí" : "No"}</TableCell>
                                    <TableCell>{dato.clienteId}</TableCell>
                                    <TableCell>{dato.tipoSeguroId}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleClickOpen(dato.id)}
                                            sx={{ ml: 2 }}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Estás seguro de que deseas eliminar esta póliza?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDelete} color="secondary" autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
}