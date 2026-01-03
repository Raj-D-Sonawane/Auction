import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeams, deleteTeam } from "../../features/teams/teamSlice";

function TeamTodo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { list, loading } = useAppSelector((state) => state.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            dispatch(deleteTeam(id));
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;
    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Teams</h2>

                <button
                    onClick={() => navigate("/add-team")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Team
                </button>
            </div>

            {/* TEAM LIST */}
            {list.length === 0 ? (
                <p className="text-gray-500">No teams added yet</p>
            ) : (
                <ul className="space-y-3">
                    {list.map((team) => (
                        <li
                            key={team.$id}
                            className="border rounded-lg p-4 flex justify-between items-center bg-white"
                        >
                            {/* TEAM INFO */}
                            <div>
                                <p className="font-semibold text-lg">
                                    {team.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Budget: ₹{team.budget}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Players: {team.players?.length || 0}/11
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        navigate("/add-team", { state: team })
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(team.$id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TeamTodo