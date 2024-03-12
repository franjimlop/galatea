import React from 'react';
import '../styles/contacto.css';

const Contacto = () => {
    return (
        <div className="fondo">
            <div className="container text-center">
                <div className="row pt-5 pb-md-5">
                    <div className="col-md-6">
                        <h1 className="nombre-contacto py-3">Horario</h1>
                        <table className="texto-horario"> 
                            <tbody>
                                <tr>
                                    <td className="py-2">1ª Hora</td>
                                    <td className="py-2">08:30 - 09:25</td>
                                </tr>
                                <tr>
                                    <td className="py-2">2ª Hora</td>
                                    <td className="py-2">09:25 - 10:20</td>
                                </tr>
                                <tr>
                                    <td className="py-2">3ª Hora</td>
                                    <td className="py-2">10:20 - 11:15</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Recreo</td>
                                    <td className="py-2">11:15 - 11:45</td>
                                </tr>
                                <tr>
                                    <td className="py-2">4ª Hora</td>
                                    <td className="py-2">11:45 - 12:40</td>
                                </tr>
                                <tr>
                                    <td className="py-2">5ª Hora</td>
                                    <td className="py-2">12:40 - 13:35</td>
                                </tr>
                                <tr>
                                    <td className="py-2">6ª Hora</td>
                                    <td className="py-2">13:35 - 14:30</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h1 className="nombre-contacto py-3">Contacto</h1>
                        <p className="texto-contacto"><i className="fas fa-envelope"></i> 45014368.ieso@edu.jccm.es</p>
                        <p className="texto-contacto"><i className="fas fa-phone"></i> 630 53 70 26 / 616 89 39 82</p>
                        <h1 className="nombre-contacto py-3">Redes Sociales</h1>
                        <a href="https://www.instagram.com/ieso_la_galatea/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                            className="texto-contacto">
                            <p><i className="fa-brands fa-instagram"></i> ieso_la_galatea</p>
                        </a>
                        <a href="https://www.facebook.com/p/IES-YELES-100070083335995" className="texto-contacto">
                            <p><i className="fa-brands fa-facebook"></i> IES YELES</p>
                        </a>
                    </div>
                </div>

                <h1 className="nombre-contacto py-3">Dirección</h1>
                <p className="texto-contacto">Avenida Rio Tajo, 2E, 45220 Yeles, Toledo</p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7256.013592775873!2d-3.8071389473301656!3d40.124952597004096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41f7046560a06d%3A0x6a6f6ffe169dad0f!2sInstituto%20de%20educaci%C3%B3n%20secundaria%20obligatoria%20la%20galatea!5e0!3m2!1ses!2ses"
                    width="90%" height="500px" style={{ border: '0' }} allowFullScreen="" loading="lazy" className="mb-5"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
};

export default Contacto;