import React from 'react';
import { Link } from 'react-router-dom';

const BotonTodasActividades = () => {
    return (
        <div className="fondo d-flex align-items-center justify-content-center">
            <Link to="/ac" className="btn-vertodas text-center mb-5">
                Ver todas las noticias
            </Link>
        </div>
    );
};

export default BotonTodasActividades;