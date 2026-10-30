import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children, rolesPermitidos }) => {
  
  const { user, loading } = useAuth();
  // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.src/componentes/ProtectedRoute/PotectedRoute.jsx
  // Esto es crucial para no redirigir al login prematuramente en una recarga de página.
  if (loading) 
    return <div>Cargando...</div>;

  // Si no hay un usuario autenticado o si su rol no está incluido 
  // en la lista de roles permitidos, redirigimos al login.
  if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) 
    return <Navigate to="/login" />;

  // Si hay un usuario, renderizamos el componente hijo 
  // que está siendo protegido.
  return <>{children}</>;
};

export default RutaProtegida;