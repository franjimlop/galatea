import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionDocumentos = () => {
    const [nombre, setNombre] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [documentos, setDocumentos] = useState([]);
    const [documentoSeleccionado, setDocumentoSeleccionado] = useState('');

    const [nombreError, setNombreError] = useState('');

    const obtenerDocumentos = async () => {
        try {
            const response = await fetch('https://localhost:5000/documentos');
            if (response.ok) {
                const data = await response.json();
                setDocumentos(data);
            } else {
                console.error('Error al obtener la lista de documentos');
            }
        } catch (error) {
            console.error('Error al obtener la lista de documentos:', error);
        }
    };
    useEffect(() => {
        obtenerDocumentos();
    }, []);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        setNombre(value);

        if (value.length < 4) {
            setNombreError('El nombre del documento debe tener al menos 4 caracteres');
        } else {
            setNombreError('');
        }
    };

    const handleArchivoChange = (e) => {
        const selectedArchivo = e.target.files[0];

        // Validar tamaño del archivo
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (selectedArchivo && selectedArchivo.size > maxSize) {
            toast.error('El archivo seleccionado supera el tamaño máximo de 2MB', {
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
            setArchivo(selectedArchivo);
        }
    };

    const handleDocumentoSeleccionadoChange = (e) => {
        setDocumentoSeleccionado(e.target.value);
    };

    const handleCrearDocumentoSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !archivo || nombre.length < 4) {
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
        formData.append('nombre', nombre);
        formData.append('archivo', archivo);

        try {
            const response = await fetch('https://localhost:5000/documentos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNombre('');
                setArchivo(null);
                toast.success('Documento creado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerDocumentos();
            } else {
                toast.error('Error al crear documento', {
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

    const handleBorrarDocumentoSubmit = async (e) => {
        e.preventDefault();

        if (!documentoSeleccionado) {
            toast.info('Por favor, selecciona un documento para borrar', {
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
            const response = await fetch(`https://localhost:5000/documentos/${documentoSeleccionado}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Documento borrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                obtenerDocumentos();
            } else {
                toast.error('Error al borrar el documento', {
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
                    <h2 className="pb-3">Crear Documento</h2>
                    <form encType="multipart/form-data" onSubmit={handleCrearDocumentoSubmit}>
                        <label htmlFor="nombre">Nombre del documento:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleNombreChange}/>
                        {nombreError && <p className="error-message red">{nombreError}</p>}
                        
                        <label htmlFor="archivo">Escoger documento (PDF máximo 2MB):</label>
                        <input type="file" id="archivo" name="archivo" accept=".pdf" onChange={handleArchivoChange}/>
                        
                        <div className="div pt-4">
                            <input type="submit" value="Crear Documento" />
                        </div>
                    </form>
                </div>
            </div>

            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Documento</h2>
                    <form onSubmit={handleBorrarDocumentoSubmit}>
                        <label htmlFor="documento">Seleccionar documento:</label>
                        <select name="documento" id="documento" value={documentoSeleccionado} onChange={handleDocumentoSeleccionadoChange}>
                            <option value="" disabled hidden>Selecciona un documento</option>
                            {documentos.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.nombre}</option>
                            ))}
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Documento" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionDocumentos;