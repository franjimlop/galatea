import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionCalendarios = () => {
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState(null);
    const [calendarios, setCalendarios] = useState([]);
    const [calendarioSeleccionado, setCalendarioSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');

    const obtenerCalendarios = async () => {
        try {
            const response = await fetch('https://51.124.190.137:5000/calendarios');
            if (response.ok) {
                const data = await response.json();
                setCalendarios(data);
            } else {
                console.error('Error al obtener los calendarios');
            }
        } catch (error) {
            console.error('Error al obtener los calendarios:', error);
        }
    };
    useEffect(() => {
        obtenerCalendarios();
    }, []);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        setNombre(value);

        if (value.length < 4) {
            setNombreError('El nombre debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleFotoChange = (e) => {
        const selectedImage = e.target.files[0];

        // Validar tamaño de la imagen
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (selectedImage && selectedImage.size > maxSize) {
            toast.error('La imagen debe pesar menos de 2MB', {
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
            setFoto(selectedImage);
        }
    };

    const handleCalendarioSeleccionadoChange = (e) => {
        setCalendarioSeleccionado(e.target.value);
    };

    const handleCrearCalendarioSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !foto || nombre.length < 4) {
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
            formData.append('foto', foto);

            const response = await fetch('https://51.124.190.137:5000/calendarios', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setFoto(null);
                toast.success('Calendario creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerCalendarios();
            } else {
                toast.error('Error al crear calendario', {
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

    const handleBorrarCalendarioSubmit = async (e) => {
        e.preventDefault();

        if (!calendarioSeleccionado) {
            toast.info('Por favor, selecciona un calendario para borrar', {
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
            const response = await fetch(`https://51.124.190.137:5000/calendarios/${calendarioSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Calendario borrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerCalendarios();
            } else {
                toast.error('Error al borrar calendario', {
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
                    <h2 className="pb-3">Crear Calendario</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearCalendarioSubmit}>
                        <label htmlFor="nombre">Nombre del calendario:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange} />
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="foto">Escoger imagen (Máximo 2MB):</label>
                        <input type="file" id="foto" name="foto" accept="image/*" onChange={handleFotoChange} />

                        <div className="div pt-4">
                            <input type="submit" value="Crear Calendario" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Calendario</h2>
                    <form onSubmit={handleBorrarCalendarioSubmit}>
                        <label htmlFor="calendario">Seleccionar Calendario:</label>
                        <select name="calendario" id="calendario" value={calendarioSeleccionado} onChange={handleCalendarioSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un calendario</option>
                            {calendarios.map(calendario => (
                                <option key={calendario.id} value={calendario.id}>{calendario.nombre}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Calendario" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionCalendarios;