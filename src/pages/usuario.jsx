import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const Usuario = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
    const [nombreError, setNombreError] = useState('');
    const [contrasenaError, setContrasenaError] = useState('');

    useEffect(() => {
        // Lógica para obtener la lista de usuarios (puedes hacer una solicitud al backend aquí)
        // Ejemplo ficticio:
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

        // Restricciones de longitud para la contraseña
        if (value.length < 8) {
            setContrasenaError('La contraseña debe tener al menos 8 caracteres');
        } else {
            setContrasenaError('');
        }
    };

    const handleConfirmarContrasenaChange = (e) => {
        setConfirmarContrasena(e.target.value);
    };

    const handleUsuarioSeleccionadoChange = (e) => {
        setUsuarioSeleccionado(e.target.value);
    };

    const handleCrearUsuarioSubmit = async (e) => {
        e.preventDefault();

        if (contrasena !== confirmarContrasena) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Restricciones de longitud para el nombre de usuario y la contraseña
        if (nombreUsuario.length < 6) {
            alert('El nombre de usuario debe tener al menos 6 caracteres');
            return;
        }

        if (contrasena.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
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
                alert('Usuario creado exitosamente');

                // Borrar los campos después de crear un usuario
                setNombreUsuario('');
                setContrasena('');
                setConfirmarContrasena('');
                window.location.reload();
            } else {
                alert('Error al crear usuario');
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    const handleBorrarUsuarioSubmit = async (e) => {
        e.preventDefault();

        // Verificar si se ha seleccionado un usuario
        if (!usuarioSeleccionado) {
            alert('Por favor, selecciona un usuario para borrar');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/usuarios/${usuarioSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuario borrado exitosamente');
                window.location.reload();
            } else {
                const data = await response.json();
                alert(`Error al borrar usuario: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al enviar solicitud de borrado al backend:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Usuario</h2>
                    <form action="#" method="post" onSubmit={handleCrearUsuarioSubmit}>
                        <label htmlFor="usuario">Nombre Usuario (mínimo 6 caracteres):</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={nombreUsuario}
                            onChange={handleNombreUsuarioChange}
                            required
                        />
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="contrasena">Contraseña (mínimo 8 caracteres):</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            required
                        />
                        {contrasenaError && <p className="error-message red">{contrasenaError}</p>}

                        <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            id="confirmarContrasena"
                            name="confirmarContrasena"
                            value={confirmarContrasena}
                            onChange={handleConfirmarContrasenaChange}
                            required
                        />

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
                        <select
                            name="selectUsuario"
                            id="selectUsuario"
                            value={usuarioSeleccionado}
                            onChange={handleUsuarioSeleccionadoChange}
                        >
                            <option value="">Selecciona un usuario</option>
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