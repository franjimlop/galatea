import React from 'react';
import '../styles/login.css';

const GestionProyectos = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Agregar Proyecto</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombre">Título del proyecto:</label>
                        <input type="text" id="nombre" name="nombre" required />
                        <label htmlFor="texto">Texto del proyecto:</label>
                        <input type="text" id="texto" name="texto" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Proyecto" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Proyecto</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Seleccionar Proyecto:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Proyecto" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionProyectos;