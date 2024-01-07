import React from 'react';
import { Link } from 'react-router-dom';

const Headerlogin = () => {
    return (
        <div className="navega">
            <div className="container">
                <nav className="navbar navbar-expand-xl navbar-light align-content-center">
                    <div className="container-fluid align-content-center">
                        <Link to="/home" className="navbar-brand">
                            <img src={process.env.PUBLIC_URL + '/images/LA_GALATEA_sin_fondo.png'} className="foto-logo" alt="Logo" />
                        </Link>
                        <button
                            className="navbar-toggler centrar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="custom-toggler-icon">☰</span>
                        </button>
                        <div className="collapse navbar-collapse letra-menu" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item px-2">
                                    <Link to="/home" className="nav-link efecto-menu">
                                        Inicio
                                    </Link>
                                </li>
                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Inicio
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/home" className="dropdown-item">
                                                Inicio
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/usuario" className="dropdown-item">
                                                Gestión Usuarios
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/imagenes-carrusel" className="dropdown-item">
                                                Imágenes Carrusel
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Centro
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/nuestro-centro" className="dropdown-item">
                                                Nuestro Centro
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/equipo-directivo" className="dropdown-item">
                                                Gestión Equipo Directivo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/instalaciones" className="dropdown-item">
                                                Gestión Instalaciones
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/consejo-escolar" className="dropdown-item">
                                                Consejo Escolar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-consejo" className="dropdown-item">
                                                Gestión Consejo Escolar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/galatea" className="dropdown-item">
                                                Galatea
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" href="#" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Secretaría
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/documentos" className="dropdown-item">
                                                Documentos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-documentos" className="dropdown-item">
                                                Gestión Documentos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/becas" className="dropdown-item">
                                                Becas
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-becas" className="dropdown-item">
                                                Gestión Becas
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/licencias-digitales" className="dropdown-item">
                                                Licencias Digitales
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-licencias-digitales" className="dropdown-item">
                                                Gestión Licencias Digitales
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/matriculas" className="dropdown-item">
                                                Matrículas
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-matriculas" className="dropdown-item">
                                                Gestión Matrículas
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" href="#" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Departamentos
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/lengua-extranjera" className="dropdown-item">
                                                Departamento de Lenguas Extranjeras
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cientifico-matematico" className="dropdown-item">
                                                Departamento Científico-Matemático
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/sociolinguistico" className="dropdown-item">
                                                Departamento Sociolingüístico
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/musica-educacionfisica" className="dropdown-item">
                                                Departamento de Música y Educación Física
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/plastica-tecnologia" className="dropdown-item">
                                                Departamento de Plástica y Tecnología
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/orientacion" className="dropdown-item">
                                                Departamento de Orientación
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/religion" className="dropdown-item">
                                                Departamento de Religión
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/economia" className="dropdown-item">
                                                Departamento de Economía
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/enlaces-departamentos" className="dropdown-item">
                                                Gestión de enlaces
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" href="#" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Curso Actual
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/noticias" className="dropdown-item">
                                                Noticias
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-noticias" className="dropdown-item">
                                                Gestión de Noticias
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/proyectos" className="dropdown-item">
                                                Proyectos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-proyectos" className="dropdown-item">
                                                Gestión de Proyectos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/calendarios" className="dropdown-item">
                                                Calendarios
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-calendarios" className="dropdown-item">
                                                Gestión de Calendarios
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown px-2">
                                    <a class="nav-link dropdown-toggle efecto-menu" href="#" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Actividades
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li>
                                            <Link to="/actividades-complementarias" className="dropdown-item">
                                                Actividades Complementarias
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/actividades-extraescolares" className="dropdown-item">
                                                Actividades Extraescolares
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/gestion-actividades" className="dropdown-item">
                                                Gestión de Actividades
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item px-2">
                                    <Link to="/contacto" className="nav-link efecto-menu">
                                        Contacto
                                    </Link>
                                </li>

                                <div className="row justify-content-center align-content-center">
                                    <div className="col-auto">
                                        <li className="nav-item px-2">
                                            <Link to="/home" className="nav-link">
                                                <i className="fa-solid fa-sign-out"></i>
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Headerlogin;