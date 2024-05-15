import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Instalaciones = () => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);
    const [instalaciones, setInstalaciones] = useState([]);
    const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('');

    const [nombreError, setNombreError] = useState('');

    const obtenerInstalaciones = async () => {
        try {
            const response = await fetch('https://localhost:5000/instalaciones');
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
    useEffect(() => {
        obtenerInstalaciones();
    }, []);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        setNombre(value);

        if (value.length < 4) {
            setNombreError('El nombre de la imagen debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleImagenChange = (e) => {
        const selectedImage = e.target.files[0];

        // Validar tamaño de la imagen
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (selectedImage && selectedImage.size > maxSize) {
            toast.error('La imagen seleccionada supera el tamaño máximo de 2MB', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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

        if (!nombre || !imagen || nombre.length < 4) {
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
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('imagen', imagen);

            const response = await fetch('https://localhost:5000/instalaciones', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setImagen(null);
                toast.success('Instalación creada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerInstalaciones();
            } else {
                toast.error('Error al crear instalación', {
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

    const handleBorrarInstalacionSubmit = async (e) => {
        e.preventDefault();

        if (!instalacionSeleccionada) {
            toast.info('Por favor, selecciona una instalación para borrar', {
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
            const response = await fetch(`https://localhost:5000/instalaciones/${instalacionSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Instalación borrada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerImagenes();
            } else {
                toast.error('Fallo al borrar la instalación', {
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
                    <h2 className="pb-3">Crear Instalación</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearInstalacionSubmit}>
                        <label htmlFor="nombre">Nombre de la instalación:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}
                        
                        <label htmlFor="imagen">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImagenChange}/>
                        
                        <div className="div pt-4">
                            <input type="submit" value="Crear Instalación" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Instalación</h2>
                    <form onSubmit={handleBorrarInstalacionSubmit}>
                        <label htmlFor="instalacion">Seleccionar instalación:</label>
                        <select name="instalacion" id="instalacion" value={instalacionSeleccionada} onChange={handleInstalacionSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona una instalación</option>
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