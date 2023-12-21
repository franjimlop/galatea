import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Carousel from './components/carousel/carousel';
import Novedades from './components/novedades/novedades';
import BotonTodasNoticias from './components/novedades/botonTodasNoticias';

// Importa los componentes de las páginas
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

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<><Carousel /><Novedades /><BotonTodasNoticias /></>} />
      <Route path="/nuestro-centro" element={<Centro />} />
      <Route path="/consejo-escolar" element={<ConsejoEscolar />} />
      <Route path="/galatea" element={<Galatea />} />
      <Route path="/documentos" element={<Documentos />} />
      <Route path="/becas" element={<Becas />} />
      <Route path="/licencias-digitales" element={<LicenciasDigitales />} />
      <Route path="/matriculas" element={<Matriculas />} />
      <Route path="/lengua-extranjera" element={<LenguaExtranjera />} />
      <Route path="/cientifico-matematico" element={<CientificoMatematico />} />
      <Route path="/sociolinguistico" element={<Sociolinguistico />} />
      <Route path="/musica-educacionfisica" element={<MusicaEducacionFisica />} />
      <Route path="/plastica-tecnologia" element={<PlasticaTecnologia />} />
      <Route path="/orientacion" element={<Orientacion />} />
      <Route path="/religion" element={<Religion />} />
      <Route path="/economia" element={<Economia />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/calendarios" element={<Calendarios />} />
      <Route path="/actividades-complementarias" element={<ActividadesComplementarias />} />
      <Route path="/actividades-extraescolares" element={<ActividadesExtraescolares />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComponent;