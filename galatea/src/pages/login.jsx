import React from 'react';
import '../styles/login.css';

const Login = () => {
    return (
        <div className="py-5">
            <div className="login-container">
                <h2 className="pb-3">Iniciar Sesión</h2>
                <form action="#" method="post">
                    <label htmlFor="usuario">Usuario:</label>
                    <input type="text" id="usuario" name="usuario" required />
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required />
                    <div className="div pt-4">
                        <input type="submit" value="Iniciar Sesión" />
                    </div>
                </form>
            </div>
            <div className="div pt-4">
                <a href="index.html">
                    <button className="btn-vermas">Volver</button>
                </a>
            </div>
        </div>
    );
};

export default Login;