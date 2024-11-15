import Grid from '@mui/material/Grid2'
import './App.css'
import Header from './Componentes/UI/Header'
import Footer from './Componentes/UI/Footer'
import ListarPolizas from './Componentes/ListarPolizas/ListarPolizas'
import Login from './Componentes/IniciarSession/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearPoliza from './Componentes/CreatePoliza/CreatePoliza'
import EditarPoliza from './Componentes/EditPoliza/Edit'

function App() {

  return (
    <Router>
      <Grid container className="App">

        <Header />
        <Grid item size={12} className="MainContent">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/polizas' element={<ListarPolizas />} />
            <Route path='/crearPolizas' element={<CrearPoliza />} />
            <Route path='/editarPolizas' element={<EditarPoliza />} />

          </Routes>
        </Grid>
        <Footer />

      </Grid>




    </Router>

  )
}

export default App
