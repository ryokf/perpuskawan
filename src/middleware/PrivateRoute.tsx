import { Navigate } from 'react-router';
import { isAuthenticated } from '../services/authService';

interface PrivateRouteProps {
    Component: React.ComponentType;
}

const PrivateRoute = ({ Component }: PrivateRouteProps) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
