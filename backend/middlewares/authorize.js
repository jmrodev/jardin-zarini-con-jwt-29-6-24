const authorize = (roles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        console.log('Usuario no autenticado'); // Registro para depuración
        return res.status(403).json({ message: 'No autorizado' });
      }
      if (!roles.includes(req.session.user.role)) {
        console.log(`Rol no autorizado: ${req.session.user.role}`); // Registro para depuración
        return res.status(403).json({ message: 'No autorizado' });
      }
      next();
    };
  };
  
  export default authorize;
  