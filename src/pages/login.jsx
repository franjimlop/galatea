import React from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';

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
                        <Link to="/homeUsuario">
                            <input type="submit" value="Iniciar Sesión" />
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;