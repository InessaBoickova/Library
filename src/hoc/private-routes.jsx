import { Navigate,Outlet } from 'react-router-dom';

export const PrivateRoute = () => ((localStorage.getItem('token') ) ? <Outlet/>: <Navigate to="/auth"/>)

export const PrivateRouteToken = () => ((localStorage.getItem('token')) ? <Navigate to="/books"/>: <Outlet/>)


