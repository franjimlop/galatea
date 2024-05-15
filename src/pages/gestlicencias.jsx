import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionLicencias = () => {
    const [texto, setTexto] = useState('');
    const [licencias, setLicencias] = useState([]);
    const [licenciaSeleccionada, setLicenciaSeleccionada] = useState('');

    const [textoError, setTextoError] = useState('');

    const obtenerLicencias = async () => {
        try {
            const response = await fetch('https://localhost:5000/licencias');
            if (response.ok) {
                const data = await response.json();
                setLicencias(data);
            } else {
                console.error('Error al obtener la info de licencias');
            }
        } catch (error) {
            console.error('Error al obtener la info de licencias:', error);
        }
    };
    useEffect(() => {
        obtenerLicencias();
    }, []);

    const handleTextoChange = (e) => {
        const value = e.target.value;
        setTexto(value);

        if (value.length < 4) {
            setTextoError('El texto debe tener al menos 4 caracteres');
        } else {
            setTextoError('');
        }
    };

    const handleLicenciaSeleccionadaChange = (e) => {
        setLicenciaSeleccionada(e.target.value);
    };

    const handleCrearLicenciaSubmit = async (e) => {
        e.preventDefault();

        if (!texto || texto.length < 4) {
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
        formData.append('texto', texto);

        try {
            const response = await fetch('https://localhost:5000/licencias', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTexto('');
                toast.success('Información sobre licencias creadas exitosamente', {
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
                toast.error('Error al crear información sobre licencias', {
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

    const handleBorrarLicenciaSubmit = async (e) => {
        e.preventDefault();

        if (!licenciaSeleccionada) {
            toast.info('Por favor, selecciona un párrafo para borrar', {
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
            const response = await fetch(`https://localhost:5000/licencias/${licenciaSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Párrafo borrado exitosamente', {
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
                toast.error('Error al borrar el párrafo', {
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
                    <h2 className="pb-3">Información licencias</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearLicenciaSubmit}>
                        <label htmlFor="texto">Introduzca el texto:</label>
                        <textarea id="texto" name="texto" value={texto} onChange={handleTextoChange} style={{ height: '20vh', width: '100%', resize: 'none' }} />
                        {textoError && <p className="error-message red">{textoError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Información licencias" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Información licencia</h2>
                    <form onSubmit={handleBorrarLicenciaSubmit}>
                        <label htmlFor="licencia">Seleccionar párrafo:</label>
                        <select name="licencia" id="licencia" value={licenciaSeleccionada} onChange={handleLicenciaSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona un párrafo</option>
                            {licencias.map(licencia => (
                                <option key={licencia.id} value={licencia.id}>{licencia.texto}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Párrafo" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionLicencias;