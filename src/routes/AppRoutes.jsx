import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "../pages/Auth/Signup"
import Login from "../pages/Auth/Login"
import Home from "../pages/Home/Home"
import ProtectedRoute from "../components/ProtectedRoute"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AddPlayer from "../pages/Players/AddPlayer"
import PlayerList from "../pages/Players/PlayerList"
import AddTeam from "../pages/Teams/addTeam"
import TeamList from "../pages/Teams/TeamList"
import LiveAuction from "../pages/Auction/LiveAuction"
import TeamTodo from "../pages/Teams/TeamTodo"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />

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

            <Route path="/add-player" element={
                <ProtectedRoute>
                    <Navbar />
                    <AddPlayer />
                    <Footer />
                </ProtectedRoute>
            } />

            <Route path="/players" element={
                <ProtectedRoute>
                    <Navbar />
                    <PlayerList />
                    <Footer />
                </ProtectedRoute>
            } />

            <Route path="/add-team" element={
                <ProtectedRoute>
                    <Navbar />
                    <AddTeam />
                    <Footer />
                </ProtectedRoute>
            } />

            <Route path="/teams" element={
                <ProtectedRoute>
                    <Navbar />
                    <TeamList />
                    <Footer />
                </ProtectedRoute>
            } />

            <Route path="/team-todo" element={
                <ProtectedRoute>
                    <Navbar />
                    <TeamTodo />
                    <Footer />
                </ProtectedRoute>
            } />

            <Route path="/live-auction" element={
                <ProtectedRoute>
                    <Navbar />
                    <LiveAuction />
                    <Footer />
                </ProtectedRoute>
            } />


            {/* Default Route */}
            <Route path="*" element={<Navigate to="/login" />} />



        </Routes>
    )
}

export default AppRoutes