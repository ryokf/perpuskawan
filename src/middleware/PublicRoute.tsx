import { Navigate } from 'react-router';
import { isAuthenticated } from '../services/authService';

interface PublicRouteProps {
    Component: React.ComponentType;
}

const PublicRoute = ({ Component }: PublicRouteProps) => {
    return !isAuthenticated() ? <Component /> : <Navigate to="/" replace />;
};

export default PublicRoute;
