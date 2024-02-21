import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const Instalaciones = () => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);
    const [instalaciones, setInstalaciones] = useState([]);
    const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('');

    useEffect(() => {
        const obtenerInstalaciones = async () => {
            try {
                const response = await fetch('http://localhost:5000/instalaciones');
                if (response.ok) {
                    const data = await response.json();
                    setInstalaciones(data);
                } else {
                    console.error('Error al obtener la lista de instalaciones');
                }
            } catch (error) {
                console.error('Error al obtener la lista de instalaciones:', error);
            }
        };

        obtenerInstalaciones();
    }, []);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleImagenChange = (e) => {
        const selectedImage = e.target.files[0];

        // Validar tamaño de la imagen
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (selectedImage && selectedImage.size > maxSize) {
            alert('La imagen seleccionada supera el tamaño máximo de 2MB');
            e.target.value = null; // Limpiar el input de archivo
        } else {
            setImagen(selectedImage);
        }
    };

    const handleInstalacionSeleccionadaChange = (e) => {
        setInstalacionSeleccionada(e.target.value);
    };

    const handleCrearInstalacionSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !imagen) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('imagen', imagen);

            const response = await fetch('http://localhost:5000/instalaciones', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Instalación creada exitosamente');
                setNombre('');
                setImagen(null);
                window.location.reload();
            } else {
                alert('Error al crear instalación');
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    const handleBorrarInstalacionSubmit = async (e) => {
        e.preventDefault();

        if (!instalacionSeleccionada) {
            alert('Por favor, selecciona una instalación para borrar');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/instalaciones/${instalacionSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Instalación borrada exitosamente');
                window.location.reload();
            } else {
                const data = await response.json();
                alert(`Error al borrar instalación: ${data.error}`);
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
                    <h2 className="pb-3">Crear Instalación</h2>
                    <form
                        action="#"
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={handleCrearInstalacionSubmit}
                    >
                        <label htmlFor="nombre">Nombre de la instalación:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            required
                        />
                        <label htmlFor="imagen">
                            Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):
                        </label>
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            onChange={handleImagenChange}
                            required
                        />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Instalación" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Instalación</h2>
                    <form action="#" method="post" onSubmit={handleBorrarInstalacionSubmit}>
                        <label htmlFor="instalacion">Seleccionar instalación:</label>
                        <select
                            name="instalacion"
                            id="instalacion"
                            value={instalacionSeleccionada}
                            onChange={handleInstalacionSeleccionadaChange}
                        >
                            <option value="">Selecciona una instalación</option>
                            {instalaciones.map((instalacion) => (
                                <option key={instalacion.id} value={instalacion.id}>
                                    {instalacion.nombre}
                                </option>
                            ))}
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