import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const EquipoDirectivo = () => {
    const [directivo, setDirectivo] = useState('');
    const [puesto, setPuesto] = useState('');
    const [imagen, setImagen] = useState(null);
    const [miembros, setMiembros] = useState([]);
    const [miembroSeleccionado, setMiembroSeleccionado] = useState('');

    useEffect(() => {
        // Lógica para obtener la lista de miembros del equipo directivo desde el servidor
        const obtenerMiembros = async () => {
            try {
                const response = await fetch('http://localhost:5000/equipodirectivo');
                if (response.ok) {
                    const data = await response.json();
                    setMiembros(data);
                } else {
                    console.error('Error al obtener la lista de miembros del equipo directivo');
                }
            } catch (error) {
                console.error('Error al obtener la lista de miembros del equipo directivo:', error);
            }
        };

        obtenerMiembros();
    }, []);

    const handleDirectivoChange = (e) => {
        setDirectivo(e.target.value);
    };

    const handlePuestoChange = (e) => {
        setPuesto(e.target.value);
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

    const handleMiembroSeleccionadoChange = (e) => {
        setMiembroSeleccionado(e.target.value);
    };

    const handleCrearMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!directivo || !puesto || !imagen) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('directivo', directivo);
            formData.append('puesto', puesto);
            formData.append('imagen', imagen);

            const response = await fetch('http://localhost:5000/equipodirectivo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Miembro del equipo directivo creado exitosamente');
                setDirectivo('');
                setPuesto('');
                setImagen(null);
                window.location.reload();
            } else {
                alert('Error al crear miembro del equipo directivo');
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
            const response = await fetch(`http://localhost:5000/equipodirectivo/${miembroSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Miembro del equipo directivo borrado exitosamente');
                window.location.reload();
            } else {
                const data = await response.json();
                alert(`Error al borrar miembro del equipo directivo: ${data.error}`);
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
                    <h2 className="pb-3">Crear Miembro del Equipo Directivo</h2>
                    <form
                        action="#"
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={handleCrearMiembroSubmit}
                    >
                        <label htmlFor="directivo">Nombre completo del directivo:</label>
                        <input
                            type="text"
                            id="directivo"
                            name="directivo"
                            value={directivo}
                            onChange={handleDirectivoChange}
                            required
                        />
                        <label htmlFor="puesto">Puesto del directivo:</label>
                        <input
                            type="text"
                            id="puesto"
                            name="puesto"
                            value={puesto}
                            onChange={handlePuestoChange}
                            required
                        />
                        <label htmlFor="imagen">
                            Escoger imagen (Tamaño recomendado 1:1 / Máximo 2MB):
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
                            <input type="submit" value="Crear Miembro" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Miembro del Equipo Directivo</h2>
                    <form action="#" method="post" onSubmit={handleBorrarMiembroSubmit}>
                        <label htmlFor="miembro">Selecciona un miembro:</label>
                        <select
                            name="miembro"
                            id="miembro"
                            value={miembroSeleccionado}
                            onChange={handleMiembroSeleccionadoChange}
                        >
                            <option value="">Selecciona un miembro</option>
                            {miembros.map((miembro) => (
                                <option key={miembro.id} value={miembro.id}>
                                    {miembro.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Miembro" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EquipoDirectivo;