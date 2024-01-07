import React from 'react';
import '../styles/login.css';

const Usuario = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Usuario</h2>
                    <form action="#" method="post">
                        <label htmlFor="usuario">Nombre Usuario (minimo 8 carácteres):</label>
                        <input type="text" id="usuario" name="usuario" required />
                        <label htmlFor="contrasena">Contraseña (minimo 8 carácteres):</label>
                        <input type="password" id="contrasena" name="contrasena" required />
                        <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
                        <input type="password" id="confirmarContrasena" name="contrasena" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Usuario" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Usuario</h2>
                    <form action="#" method="post">
                        <label htmlFor="usuario">Selecciona el usuario:</label>
                        <select name="selectUsuario" id="selectUsuario">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Usuario" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Usuario;