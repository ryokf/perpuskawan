import { Navigate } from 'react-router';
import { isAuthenticated, isStaff } from '../services/authService';

interface AdminRouteProps {
    Component: React.ComponentType;
}

const AdminRoute = ({ Component }: AdminRouteProps) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    
    if (!isStaff()) {
        return <Navigate to="/" replace />;
    }
    
    return <Component />;
};

export default AdminRoute;
