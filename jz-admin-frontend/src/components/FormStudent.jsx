import React from 'react';

const FormStudent = () => {
    return (
        <div>
        <h2>Registrar Estudiante</h2>
        <form>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="classRoom">Salón:</label>
            <input type="text" id="classRoom" name="classRoom" required />
            <button type="submit">Registrar</button>
        </form>
        </div>
    );
    }

export default FormStudent;