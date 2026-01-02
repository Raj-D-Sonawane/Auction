import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPlayers, deletePlayer } from "../../features/players/playerSlice";
import { useNavigate } from "react-router-dom";

function PlayerList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { list, loading } = useAppSelector(state => state.players);

    useEffect(() => {
        dispatch(fetchPlayers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (confirm("Delete this player?")) {
            dispatch(deletePlayer(id));
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Players</h2>
                <button
                    onClick={() => navigate("/add-player")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Player
                </button>
            </div>

            <ul className="space-y-2">
                {list.map(player => (
                    <li
                        key={player.$id}
                        className="border p-3 flex justify-between items-center"
                    >
                        <span>
                            {player.name} ({player.role}) – ₹{player.basePrice}
                        </span>

                        <div className="flex gap-2">
                            {/* ✏️ Edit */}
                            <button
                                onClick={() =>
                                    navigate("/add-player", { state: player })
                                }
                                className="bg-yellow-500 px-3 py-1 text-white"
                            >
                                Edit
                            </button>

                            {/* 🗑️ Delete */}
                            <button
                                onClick={() => handleDelete(player.$id)}
                                className="bg-red-600 px-3 py-1 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;