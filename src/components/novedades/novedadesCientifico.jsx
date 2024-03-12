import React, { useState, useEffect } from 'react';

const NovedadesCientifico = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                const response = await fetch('http://localhost:5000/noticias');
                if (response.ok) {
                    const data = await response.json();
                    setNoticias(data);
                } else {
                    console.error('Error al obtener noticias');
                }
            } catch (error) {
                console.error('Error al obtener noticias:', error);
            }
        };
        obtenerNoticias();
    }, []);

    return (
        <div className="fondo">
            <div className="container text-center">
                <h2 className="py-5 color-titulo">Noticias</h2>
                <div className="row pb-3">
                    {/* 4 cards en una línea, por debajo de lg de 2 en 2 */}
                    {noticias
                        .filter(noticia => noticia.categoria === 'mate') // Filtrar por categoría
                        .sort((a, b) => b.id - a.id) // Ordenar las noticias por ID de forma descendente
                        .map((noticia) => (
                            <div className="col-xl-3 col-md-6 py-3" key={noticia.id}>
                                <div className="card h-100">
                                    <img className="card-img-top custom-image" src={`data:image;base64,${noticia.foto}`} alt="Imagen de noticia" />
                                    <div className="card-body">
                                        <h5 className="card-title custom-card-title">{noticia.nombre}</h5>
                                        <p className="card-text pt-0 pt-md-3">{noticia.texto}</p>
                                    </div>
                                    <div className="card-button">
                                        <p className="card-date">{noticia.fecha}</p>
                                        <button className="btn-vermas">Ver Más</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default NovedadesCientifico;