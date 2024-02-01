import React from 'react';
import '../styles/documentos.css';

const Documentos = () => {
    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Documentos</h1>
                <ul className="ms-3 mb-5 documentos-ul">
                    <li className="documentos-li">
                        <a href="images/pdf_ejemplo.pdf" download>PGA</a>
                    </li>
                    <li className="documentos-li">
                        <a href="images/pdf_ejemplo.pdf" download>Plan Digital del Centro</a>
                    </li>
                    <li className="documentos-li">
                        <a href="images/pdf_ejemplo.pdf" download>Plan de inclusión y convivencia</a>
                    </li>
                    <li className="documentos-li">
                        <a href="images/pdf_ejemplo.pdf" download>Normas de convivencia</a>
                    </li>
                    <li className="documentos-li">
                        <a href="images/pdf_ejemplo.pdf" download>Memoria</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Documentos;