import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambio de useHistory a useNavigate
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(''); 

    // Obtener la función de navegación
    const navigate = useNavigate(); // Cambio de useHistory a useNavigate

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contrasena }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;

                // Guardar el token en el almacenamiento local
                localStorage.setItem('token', token);

                // Redirigir a la página "/home"
                toast.success('Sesión iniciada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/home');
                window.location.reload();
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                toast.error('Error al iniciar sesión', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="py-5">
        <ToastContainer />
            <div className="login-container">
                <h2 className="pb-3">Iniciar Sesión</h2>
                <form action="#" method="post" onSubmit={handleLoginSubmit}>
                    <label htmlFor="usuario">Usuario:</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                    <div className="div pt-4">
                        <input type="submit" value="Iniciar Sesión" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;