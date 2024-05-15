import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionProyectos = () => {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

    const [tituloError, setTituloError] = useState('');
    const [textoError, setTextoError] = useState('');

    const obtenerProyectos = async () => {
        try {
            const response = await fetch('https://localhost:5000/proyectos');
            if (response.ok) {
                const data = await response.json();
                setProyectos(data);
            } else {
                console.error('Error al obtener los proyectos');
            }
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    };
    useEffect(() => {
        obtenerProyectos();
    }, []);

    const handleTituloChange = (e) => {
        const value = e.target.value;
        setTitulo(value);

        if (value.length < 4) {
            setTituloError('El título debe tener al menos 4 caracteres');
        } else {
            setTituloError('');
        }
    };

    const handleTextoChange = (e) => {
        const value = e.target.value;
        setTexto(value);

        if (value.length < 4) {
            setTextoError('El texto debe tener al menos 8 caracteres');
        } else {
            setTextoError('');
        }
    };

    const handleProyectoSeleccionadoChange = (e) => {
        setProyectoSeleccionado(e.target.value);
    };

    const handleCrearProyectoSubmit = async (e) => {
        e.preventDefault();

        if (!titulo || !texto || titulo.length < 4 || texto.length < 8) {
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
        formData.append('titulo', titulo);
        formData.append('texto', texto);

        try {
            const response = await fetch('https://localhost:5000/proyectos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTitulo('');
                setTexto('');
                toast.success('Proyecto creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerProyectos();
            } else {
                toast.error('Error al crear proyecto', {
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

    const handleBorrarProyectoSubmit = async (e) => {
        e.preventDefault();

        if (!proyectoSeleccionado) {
            toast.info('Por favor, selecciona un proyecto', {
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
            const response = await fetch(`https://localhost:5000/proyectos/${proyectoSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Proyecto borrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerLicencias();
            } else {
                toast.error('Error al borrar proyecto', {
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
                    <h2 className="pb-3">Agregar Proyecto</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearProyectoSubmit}>
                        <label htmlFor="titulo">Título del proyecto:</label>
                        <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleTituloChange} />
                        {tituloError && <p className="error-message red">{tituloError}</p>}

                        <label htmlFor="texto">Texto del proyecto:</label>
                        <textarea type="text" id="texto" name="texto" value={texto} onChange={handleTextoChange} style={{ height: '20vh', width: '100%', resize: 'none' }}/>
                        {textoError && <p className="error-message red">{textoError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Proyecto" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Proyecto</h2>
                    <form onSubmit={handleBorrarProyectoSubmit}>
                        <label htmlFor="proyecto">Seleccionar Proyecto:</label>
                        <select name="proyecto" id="proyecto" value={proyectoSeleccionado} onChange={handleProyectoSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un proyecto</option>
                            {proyectos.map(proyecto => (
                                <option key={proyecto.id} value={proyecto.id}>{proyecto.titulo}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Proyecto" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionProyectos;