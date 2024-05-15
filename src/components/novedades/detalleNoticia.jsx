import React, { useState, useEffect } from 'react';

const DetalleNoticia = ({ noticia, onClose }) => {
    const [adjuntos, setAdjuntos] = useState([]);

    useEffect(() => {
        const obtenerAdjuntos = async () => {
            try {
                const response = await fetch(`https://localhost/adjuntos?id_noticia=${noticia.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setAdjuntos(data);
                } else {
                    console.error('Error al obtener los archivos adjuntos');
                }
            } catch (error) {
                console.error('Error al obtener los archivos adjuntos:', error);
            }
        };
        obtenerAdjuntos();
    }, [noticia.id]);

    return (
        <div className="row text-center p-5">
            <div className="col-md-6">
                <img src={`data:image;base64,${noticia.foto}`} className='img-fluid' />
                <p>{noticia.fecha}</p>
            </div>
            <div className="col-md-6">
                <h5 className="color-titulo titulo-despliegue">{noticia.nombre}</h5>
                <div className="pt-3 px-3">{noticia.texto}</div>
                {adjuntos.length > 0 && (
                    <div className='pt-3'>
                        {adjuntos.map(adjunto => (
                            <div key={adjunto.id} className="mb-2">
                                <a
                                    href={`data:application/pdf;base64,${adjunto.archivo}`}
                                    download={adjunto.nombre}
                                    style={{ textDecoration: 'underline', color: 'inherit' }}
                                >
                                    <i className="far fa-file-pdf text-danger"></i> {adjunto.nombre}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
                <button className="btn-vertodas my-5" onClick={onClose}>Volver</button>
            </div>
        </div>
    );
};

export default DetalleNoticia;
