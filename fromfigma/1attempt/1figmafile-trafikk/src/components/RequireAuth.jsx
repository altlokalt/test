import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = (allowedRoles) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log("auth", auth);

    // return (
    //     auth?.role?.find(role => allowedRoles.allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.email
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/home" state={{ from: location }} replace />
    // );

    return auth === null ? (
        <div>Loading...</div>
    ) : auth?.role?.find(role => allowedRoles.allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.email ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
    

}
export default RequireAuth;

