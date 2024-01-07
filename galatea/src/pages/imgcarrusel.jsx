import React from 'react';
import '../styles/login.css';

const Usuario = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Imagen</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombreImg">Nombre de la imagen:</label>
                        <input type="text" id="nombreImg" name="nombreImg" required />
                        <label htmlFor="usuario">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" required />
                        <div className="div pt-4">
                            <input type="submit" value="Subir Imagen" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Imagen</h2>
                    <form action="#" method="post">
                        <label htmlFor="usuario">Selecciona la foto:</label>
                        <select name="selectUsuario" id="selectUsuario">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Imagen" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Usuario;