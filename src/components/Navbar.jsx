import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";

function Navbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="bg-black text-white p-4 flex gap-4">
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/live-auction")}>Live Auction</button>
            <button onClick={() => navigate("/add-player")}>Add Player</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
