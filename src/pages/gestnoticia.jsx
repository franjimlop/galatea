import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionNoticias = () => {
    const [nombre, setNombre] = useState('');
    const [texto, setTexto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [foto, setFoto] = useState(null);
    const [noticias, setNoticias] = useState([]);
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState('');

    const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    const [nombreError, setNombreError] = useState('');
    const [textoError, setTextoError] = useState('');

    const obtenerNoticias = async () => {
        try {
            const response = await fetch('https://localhost:5000/noticias');
            if (response.ok) {
                const data = await response.json();
                setNoticias(data);
            } else {
                console.error('Error al obtener las noticias');
            }
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
        }
    };
    useEffect(() => {
        obtenerNoticias();
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

    const handleTextoChange = (e) => {
        const value = e.target.value;
        setTexto(value);

        if (value.length < 10) {
            setTextoError('El texto debe tener al menos 10 caracteres');
        } else {
            setTextoError('');
        }
    };

    const handleCategoriaChange = (e) => { setCategoria(e.target.value); };

    const handleFotoChange = (e) => {
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
            setFoto(selectedImage);
        }
    };

    const handleNoticiaSeleccionadaChange = (e) => {
        setNoticiaSeleccionada(e.target.value);
    };

    const handleCrearNoticiaSubmit = async (e) => {
        e.preventDefault();

        const f = new Date();
        const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

        if (!nombre || !texto || !categoria || !foto || !fecha || nombre.length < 4 || texto.length < 10) {
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
            formData.append('texto', texto);
            formData.append('categoria', categoria);
            formData.append('foto', foto);
            formData.append('fecha', fecha);

            const response = await fetch('https://localhost:5000/noticias', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setTexto('');
                setCategoria('');
                setFoto(null);
                toast.success('Noticia creada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerNoticias();
            } else {
                toast.error('Error al crear noticia', {
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

    const handleCrearAdjuntoSubmit = async (e) => {
        e.preventDefault();

        if (!noticiaSeleccionada || archivosAdjuntos.length === 0) {
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

        const maxSize = 2 * 1024 * 1024; // 2MB

        // Verificar el tamaño de cada archivo adjunto
        for (const archivo of archivosAdjuntos) {
            if (archivo.size > maxSize) {
                toast.error('Un archivo seleccionado supera el tamaño máximo de 2MB', {
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
        }

        try {
            const formData = new FormData();
            formData.append('id_noticia', noticiaSeleccionada);

            // Verificar si archivosAdjuntos es un FileList o un array
            const files = Array.from(archivosAdjuntos);

            files.forEach((archivo) => {
                const nombreArchivo = archivo.name;
                formData.append('nombres[]', nombreArchivo); // Agregar el nombre del archivo al FormData como un array
                formData.append('archivos', archivo);
            });            

            const response = await fetch('https://localhost:5000/adjuntos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNoticiaSeleccionada('');
                setArchivosAdjuntos([]);
                toast.success('Archivos adjuntos creados exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error('Error al crear archivos adjuntos', {
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

    const handleBorrarNoticiaSubmit = async (e) => {
        e.preventDefault();

        if (!noticiaSeleccionada) {
            toast.info('Por favor, selecciona una noticia para borrar', {
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
            const response = await fetch(`https://localhost:5000/noticias/${noticiaSeleccionada}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Noticia borrada exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerNoticias();
            } else {
                toast.error('Fallo al borrar noticia', {
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
                    <h2 className="pb-3">Agregar Noticia</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearNoticiaSubmit}>
                        <label htmlFor="nombre">Título de la noticia:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange} />
                        {nombreError && <p className="error-message red">{nombreError}</p>}

                        <label htmlFor="texto">Texto de la noticia:</label>
                        <textarea type="text" id="texto" name="texto" value={texto} onChange={handleTextoChange} style={{ height: '20vh', width: '100%', resize: 'none' }} />
                        {textoError && <p className="error-message red">{textoError}</p>}

                        <label htmlFor="categoria">Seleccionar Categoría Noticia:</label>
                        <select name="categoria" id="categoria" value={categoria} onChange={handleCategoriaChange}>
                            <option value="" disabled hidden>Selecciona una categoría</option>
                            <option value="general">Noticia General</option>
                            <option value="extranjera">Noticia Departamento de Lenguas Extranjeras</option>
                            <option value="mate">Noticia Departamento Científico-Matemático</option>
                            <option value="lengua">Noticia Departamento Sociolingüístico</option>
                            <option value="musica">Noticia Departamento de Música y Educación Física</option>
                            <option value="plastica">Noticia Departamento de Plástica y Tecnología</option>
                            <option value="orientacion">Noticia Departamento de Orientación</option>
                            <option value="religion">Noticia Departamento de Religión</option>
                            <option value="economia">Noticia Departamento de Economía</option>
                        </select>

                        <label htmlFor="usuario">Escoger imagen (Tamaño recomendado 1920x1080 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleFotoChange} />

                        <div className="div pt-4">
                            <input type="submit" value="Crear Noticia" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Agregar Archivos Adjuntos</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearAdjuntoSubmit}>
                        <label htmlFor="noticia">Seleccionar Noticia:</label>
                        <select name="noticia" id="noticia" value={noticiaSeleccionada} onChange={handleNoticiaSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona una noticia</option>
                            {noticias.filter(noticia => noticia.categoria !== 'complementaria' && noticia.categoria !== 'extraescolar').map(noticia => (
                                <option key={noticia.id} value={noticia.id}>{noticia.nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="archivos">Adjuntar archivos:</label>
                        <input type="file" id="archivos" name="archivos" accept=".pdf" multiple onChange={(e) => setArchivosAdjuntos(e.target.files)} />

                        <div className="div pt-4">
                            <input type="submit" value="Agregar archivos adjuntos" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Noticia</h2>
                    <form onSubmit={handleBorrarNoticiaSubmit}>
                        <label htmlFor="noticia">Seleccionar Noticia:</label>
                        <select name="noticia" id="noticia" value={noticiaSeleccionada} onChange={handleNoticiaSeleccionadaChange}>
                            <option value="" disabled hidden>Selecciona una noticia</option>
                            {noticias.filter(noticia => noticia.categoria !== 'complementaria' && noticia.categoria !== 'extraescolar').map(noticia => (
                                <option key={noticia.id} value={noticia.id}>{noticia.nombre}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Noticia" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionNoticias;