import React from 'react';

const Extraescolares = () => {
    return (
        <div className="fondo">
            <div className="container text-center">
                <h2 className="py-5 color-titulo">Actividades extraescolares</h2>
                <div className="row pb-3">
                    {/* 4 cards en una línea, por debajo de lg de 2 en 2 */}
                    <div className="col-xl-3 col-md-6 py-3">
                        <div className="card h-100">
                            <img className="card-img-top custom-image" src={process.env.PUBLIC_URL + '/images/libros.jpg'} alt="Adjudicadas becas libros curso 2023 / 2024" />
                            <div className="card-body">
                                <h5 className="card-title custom-card-title">Adjudicadas becas libros curso 2023 / 2024</h5>
                                <p className="card-text pt-0 pt-md-3">Adjudicadas ya las becas definitivas para los libros de texto de todos los cursos de la ESO para el próximo curso</p>
                            </div>
                            <div className="card-button">
                                <p className="card-date">16/10/2023</p>
                                <button className="btn-vermas">Ver Más</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 py-3">
                        <div className="card h-100">
                            <img className="card-img-top custom-image" src={process.env.PUBLIC_URL + '/images/instituto.jpeg'} alt="Matrícula curso 2023 / 2024" />
                            <div className="card-body">
                                <h5 className="card-title custom-card-title">Matrícula curso 2023 / 2024</h5>
                                <p className="card-text pt-0 pt-lg-3">Abierto el periodo de matriculación para los alumnos de la ESO</p>
                            </div>
                            <div className="card-button">
                                <p className="card-date">15/10/2023</p>
                                <button className="btn-vermas">Ver Más</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 py-3">
                        <div className="card h-100">
                            <img className="card-img-top custom-image" src={process.env.PUBLIC_URL + '/images/libros.jpg'} alt="Adjudicadas becas libros curso 2023 / 2024" />
                            <div className="card-body">
                                <h5 className="card-title custom-card-title">Adjudicadas becas libros curso 2023 / 2024</h5>
                                <p className="card-text pt-0 pt-md-3">Adjudicadas ya las becas definitivas para los libros de texto de todos los cursos de la ESO para el próximo curso</p>
                            </div>
                            <div className="card-button">
                                <p className="card-date">16/10/2023</p>
                                <button className="btn-vermas">Ver Más</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 py-3">
                        <div className="card h-100">
                            <img className="card-img-top custom-image" src={process.env.PUBLIC_URL + '/images/instituto.jpeg'} alt="Matrícula curso 2023 / 2024" />
                            <div className="card-body">
                                <h5 className="card-title custom-card-title">Matrícula curso 2023 / 2024</h5>
                                <p className="card-text pt-0 pt-lg-3">Abierto el periodo de matriculación para los alumnos de la ESO</p>
                            </div>
                            <div className="card-button">
                                <p className="card-date">15/10/2023</p>
                                <button className="btn-vermas">Ver Más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extraescolares;