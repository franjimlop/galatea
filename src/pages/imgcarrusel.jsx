import React, { useState, useEffect } from 'react';
import '../styles/login.css';

const ImgCarrusel = () => {
    const [nombreImagen, setNombreImagen] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const response = await fetch('http://localhost:5000/imagenes');
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

        obtenerImagenes();
    }, []);

    const handleNombreImagenChange = (e) => {
        setNombreImagen(e.target.value);
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

    const handleImagenSeleccionadaChange = (e) => {
        setImagenSeleccionada(e.target.value);
    };

    const handleSubirImagenSubmit = async (e) => {
        e.preventDefault();

        if (!nombreImagen || !imagen) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombre', nombreImagen);
            formData.append('imagen', imagen);

            const response = await fetch('http://localhost:5000/imagenes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Imagen subida exitosamente');

                // Borrar los campos después de subir una imagen
                setNombreImagen('');
                setImagen(null);
                window.location.reload();
            } else {
                alert('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    const handleBorrarImagenSubmit = async (e) => {
        e.preventDefault();

        if (!imagenSeleccionada) {
            alert('Por favor, selecciona una imagen para borrar');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/imagenes/${imagenSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Imagen borrada exitosamente');
                window.location.reload();
            } else {
                const data = await response.json();
                alert(`Error al borrar imagen: ${data.error}`);
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
                    <h2 className="pb-3">Crear Imagen</h2>
                    <form action="#" method="post" encType="multipart/form-data" onSubmit={handleSubirImagenSubmit}>
                        <label htmlFor="nombreImagen">Nombre de la imagen:</label>
                        <input
                            type="text"
                            id="nombreImagen"
                            name="nombreImagen"
                            value={nombreImagen}
                            onChange={handleNombreImagenChange}
                            required
                        />

                        <label htmlFor="imagen">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            onChange={handleImagenChange}
                            required
                        />

                        <div className="div pt-4">
                            <input type="submit" value="Subir Imagen" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Imagen</h2>
                    <form action="#" method="post" onSubmit={handleBorrarImagenSubmit}>
                        <label htmlFor="selectImagen">Selecciona la imagen:</label>
                        <select
                            name="selectImagen"
                            id="selectImagen"
                            value={imagenSeleccionada}
                            onChange={handleImagenSeleccionadaChange}
                        >
                            <option value="">Selecciona una imagen</option>
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