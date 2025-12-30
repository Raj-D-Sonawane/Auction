import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.status
    );

    return isAuthenticated ? children : <Navigate to="/login" />





}

export default ProtectedRoute