import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importación de componentes de páginas
import Centro from './pages/centro';
import ConsejoEscolar from './pages/consejo';
import Galatea from './pages/galatea';
import Documentos from './pages/documentos';
import Becas from './pages/becas';
import LicenciasDigitales from './pages/licencias';
import Matriculas from './pages/matriculas';
import LenguaExtranjera from './pages/lenguaextranjera';
import CientificoMatematico from './pages/cientificomate';
import Sociolinguistico from './pages/sociolinguistico';
import MusicaEducacionFisica from './pages/musicaeduca';
import PlasticaTecnologia from './pages/plasticatecno';
import Orientacion from './pages/orientacion';
import Religion from './pages/religion';
import Economia from './pages/economia';
import Noticias from './pages/noticias';
import Proyectos from './pages/proyectos';
import Calendarios from './pages/calendario';
import ActividadesComplementarias from './pages/complementarias';
import ActividadesExtraescolares from './pages/extraescolares';
import Contacto from './pages/contacto';
import Login from './pages/login';

// Importación de componentes
import Carousel from './components/carousel/carousel';
import Novedades from './components/novedades/novedades';
import BotonTodasNoticias from './components/novedades/botonTodasNoticias';
import ActividadesTodas from './components/novedades/actividadesTodas';

const RoutesComponent = () => {
  return [
    <Route key="redirect" path="/" element={<Navigate replace to="/home" />} />,
    <Route key="home" path="/home" element={<><Carousel/><Novedades/><BotonTodasNoticias/><ActividadesTodas /></>} />,
    <Route key="nuestro-centro" path="/nuestro-centro" element={<Centro />} />,
    <Route key="consejo-escolar" path="/consejo-escolar" element={<ConsejoEscolar />} />,
    <Route key="galatea" path="/galatea" element={<Galatea />} />,
    <Route key="documentos" path="/documentos" element={<Documentos />} />,
    <Route key="becas" path="/becas" element={<Becas />} />,
    <Route key="licencias-digitales" path="/licencias-digitales" element={<LicenciasDigitales />} />,
    <Route key="matriculas" path="/matriculas" element={<Matriculas />} />,
    <Route key="lengua-extranjera" path="/lengua-extranjera" element={<LenguaExtranjera />} />,
    <Route key="cientifico-matematico" path="/cientifico-matematico" element={<CientificoMatematico />} />,
    <Route key="sociolinguistico" path="/sociolinguistico" element={<Sociolinguistico />} />,
    <Route key="musica-educacionfisica" path="/musica-educacionfisica" element={<MusicaEducacionFisica />} />,
    <Route key="plastica-tecnologia" path="/plastica-tecnologia" element={<PlasticaTecnologia />} />,
    <Route key="orientacion" path="/orientacion" element={<Orientacion />} />,
    <Route key="religion" path="/religion" element={<Religion />} />,
    <Route key="economia" path="/economia" element={<Economia />} />,
    <Route key="noticias" path="/noticias" element={<Noticias />} />,
    <Route key="proyectos" path="/proyectos" element={<Proyectos />} />,
    <Route key="calendarios" path="/calendarios" element={<Calendarios />} />,
    <Route key="actividades-complementarias" path="/actividades-complementarias" element={<ActividadesComplementarias />} />,
    <Route key="actividades-extraescolares" path="/actividades-extraescolares" element={<ActividadesExtraescolares />} />,
    <Route key="contacto" path="/contacto" element={<Contacto />} />,
    <Route key="login" path="/login" element={<Login />} />,
  ];
};

export default RoutesComponent;