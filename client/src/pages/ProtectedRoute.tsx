import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from './auth';
import { useSelector } from 'react-redux';
interface UserInternal {
  apellido: string;
  email: string;
  fecha_registro: {
    seconds: number;
    nanoseconds: number;
  };
  id_usuario: string;
  imagen_perfil: string;
  nombre: string;
}

// Define la interfaz para el estado global
interface RootState {
 
    token: string;
    user: UserInternal | null;
 
}
function ProtectedRoute({ children }:{children:any}) {
  const user = useSelector((state: RootState) => state.user);




  if (user== null) {
    // Si no está autenticado, redirige al inicio de sesión
    return <Navigate to="/iniciar-sesion" replace />;
  }
  // Si está autenticado, renderiza el contenido
  return children;
}

export default ProtectedRoute;
