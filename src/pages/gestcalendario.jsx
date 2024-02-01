import React from 'react';
import '../styles/login.css';

const GestionCalendarios = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Calendario</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombre">Nombre del calendario:</label>
                        <input type="text" id="nombre" name="nombre" required/>
                        <label htmlFor="usuario">Escoger imagen (Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Calendario"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Calendario</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Seleccionar Calendario:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Calendario"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionCalendarios;