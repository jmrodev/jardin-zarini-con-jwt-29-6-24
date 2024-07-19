function logout() {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Redirigir al usuario a la página de login
    if (window.location.pathname !== '/register')

    window.location.href = '/register';
}

    export default function Logout() {
        return (
        <button onClick={logout}>Cerrar sesión</button>
        );
    }   

