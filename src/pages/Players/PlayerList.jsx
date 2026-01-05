import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchPlayers,
    deletePlayer,
    updatePlayer,
} from "../../features/players/playerSlice";
import { useNavigate } from "react-router-dom";

function PlayerList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { list, loading } = useAppSelector((state) => state.players);

    useEffect(() => {
        dispatch(fetchPlayers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (confirm("Delete this player?")) {
            dispatch(deletePlayer(id));
        }
    };

    const toggleStatus = (player) => {
        let newStatus =
            player.status === "sold" ? "unsold" : "sold";

        dispatch(
            updatePlayer({
                id: player.$id,
                data: {
                    status: newStatus,
                    soldTo: newStatus === "sold" ? player.soldTo || "" : "",
                    soldPrice:
                        newStatus === "sold"
                            ? player.soldPrice || player.basePrice
                            : 0,
                },
            })
        );
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

            <ul className="space-y-3">
                {list.map((player) => (
                    <li
                        key={player.$id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        {/* PLAYER INFO */}
                        <div>
                            <p className="font-semibold">
                                {player.name} ({player.role})
                            </p>
                            <p className="text-sm text-gray-600">
                                Base Price: ₹{player.basePrice}
                            </p>

                            {/* STATUS */}
                            <span
                                className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-bold
                                ${player.status === "sold"
                                        ? "bg-green-100 text-green-700"
                                        : player.status === "unsold"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {player.status?.toUpperCase() || "AVAILABLE"}
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2">
                            {/* EDIT */}
                            <button
                                onClick={() =>
                                    navigate("/add-player", {
                                        state: player,
                                    })
                                }
                                className="bg-yellow-500 px-3 py-1 text-white rounded"
                            >
                                Edit
                            </button>

                            {/* STATUS CHANGE */}
                            <button
                                onClick={() => toggleStatus(player)}
                                className="bg-purple-600 px-3 py-1 text-white rounded"
                            >
                                Mark {player.status === "sold" ? "Unsold" : "Sold"}
                            </button>

                            {/* DELETE */}
                            <button
                                onClick={() => handleDelete(player.$id)}
                                className="bg-red-600 px-3 py-1 text-white rounded"
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
