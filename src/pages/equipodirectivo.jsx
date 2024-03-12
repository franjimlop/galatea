import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EquipoDirectivo = () => {
    const [directivo, setDirectivo] = useState('');
    const [puesto, setPuesto] = useState('');
    const [imagen, setImagen] = useState(null);
    const [miembros, setMiembros] = useState([]);
    const [miembroSeleccionado, setMiembroSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');
    const [puestoError, setPuestoError] = useState('');

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
    useEffect(() => {
        obtenerMiembros();
    }, []);

    const handleDirectivoChange = (e) => {
        const value = e.target.value;
        setDirectivo(value);

        if (value.length < 4) {
            setNombreError('El nombre debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handlePuestoChange = (e) => {
        const value = e.target.value;
        setPuesto(value);

        if (value.length < 4) {
            setNombreError('El puesto debe tener al menos 4 caracteres');
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

    const handleMiembroSeleccionadoChange = (e) => {
        setMiembroSeleccionado(e.target.value);
    };

    const handleCrearMiembroSubmit = async (e) => {
        e.preventDefault();

        if (!directivo || !puesto || !imagen || directivo.length < 4 || puesto.length < 4) {
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
            formData.append('directivo', directivo);
            formData.append('puesto', puesto);
            formData.append('imagen', imagen);

            const response = await fetch('http://localhost:5000/equipodirectivo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setDirectivo('');
                setPuesto('');
                setImagen(null);
                toast.success('Miembro del equipo directivo creado exitosamente', {
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
                toast.error('Error al crear miembro del equipo directivo', {
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
            const response = await fetch(`http://localhost:5000/equipodirectivo/${miembroSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Miembro del equipo directivo borrado exitosamente', {
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
                toast.error('Error al borrar miembro del equipo directivo', {
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
                    <h2 className="pb-3">Crear Miembro del Equipo Directivo</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearMiembroSubmit}>
                        <label htmlFor="directivo">Nombre completo del directivo:</label>
                        <input type="text" id="directivo" name="directivo" value={directivo} onChange={handleDirectivoChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}
                        
                        <label htmlFor="puesto">Puesto del directivo:</label>
                        <input type="text" id="puesto" name="puesto" value={puesto} onChange={handlePuestoChange}/>
                        {puestoError && <p className="error-message red">{puestoError}</p>}

                        <label htmlFor="imagen">
                            Escoger imagen (Tamaño recomendado 1:1 / Máximo 2MB):
                        </label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImagenChange}/>
                        <div className="div pt-4">
                            <input type="submit" value="Crear Miembro" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Miembro del Equipo Directivo</h2>
                    <form onSubmit={handleBorrarMiembroSubmit}>
                        <label htmlFor="miembro">Selecciona un miembro:</label>
                        <select name="miembro" id="miembro" value={miembroSeleccionado} onChange={handleMiembroSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un miembro</option>
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