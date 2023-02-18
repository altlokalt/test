import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = (allowedRoles) => {
    const { auth } = useAuth();
    console.log("auth", auth)
    console.log("allowedRoles", allowedRoles.allowedRoles)

    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles.allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );

    // if (auth.roles.find(role => allowedRoles.allowedRoles.includes(role))) {

    //     if (auth.user) {
    //         console.log("user is not authorized", auth.user)
    //         return (
    //             <Navigate
    //                 to={{
    //                     pathname: '/',
    //                     state: { from: location },
    //                     replace: true,
    //                 }}
    //             />
    //         );
    //     }
    //     return <Outlet />;

    // } else {
    //     return (
    //         <Navigate
    //             to={{
    //                 pathname: '/login',
    //                 state: { from: location },
    //                 replace: true,
    //             }}
    //         />
    //     );
    // }

}
export default RequireAuth;