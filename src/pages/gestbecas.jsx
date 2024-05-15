import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionBecas = () => {
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const [becas, setBecas] = useState([]);
    const [becaSeleccionada, setBecaSeleccionada] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [enlaceError, setEnlaceError] = useState('');

    const obtenerBecas = async () => {
        try {
            const response = await fetch('https://51.124.190.137:5000/becas');
            if (response.ok) {
                const data = await response.json();
                setBecas(data);
            } else {
                console.error('Error al obtener la lista de becas');
            }
        } catch (error) {
            console.error('Error al obtener la lista de becas:', error);
        }
    };
    useEffect(() => {
        obtenerBecas();
    }, []);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        setNombre(value);

        if (value.length < 4) {
            setNombreError('El nombre de la beca debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleEnlaceChange = (e) => {
        const value = e.target.value;
        setEnlace(value);

        if (value.length < 4) {
            setNombreError('El link debe tener al menos 6 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleBecaSeleccionadaChange = (e) => {
        setBecaSeleccionada(e.target.value);
    };

    const handleCrearBecaSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !enlace || nombre.length < 4 || enlace.length < 6) {
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

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('enlace', enlace);

        try {
            const response = await fetch('https://51.124.190.137:5000/becas', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setEnlace('');
                toast.success('Información beca creada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerBecas();
            } else {
                toast.error('Error al subir información beca', {
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

    const handleBorrarBecaSubmit = async (e) => {
        e.preventDefault();

        if (!becaSeleccionada) {
            toast.info('Por favor, selecciona una beca para borrar', {
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
            const response = await fetch(`https://51.124.190.137:5000/becas/${becaSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Beca borrada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerBecas();
            } else {
                toast.error('Fallo al borrar la beca', {
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
                    <h2 className="pb-3">Crear Beca</h2>
                    <form onSubmit={handleCrearBecaSubmit}>
                        <label htmlFor="nombre">Nombre de la beca:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="enlace">Enlace a la información de la beca:</label>
                        <input type="text" id="enlace" name="enlace" value={enlace} onChange={handleEnlaceChange}/>
                        {enlaceError && <p className="error-message red">{enlaceError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Beca" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Beca</h2>
                    <form onSubmit={handleBorrarBecaSubmit}>
                        <label htmlFor="beca">Seleccionar beca:</label>
                        <select name="beca" id="beca" value={becaSeleccionada} onChange={handleBecaSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona una beca</option>
                            {becas.map(beca => (
                                <option key={beca.id} value={beca.id}>{beca.nombre}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Beca" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionBecas;