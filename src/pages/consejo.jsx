import React, { useState, useEffect } from 'react';
import '../styles/consejo.css';

const Consejo = () => {
    const [miembrosConsejo, setMiembrosConsejo] = useState([]);

    useEffect(() => {
        // Obtener los miembros del Consejo desde el backend
        fetch('http://localhost:5000/consejo')
            .then(response => response.json())
            .then(data => setMiembrosConsejo(data))
            .catch(error => console.error('Error al obtener miembros del Consejo:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Consejo Escolar</h1>
                <p className="texto-consejo">
                    <span className="negrita-texto">La función principal de un Consejo Escolar es proporcionar un espacio para que los diferentes miembros de la comunidad educativa (padres, madres, profesores, estudiantes, personal no docente y a veces otros miembros de la comunidad) participen en la toma de decisiones y en la formulación de políticas escolares. En el Consejo Escolar generalmente se encargan de cuestiones como:</span><br /><br />

                    <span className="negrita-texto">- Fomentar la democracia y la transparencia:</span> El Consejo Escolar promueve la democracia en el ámbito educativo al permitir que los diferentes miembros de la comunidad escolar participen en la toma de decisiones. Además, ayuda a mantener la transparencia en la gestión de la institución educativa, ya que las decisiones y políticas se discuten y acuerdan de manera colaborativa.<br /><br />
                    <span className="negrita-texto">- Representación de diversos puntos de vista:</span> El Consejo Escolar reúne a diversas partes interesadas, lo que garantiza que se tengan en cuenta una variedad de perspectivas y preocupaciones al tomar decisiones que afectan a la comunidad educativa en su conjunto.<br /><br />
                    <span className="negrita-texto">- Impulso de la calidad educativa:</span> A través de su participación en la elaboración y revisión del Proyecto Educativo del Centro (PEC), el Consejo Escolar contribuye al mejoramiento de la calidad de la educación al establecer metas y estrategias para el centro educativo.<br /><br />
                    <span className="negrita-texto">- Promoción de un entorno de aprendizaje favorable:</span> La colaboración en la definición de normas de convivencia y disciplina escolar ayuda a mantener un entorno de aprendizaje seguro y respetuoso, lo que beneficia a todos los miembros de la comunidad educativa.<br /><br />
                    <span className="negrita-texto">- Uso responsable de los recursos:</span> Al participar en la gestión de los recursos económicos asignados al centro, el Consejo Escolar contribuye a garantizar que los recursos se utilicen de manera eficiente y en beneficio de los estudiantes y la comunidad escolar en general.<br /><br />
                    <span className="negrita-texto">- Atención a las necesidades y desafíos locales:</span> El Consejo Escolar permite que la comunidad educativa aborde de manera efectiva los desafíos y las necesidades específicas de la institución y su entorno, adaptando las políticas y decisiones a la realidad local.<br /><br />
                    <span className="negrita-texto">El Consejo Escolar está formado actualmente por:</span><br /><br />
                </p>

                {/* Lista de miembros del Consejo basada en el estado */}
                <ul className="consejo-ul">
                    {miembrosConsejo.map((miembro) => (
                        <li key={miembro.id} className="consejo-li">{miembro.nombre}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Consejo;