import React from 'react';
import '../styles/login.css';

const Instalaciones = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Instalación</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombre">Nombre de la instalación:</label>
                        <input type="text" id="nombre" name="nombre" required/>
                        <label htmlFor="usuario">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Instalación" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Instalación</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Seleccionar instalación:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Instalación" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Instalaciones;