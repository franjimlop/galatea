import React from 'react';
import '../styles/login.css';

const EnlacesDepartamentos = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Enlaces departamentos</h2>
                    <label htmlFor="miembro">Seleccionar departamento:</label>
                    <select name="miembro" id="miembro">
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombre">Nombre del enlace:</label>
                        <input type="text" id="nombre" name="nombre" required />
                        <label htmlFor="origen">Link:</label>
                        <input type="text" id="origen" name="origen" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Enlace" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Enlace</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Seleccionar Departamento:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <label htmlFor="miembro">Seleccionar Enlace:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Enlace" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnlacesDepartamentos;