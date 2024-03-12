import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnlacesDepartamentos = () => {
    const [departamento, setDepartamento] = useState('');
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const [enlaces, setEnlaces] = useState([]);
    const [enlaceSeleccionado, setEnlaceSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [enlaceError, setEnlaceError] = useState('');

    const obtenerEnlaces = async () => {
        try {
            const response = await fetch('http://localhost:5000/enlaces');
            if (response.ok) {
                const data = await response.json();
                setEnlaces(data);
            } else {
                console.error('Error al obtener la lista de enlaces');
            }
        } catch (error) {
            console.error('Error al obtener la lista de enlaces:', error);
        }
    };
    useEffect(() => {
        obtenerEnlaces();
    }, []);

    const handleDepartamentoChange = (e) => setDepartamento(e.target.value);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        setNombre(value);

        if (value.length < 4) {
            setNombreError('El nombre del enlace debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleEnlaceChange = (e) => {
        const value = e.target.value;
        setEnlace(value);

        if (value.length < 6) {
            setEnlaceError('El enlace debe tener al menos 6 caracteres');
        } else {
            setEnlaceError('');
        }
    };

    const handleEnlaceSeleccionadoChange = (e) => {
        setEnlaceSeleccionado(e.target.value);
    };

    const handleCrearEnlaceSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !departamento || !enlace || nombre.length < 4 || enlace.length < 6) {
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
        formData.append('departamento', departamento);
        formData.append('nombre', nombre);
        formData.append('enlace', enlace);

        try {
            const response = await fetch('http://localhost:5000/enlaces', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setDepartamento('');
                setNombre('');
                setEnlace('');
                toast.success('Enlace creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerEnlaces();
            } else {
                toast.error('Error al crear enlace', {
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

    const handleBorrarEnlaceSubmit = async (e) => {
        e.preventDefault();

        if (!enlaceSeleccionado) {
            toast.info('Por favor, selecciona un enlace para borrar', {
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
            const response = await fetch(`http://localhost:5000/enlaces/${enlaceSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Enlace borrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerEnlaces();
            } else {
                toast.error('Fallo al borrar enlace', {
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
            <ToastContainer />
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Enlaces departamentos</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearEnlaceSubmit}>
                        <label htmlFor="departamento">Seleccionar departamento:</label>
                        <select name="departamento" id="departamento" value={departamento} onChange={handleDepartamentoChange}>
                            <option value="" disabled hidden>Selecciona un departamento</option>
                            <option value="extranjera">Departamento de Lenguas Extranjeras</option>
                            <option value="mate">Departamento Científico-Matemático</option>
                            <option value="lengua">Departamento Sociolingüístico</option>
                            <option value="musica">Departamento de Música y Educación Física</option>
                            <option value="plastica">Departamento de Plástica y Tecnología</option>
                            <option value="orientacion">Departamento de Orientación</option>
                            <option value="religion">Departamento de Religión</option>
                            <option value="economia">Departamento de Economía</option>
                        </select>

                        <label htmlFor="nombre">Nombre del enlace:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="enlace">Enlace:</label>
                        <input type="text" id="enlace" name="enlace" value={enlace} onChange={handleEnlaceChange}/>
                        {enlaceError && <p className="error-message red">{enlaceError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Enlace" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Enlace</h2>
                    <form onSubmit={handleBorrarEnlaceSubmit}>
                        <label htmlFor="enlace">Seleccionar Enlace:</label>
                        <select name="enlace" id="enlace" value={enlaceSeleccionado} onChange={handleEnlaceSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un enlace</option>
                            {enlaces.map(enlace => (
                                <option key={enlace.id} value={enlace.id}>{enlace.nombre}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Enlace" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnlacesDepartamentos;