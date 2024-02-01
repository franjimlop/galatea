import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const Usuario = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');

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
    }, []); // Se ejecuta solo una vez al cargar el componente

    const handleNombreUsuarioChange = (e) => {
        setNombreUsuario(e.target.value);
    };

    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
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
                // Actualizar la lista de usuarios después de crear uno nuevo
                // Puedes realizar alguna acción adicional si es necesario
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
                // Actualizar la lista de usuarios después de borrar uno
                // Puedes realizar alguna acción adicional si es necesario
            } else {
                alert('Error al borrar usuario');
            }
        } catch (error) {
            console.error('Error al enviar solicitud de borrado al backend:', error);
        }
    };

    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Usuario</h2>
                    <form action="#" method="post" onSubmit={handleCrearUsuarioSubmit}>
                        <label htmlFor="usuario">Nombre Usuario (mínimo 8 caracteres):</label>
                        <input type="text" id="usuario" name="usuario" value={nombreUsuario} onChange={handleNombreUsuarioChange} required />

                        <label htmlFor="contrasena">Contraseña (mínimo 8 caracteres):</label>
                        <input type="password" id="contrasena" name="contrasena" value={contrasena} onChange={handleContrasenaChange} required />

                        <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
                        <input type="password" id="confirmarContrasena" name="contrasena" value={confirmarContrasena} onChange={handleConfirmarContrasenaChange} required />

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