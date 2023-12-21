import React from 'react';
import '../styles/documentos.css';

const Becas = () => {
    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Becas</h1>
                <ul className="documentos-ul ms-3 mb-5">
                    <li className="documentos-li"><a href="https://www.educa.jccm.es/alumnado/es/servicios-educativos/materiales-curriculares/convocatoria-ayudas-materiales-curriculares/convocatoria-ayudas-comedores-escolares-libros-texto-curso-2">Ayuda de libros 2023/2024</a></li>
                    <li className="documentos-li"><a href="https://www.educacionyfp.gob.es/servicios-al-ciudadano/catalogo/general/05/050140/ficha/050140-2023.html">Ayudas para alumnos con necesidad específica de apoyo educativo 2023/2024</a></li>
                    <li className="documentos-li"><a href="https://www.becaseducacion.gob.es/portada.html">Becas Educación 2023/2024</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Becas;