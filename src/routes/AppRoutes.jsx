import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "../pages/Auth/Signup"
import Login from "../pages/Auth/Login"
import Home from "../pages/Home/Home"
import ProtectedRoute from "../components/ProtectedRoute"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute >
                        <Navbar />
                        <Home />
                        <Footer />
                    </ProtectedRoute>
                }
            />

            {/* Default Route */}
            <Route path="*" element={<Navigate to="/login" />} />



        </Routes>
    )
}

export default AppRoutes