import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start pt-5">
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-4 mx-auto mb-4">
                        {/* Enlaces */}
                        <h5 className="text-uppercase fw-bold mb-4">Enlaces de interés</h5>
                        <p><a href="https://www.educa.jccm.es/es" className="text-reset">Portal de educación CLM</a></p>
                        <p><a href="https://educamosclm.castillalamancha.es/" className="text-reset">EducamosCLM</a></p>
                        <p><a href="https://www.educacionyfp.gob.es/portada.html" className="text-reset">Educación</a></p>
                    </div>
                    {/* Información de contacto */}
                    <div className="col-lg-4 mx-auto mb-4">
                        <h5 className="text-uppercase fw-bold mb-4">Contacto</h5>
                        <p><i className="fas fa-home"></i> Av Rio Tajo, 2E, 45220 Yeles, Toledo</p>
                        <p><i className="fas fa-envelope"></i> 45014368.ieso@edu.jccm.es</p>
                        <p><i className="fas fa-phone"></i> 630 53 70 26 / 616 89 39 82</p>
                        <h5 className="text-uppercase fw-bold my-4">Redes Sociales</h5>
                        <a href="https://www.instagram.com/ieso_la_galatea/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                            className="text-reset">
                            <p><i className="fa-brands fa-instagram"></i> ieso_la_galatea</p>
                        </a>
                        <a href="https://www.facebook.com/p/IES-YELES-100070083335995" className="text-reset">
                            <p><i className="fa-brands fa-facebook"></i> IES YELES</p>
                        </a>
                    </div>
                    {/* Google Maps */}
                    <div className="col-lg-4 mx-auto mb-4">
                        <h5 className="text-uppercase fw-bold mb-4">Mapa del centro</h5>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7256.013592775873!2d-3.8071389473301656!3d40.124952597004096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41f7046560a06d%3A0x6a6f6ffe169dad0f!2sInstituto%20de%20educaci%C3%B3n%20secundaria%20obligatoria%20la%20galatea!5e0!3m2!1ses!2ses"
                            width="auto" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                <p>© {new Date().getFullYear()} Copyright: <span className="fw-bold">IES La Galatea</span></p>
            </div>
        </footer>
    );
};

export default Footer;