import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionConsejo = () => {
    const [nombre, setNombre] = useState('');
    const [origen, setOrigen] = useState('');
    const [miembrosConsejo, setMiembrosConsejo] = useState([]);
    const [miembroSeleccionado, setMiembroSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [origenError, setOrigenError] = useState('');

    const obtenerMiembros = async () => {
        try {
            const response = await fetch('https://localhost:5000/consejo');
            if (response.ok) {
                const data = await response.json();
                setMiembrosConsejo(data);
            } else {
                console.error('Error al obtener la lista de miembros');
            }
        } catch (error) {
            console.error('Error al obtener la lista de miembros:', error);
        }
    };
    useEffect(() => {
        obtenerMiembros();
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

    const handleOrigenChange = (e) => {
        const value = e.target.value;
        setOrigen(value);

        if (value.length < 4) {
            setOrigenError('El origen debe tener al menos 4 caracteres');
        } else {
            setOrigenError('');
        }
    };

    const handleMiembroSeleccionadoChange = (e) => {
        setMiembroSeleccionado(e.target.value);
    };

    const handleCrearMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !origen || nombre.length < 4 || origen.length < 4) {
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
            formData.append('origen', origen);

            const response = await fetch('https://localhost:5000/consejo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setOrigen('');
                toast.success('Miembro creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerMiembros();
            } else {
                toast.error('Error al crear miembro', {
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

    const handleBorrarMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!miembroSeleccionado) {
            toast.info('Por favor, selecciona un miembro para borrar', {
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
            const response = await fetch(`https://localhost:5000/consejo/${miembroSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Miembro borrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerMiembros();
            } else {
                toast.error('Error al borrar el miembro', {
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
                    <h2 className="pb-3">Crear Miembro del Consejo</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearMiembroSubmit}>
                        <label htmlFor="nombre">Nombre del miembro:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}
                        
                        <label htmlFor="origen">Origen del miembro (Profesor, AMPA...):</label>
                        <input type="text" id="origen" name="origen" value={origen} onChange={handleOrigenChange}/>
                        {origenError && <p className="error-message red">{origenError}</p>}
                        
                        <div className="div pt-4">
                            <input type="submit" value="Crear Miembro" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Miembro del Consejo</h2>
                    <form onSubmit={handleBorrarMiembroSubmit}>
                        <label htmlFor="miembro">Seleccionar miembro:</label>
                        <select name="miembro" id="miembro" value={miembroSeleccionado} onChange={handleMiembroSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un miembro</option>
                            {miembrosConsejo.map(miembro => (
                                <option key={miembro.id} value={miembro.id}>
                                    {miembro.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar miembro" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionConsejo;