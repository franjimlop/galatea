import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const GestionConsejo = () => {
    const [nombre, setNombre] = useState('');
    const [origen, setOrigen] = useState('');
    const [miembrosConsejo, setMiembrosConsejo] = useState([]);
    const [miembroSeleccionado, setMiembroSeleccionado] = useState('');

    useEffect(() => {
        const obtenerMiembros = async () => {
            try {
                const response = await fetch('http://localhost:5000/consejo');
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

        obtenerMiembros();
    }, []);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleOrigenChange = (e) => {
        setOrigen(e.target.value);
    };

    const handleMiembroSeleccionadoChange = (e) => {
        setMiembroSeleccionado(e.target.value);
    };

    const handleCrearMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !origen) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('origen', origen);

            const response = await fetch('http://localhost:5000/consejo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Miembro creado exitosamente');
                setNombre('');
                setOrigen('');
                window.location.reload();
            } else {
                alert('Error al crear miembro');
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    const handleBorrarMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!miembroSeleccionado) {
            alert('Por favor, selecciona un miembro para borrar');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/consejo/${miembroSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('IMiembro borrado exitosamente');
                window.location.reload();
            } else {
                const data = await response.json();
                alert(`Error al borrar miembro: ${data.error}`);
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
                    <h2 className="pb-3">Crear Miembro del Consejo</h2>
                    <form action="#" method="post" onSubmit={handleCrearMiembroSubmit}>
                        <label htmlFor="nombre">Nombre del miembro:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            required
                        />
                        <label htmlFor="origen">Origen del miembro (Profesor, AMPA...):</label>
                        <input
                            type="text"
                            id="origen"
                            name="origen"
                            value={origen}
                            onChange={handleOrigenChange}
                            required
                        />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Miembro" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Miembro del Consejo</h2>
                    <form action="#" method="post" onSubmit={handleBorrarMiembroSubmit}>
                        <label htmlFor="miembro">Seleccionar miembro:</label>
                        <select
                            name="miembro"
                            id="miembro"
                            value={miembroSeleccionado}
                            onChange={handleMiembroSeleccionadoChange}
                        >
                            <option value="">Selecciona un miembro</option>
                            {/* Mapear los miembros del Consejo desde el estado local */}
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