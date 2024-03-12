import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuario = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [contrasenaError, setContrasenaError] = useState('');
    const [confirmarContrasenaError, setConfirmarContrasenaError] = useState('');

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:5000/usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            } else {
                console.error('Error al obtener la lista de usuarios');
            }
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleNombreUsuarioChange = (e) => {
        const value = e.target.value;
        setNombreUsuario(value);

        // Restricciones de longitud para el nombre de usuario
        if (value.length < 6) {
            setNombreError('El nombre de usuario debe tener al menos 6 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleContrasenaChange = (e) => {
        const value = e.target.value;
        setContrasena(value);
        // Restablecer error de confirmación si cambia la contraseña
        if (confirmarContrasena && value !== confirmarContrasena) {
            setConfirmarContrasenaError('Las contraseñas no coinciden');
        } else {
            setConfirmarContrasenaError('');
        }
        // Restricciones de longitud para la contraseña
        if (value.length < 8) {
            setContrasenaError('La contraseña debe tener al menos 8 caracteres');
        } else {
            setContrasenaError('');
        }
    };

    const handleConfirmarContrasenaChange = (e) => {
        const value = e.target.value;
        setConfirmarContrasena(value);
        // Verificar coincidencia al cambiar la confirmación
        if (contrasena !== value) {
            setConfirmarContrasenaError('Las contraseñas no coinciden');
        } else {
            setConfirmarContrasenaError('');
        }
    };

    const handleUsuarioSeleccionadoChange = (e) => {
        setUsuarioSeleccionado(e.target.value);
    };

    const handleCrearUsuarioSubmit = async (e) => {
        e.preventDefault();

        if (!nombreUsuario || !contrasena || !confirmarContrasena || nombreUsuario.length < 6 || contrasena.length < 8 || contrasena !== confirmarContrasena) {
            toast.info('Por favor, completa todos los campos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombreUsuario,
                    password: contrasena,
                }),
            });

            if (response.ok) {
                setNombreUsuario('');
                setContrasena('');
                setConfirmarContrasena('');
                toast.success('Usuario creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerUsuarios();
            } else {
                toast.error('Error al crear usuario', {
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
        }
    };

    const handleBorrarUsuarioSubmit = async (e) => {
        e.preventDefault();

        // Verificar si se ha seleccionado un usuario
        if (!usuarioSeleccionado) {
            toast.info('Por favor selecciona un usuario para poder borrarlo', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/usuarios/${usuarioSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Usuario borrado con éxito', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerUsuarios();
            } else {
                toast.error('Fallo al borrar el usuario', {
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
            console.error('Error al enviar solicitud de borrado al backend:', error);
        }
    };

    return (
        <div>
            <ToastContainer/>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Usuario</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearUsuarioSubmit}>
                        <label htmlFor="usuario">Nombre Usuario (mínimo 6 caracteres):</label>
                        <input type="text" id="usuario" name="usuario" value={nombreUsuario} onChange={handleNombreUsuarioChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="contrasena">Contraseña (mínimo 8 caracteres):</label>
                        <input type="password" id="contrasena" name="contrasena" value={contrasena} onChange={handleContrasenaChange}/>
                        {contrasenaError && <p className="error-message red">{contrasenaError}</p>}

                        <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
                        <input type="password" id="confirmarContrasena" name="confirmarContrasena" value={confirmarContrasena} onChange={handleConfirmarContrasenaChange}/>
                        {confirmarContrasenaError && <p className="error-message red">{confirmarContrasenaError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Usuario" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Usuario</h2>
                    <form action="#" method="post" onSubmit={handleBorrarUsuarioSubmit}>
                        <label htmlFor="selectUsuario">Selecciona el usuario:</label>
                        <select name="selectUsuario" id="selectUsuario" value={usuarioSeleccionado} onChange={handleUsuarioSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nombre}
                                </option>
                            ))}
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