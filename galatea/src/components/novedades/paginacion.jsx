import React from 'react';
import '../../styles/noticias.css';

const Paginacion = () => {
    return (
        <nav className="fondo">
            <ul className="pagination justify-content-center mb-0 pb-3">
                <li className="page-item disabled">
                    <a href="#" className="page-link">
                        Anterior
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link active-paginacion">
                        1
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link estilo-letra-paginacion">
                        2
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link estilo-letra-paginacion">
                        3
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link estilo-letra-paginacion">
                        4
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link estilo-letra-paginacion">
                        5
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link estilo-letra-paginacion">
                        Siguiente
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginacion;