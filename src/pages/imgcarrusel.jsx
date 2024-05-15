import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImgCarrusel = () => {
    const [nombreImagen, setNombreImagen] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');

    const [nombreError, setNombreError] = useState('');

    const obtenerImagenes = async () => {
        try {
            const response = await fetch('https://localhost:5000/imagenes');
            if (response.ok) {
                const data = await response.json();
                setImagenes(data);
            } else {
                console.error('Error al obtener la lista de imágenes');
            }
        } catch (error) {
            console.error('Error al obtener la lista de imágenes:', error);
        }
    };
    useEffect(() => {
        obtenerImagenes();
    }, []);

    const handleNombreImagenChange = (e) => {
        const value = e.target.value;
        setNombreImagen(value);

        if (value.length < 4) {
            setNombreError('El nombre de la imagen debe tener al menos 4 caracteres');
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

    const handleImagenSeleccionadaChange = (e) => {
        setImagenSeleccionada(e.target.value);
    };

    const handleSubirImagenSubmit = async (e) => {
        e.preventDefault();

        if (!nombreImagen || !imagen || nombreImagen.length < 4) {
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
            formData.append('nombre', nombreImagen);
            formData.append('imagen', imagen);

            const response = await fetch('https://localhost:5000/imagenes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombreImagen('');
                setImagen(null);
                toast.success('Imagen creada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerImagenes();
            } else {
                toast.error('Error al subir la imagen', {
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

    const handleBorrarImagenSubmit = async (e) => {
        e.preventDefault();

        if (!imagenSeleccionada) {
            toast.info('Por favor, selecciona una imagen para poder borrarla', {
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
            const response = await fetch(`https://localhost:5000/imagenes/${imagenSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Imagen borrada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerImagenes();
            } else {
                toast.error('Fallo al borrar la imagen', {
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
                    <h2 className="pb-3">Crear Imagen</h2>
                    <form encType="multipart/form-data" onSubmit={handleSubirImagenSubmit}>
                        <label htmlFor="nombreImagen">Nombre de la imagen:</label>
                        <input type="text" id="nombreImagen" name="nombreImagen" value={nombreImagen} onChange={handleNombreImagenChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="imagen">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImagenChange}/>

                        <div className="div pt-4">
                            <input type="submit" value="Subir Imagen" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Imagen</h2>
                    <form onSubmit={handleBorrarImagenSubmit}>
                        <label htmlFor="selectImagen">Selecciona la imagen:</label>
                        <select name="selectImagen" id="selectImagen" value={imagenSeleccionada} onChange={handleImagenSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona una imagen</option>
                            {imagenes.map((imagen) => (
                                <option key={imagen.id} value={imagen.id}>
                                    {imagen.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Imagen" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ImgCarrusel;