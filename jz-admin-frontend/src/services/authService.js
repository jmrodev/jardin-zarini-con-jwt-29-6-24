const registerUser = async (userDetails) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
  
      const data = await response.json();
      return data; // Puedes manejar la respuesta como necesites
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error; // Lanzar el error para que pueda ser manejado por el componente llamante
    }
  };
  
  export { registerUser };