import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionMatriculas = () => {
    const [texto, setTexto] = useState('');
    const [matriculas, setMatriculas] = useState([]);
    const [matriculaSeleccionada, setMatriculaSeleccionada] = useState('');

    const [textoError, setTextoError] = useState('');

    const obtenerMatriculas = async () => {
        try {
            const response = await fetch('http://localhost:5000/matriculas');
            if (response.ok) {
                const data = await response.json();
                setMatriculas(data);
            } else {
                console.error('Error al obtener la info de licencias');
            }
        } catch (error) {
            console.error('Error al obtener la info de licencias:', error);
        }
    };
    useEffect(() => {
        obtenerMatriculas();
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

    const handleMatriculaSeleccionadaChange = (e) => {
        setMatriculaSeleccionada(e.target.value);
    };

    const handleCrearMatriculaSubmit = async (e) => {
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
            const response = await fetch('http://localhost:5000/matriculas', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTexto('');
                toast.success('Información sobre matrículas creadas exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerMatriculas();
            } else {
                oast.error('Error al crear información sobre matrículas', {
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

    const handleBorrarMatriculaSubmit = async (e) => {
        e.preventDefault();

        if (!matriculaSeleccionada) {
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
            const response = await fetch(`http://localhost:5000/matriculas/${matriculaSeleccionada}`, {
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
                obtenerMatriculas();
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
                    <h2 className="pb-3">Información matrículas</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearMatriculaSubmit}>
                        <label htmlFor="texto">Introduzca el texto:</label>
                        <textarea id="texto" name="texto" value={texto} onChange={handleTextoChange} style={{ height: '20vh', width: '100%', resize: 'none' }} />
                        {textoError && <p className="error-message red">{textoError}</p>}

                        <div className="div pt-4">
                            <input type="submit" value="Crear Información sobre matrículas" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Información matrícula</h2>
                    <form onSubmit={handleBorrarMatriculaSubmit}>
                        <label htmlFor="matricula">Seleccionar párrafo:</label>
                        <select name="matricula" id="matricula" value={matriculaSeleccionada} onChange={handleMatriculaSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona un párrafo</option>
                            {matriculas.map(matricula => (
                                <option key={matricula.id} value={matricula.id}>{matricula.texto}</option>
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

export default GestionMatriculas;