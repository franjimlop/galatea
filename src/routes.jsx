import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes de las páginas
import Usuario from './pages/usuario';
import ImagenesCarrusel from './pages/imgcarrusel';
import Centro from './pages/centro';
import EquipoDirectivo from './pages/equipodirectivo';
import Instalaciones from './pages/instalaciones';
import ConsejoEscolar from './pages/consejo';
import GestionConsejo from './pages/gestconsejo';
import Galatea from './pages/galatea';
import Documentos from './pages/documentos';
import GestionDocumentos from './pages/gestdocumentos';
import Becas from './pages/becas';
import GestionBecas from './pages/gestbecas';
import LicenciasDigitales from './pages/licencias';
import GestionLicencias from './pages/gestlicencias';
import Matriculas from './pages/matriculas';
import GestionMatriculas from './pages/gestmatriculas';
import LenguaExtranjera from './pages/lenguaextranjera';
import CientificoMatematico from './pages/cientificomate';
import Sociolinguistico from './pages/sociolinguistico';
import MusicaEducacionFisica from './pages/musicaeduca';
import PlasticaTecnologia from './pages/plasticatecno';
import Orientacion from './pages/orientacion';
import Religion from './pages/religion';
import Economia from './pages/economia';
import Enlaces from './pages/gestenlaces';
import Noticias from './pages/noticias';
import GestionNoticias from './pages/gestnoticia';
import Proyectos from './pages/proyectos';
import GestionProyectos from './pages/gestproyecto';
import Calendarios from './pages/calendario';
import GestionCalendarios from './pages/gestcalendario';
import ActividadesComplementarias from './pages/complementarias';
import ActividadesExtraescolares from './pages/extraescolares';
import Actividades from './pages/actividades';
import Contacto from './pages/contacto';
import Login from './pages/login';
import Carousel from './components/carousel/carousel';
import Novedades from './components/novedades/novedades';
import BotonTodasNoticias from './components/novedades/botonTodasNoticias';
import ActividadesTodas from './components/novedades/actividadesTodas';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<><Carousel /><Novedades /><BotonTodasNoticias /><ActividadesTodas/></>} />
      <Route path="/imagenes-carrusel" element={<ImagenesCarrusel/>} />
      <Route path="/usuario" element={<Usuario/>} />
      <Route path="/nuestro-centro" element={<Centro />} />
      <Route path="/equipo-directivo" element={<EquipoDirectivo/>} />
      <Route path="/instalaciones" element={<Instalaciones/>} />
      <Route path="/consejo-escolar" element={<ConsejoEscolar />} />
      <Route path="/gestion-consejo" element={<GestionConsejo/>} />
      <Route path="/galatea" element={<Galatea />} />
      <Route path="/documentos" element={<Documentos />} />
      <Route path="/gestion-documentos" element={<GestionDocumentos/>} />
      <Route path="/becas" element={<Becas />} />
      <Route path="/gestion-becas" element={<GestionBecas/>} />
      <Route path="/licencias-digitales" element={<LicenciasDigitales />} />
      <Route path="/gestion-licencias-digitales" element={<GestionLicencias/>} />
      <Route path="/matriculas" element={<Matriculas />} />
      <Route path="/gestion-matriculas" element={<GestionMatriculas/>} />
      <Route path="/lengua-extranjera" element={<LenguaExtranjera />} />
      <Route path="/cientifico-matematico" element={<CientificoMatematico />} />
      <Route path="/sociolinguistico" element={<Sociolinguistico />} />
      <Route path="/musica-educacionfisica" element={<MusicaEducacionFisica />} />
      <Route path="/plastica-tecnologia" element={<PlasticaTecnologia />} />
      <Route path="/orientacion" element={<Orientacion />} />
      <Route path="/religion" element={<Religion />} />
      <Route path="/economia" element={<Economia />} />
      <Route path="/enlaces-departamentos" element={<Enlaces/>} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/gestion-noticias" element={<GestionNoticias/>} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/gestion-proyectos" element={<GestionProyectos/>} />
      <Route path="/calendarios" element={<Calendarios />} />
      <Route path="/gestion-calendarios" element={<GestionCalendarios/>} />
      <Route path="/actividades-complementarias" element={<ActividadesComplementarias />} />
      <Route path="/actividades-extraescolares" element={<ActividadesExtraescolares />} />
      <Route path="/gestion-actividades" element={<Actividades/>} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComponent;