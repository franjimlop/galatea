import React from 'react';
import '../styles/login.css';

const EquipoDirectivo = () => {
    return (
        <div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Crear Miembro del Equipo Directivo</h2>
                    <form action="#" method="post" encType="multipart/form-data">
                        <label htmlFor="directivo">Nombre completo del directivo:</label>
                        <input type="text" id="directivo" name="directivo" required/>
                        <label htmlFor="puesto">Puesto del directivo:</label>
                        <input type="text" id="puesto" name="puesto" required/>
                        <label htmlFor="usuario">Escoger imagen (Tamaño recomendado 1:1 / Máximo 2MB):</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" required />
                        <div className="div pt-4">
                            <input type="submit" value="Crear Miembro" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="py-5">
                <div className="login-container">
                    <h2 className="pb-3">Borrar Miembro del Equipo Directivo</h2>
                    <form action="#" method="post">
                        <label htmlFor="miembro">Selecciona un miembro:</label>
                        <select name="miembro" id="miembro">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
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