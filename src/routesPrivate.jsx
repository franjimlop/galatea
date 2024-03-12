import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Importa los componentes de las páginas
import Usuario from './pages/usuario';
import ImagenesCarrusel from './pages/imgcarrusel';
import EquipoDirectivo from './pages/equipodirectivo';
import Instalaciones from './pages/instalaciones';
import GestionConsejo from './pages/gestconsejo';
import GestionDocumentos from './pages/gestdocumentos';
import GestionBecas from './pages/gestbecas';
import GestionLicencias from './pages/gestlicencias';
import GestionMatriculas from './pages/gestmatriculas';
import Enlaces from './pages/gestenlaces';
import GestionNoticias from './pages/gestnoticia';
import GestionProyectos from './pages/gestproyecto';
import GestionCalendarios from './pages/gestcalendario';
import Actividades from './pages/actividades';

// Modificado para devolver un array de elementos <Route>
const RoutesComponentPrivate = () => {
    return [
        <Route key="imagenes-carrusel" path="/imagenes-carrusel" element={<ImagenesCarrusel />} />,
        <Route key="usuario" path="/usuario" element={<Usuario />} />,
        <Route key="equipo-directivo" path="/equipo-directivo" element={<EquipoDirectivo />} />,
        <Route key="instalaciones" path="/instalaciones" element={<Instalaciones />} />,
        <Route key="gestion-consejo" path="/gestion-consejo" element={<GestionConsejo />} />,
        <Route key="gestion-documentos" path="/gestion-documentos" element={<GestionDocumentos />} />,
        <Route key="gestion-becas" path="/gestion-becas" element={<GestionBecas />} />,
        <Route key="gestion-licencias-digitales" path="/gestion-licencias-digitales" element={<GestionLicencias />} />,
        <Route key="gestion-matriculas" path="/gestion-matriculas" element={<GestionMatriculas />} />,
        <Route key="enlaces-departamentos" path="/enlaces-departamentos" element={<Enlaces />} />,
        <Route key="gestion-noticias" path="/gestion-noticias" element={<GestionNoticias />} />,
        <Route key="gestion-proyectos" path="/gestion-proyectos" element={<GestionProyectos />} />,
        <Route key="gestion-calendarios" path="/gestion-calendarios" element={<GestionCalendarios />} />,
        <Route key="gestion-actividades" path="/gestion-actividades" element={<Actividades />} />,
    ];
};

export default RoutesComponentPrivate;