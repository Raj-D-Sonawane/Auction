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
        <nav className="bg-black text-white px-6 py-4 flex gap-6 items-center">
            <button onClick={() => navigate("/home")}>Home</button>

            <button onClick={() => navigate("/players")}>
                Players
            </button>

            <button onClick={() => navigate("/teams")}>
                Teams
            </button>

            <button onClick={() => navigate("/live-auction")}>
                Live Auction
            </button>

            <div className="ml-auto">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
