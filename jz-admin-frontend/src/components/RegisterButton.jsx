import { useNavigate } from 'react-router-dom';

export default function RegisterButton() {
    const navigate = useNavigate();
  
    const handleRegister = () => {
      navigate('/register');
    };
  
    return (
      <button onClick={handleRegister}>Registrarse</button>
    );
  }