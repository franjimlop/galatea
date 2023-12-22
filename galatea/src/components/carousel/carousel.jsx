import React from 'react';

const Carousel = () => {
    return (
        <div className="text-center fondo">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={process.env.PUBLIC_URL + '/images/instituto.jpeg'} className="img-fluid img-instalaciones" alt="Instalaciones IESO La Galatea" />
                        <div className="carousel-caption">
                            <h1>¡Bienvenidos al IESO La Galatea!</h1>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={process.env.PUBLIC_URL + '/images/musica.jpg'} className="img-fluid img-instalaciones" alt="Instalaciones IESO La Galatea" />
                    </div>
                    {/* Agrega más elementos carousel-item con el mismo texto si es necesario */}
                </div>
                <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </a>
                <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </a>
            </div>
        </div>
    );
};

export default Carousel;