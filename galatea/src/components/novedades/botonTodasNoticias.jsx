import React from 'react';
import { Link } from 'react-router-dom';

const BotonTodasNoticias = () => {
    return (
        <div className="fondo d-flex align-items-center justify-content-center">
            <Link to="/noticias" className="btn-vertodas text-center mb-5">
                Ver todas las noticias
            </Link>
        </div>
    );
};

export default BotonTodasNoticias;