import React from 'react'
import PropTypes from 'prop-types'

const permissionsList = [
  { name: "students", actions: ["create", "read", "update", "delete"] },
  { name: "teachers", actions: ["create", "read", "update", "delete"] },
  { name: "subjects", actions: ["create", "read", "update", "delete"] },
];

const FormRegister = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  handlePermissionsChange,
  message,
  isSuccess
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reg-username">Usuario:</label>
      <input
        type="text"
        id="reg-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="reg-password">Contraseña:</label>
      <input
        type="password"
        id="reg-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="reg-role">Rol:</label>
      <select
        id="reg-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Seleccione un rol</option>
        <option value="admin">Admin</option>
        <option value="directora">Directora</option>
        <option value="vicedirectora">Vicedirectora</option>
        <option value="preceptora">Preceptora</option>
        <option value="maestra">Maestra</option>
        <option value="padre">Padre</option>
      </select>
      <label htmlFor="reg-permissions">Permisos:</label>
      {permissionsList.map(({ name, actions }) => (
        actions.map(action => (
          <label key={`${action}:${name}`}>
            <input
              type="checkbox"
              name="permisos"
              value={`${action}:${name}`}
              onChange={handlePermissionsChange}
            />
            {`${action.charAt(0).toUpperCase() + action.slice(1)} ${name.charAt(0).toUpperCase() + name.slice(1)}`}
          </label>
        ))
      ))}
      <button type="submit">Registrar</button>
      {message && (
        <div className={isSuccess ? 'success' : 'error'}>{message}</div>
      )}
    </form>
  )
}

// Validación de prop types
FormRegister.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  handlePermissionsChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
}

export default FormRegister
