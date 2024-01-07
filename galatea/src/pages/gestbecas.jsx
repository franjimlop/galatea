import React from 'react';
import '../styles/login.css';

const GestionBecas = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Beca</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="nombre">Nombre de la beca:</label>
                        <input type="text" id="nombre" name="nombre" required/>
                        <label htmlFor="origen">Link a la beca:</label>
                        <input type="text" id="origen" name="origen" required/>
                        <div className="div pt-4">
                            <input type="submit" value="Crear Beca"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Beca</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Seleccionar beca:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <div className="div pt-4">
                            <input type="submit" value="Borrar Beca"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GestionBecas;