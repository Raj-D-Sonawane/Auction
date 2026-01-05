import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeams, deleteTeam } from "../../features/teams/teamSlice";

const MAX_PLAYERS = 11;

function TeamList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const teams = useAppSelector((state) => state.teams.list);
    const players = useAppSelector((state) => state.players.list);
    const { loading } = useAppSelector((state) => state.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this team?")) {
            dispatch(deleteTeam(id));
        }
    };

    const getPlayerById = (id) =>
        players.find((p) => p.$id === id);

    if (loading) {
        return <p className="p-6 text-white">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black p-6 text-white">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Teams</h2>
                <button
                    onClick={() => navigate("/add-team")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                >
                    + Add Team
                </button>
            </div>

            <h1 className="text-3xl font-extrabold text-center mb-10">
                🏏 TEAM SQUADS
            </h1>

            {/* TEAM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => {
                    const squadPlayers =
                        team.players?.map(getPlayerById).filter(Boolean) || [];

                    const remainingSlots =
                        MAX_PLAYERS - squadPlayers.length;

                    return (
                        <div
                            key={team.$id}
                            onClick={() =>
                                navigate(`/team/${team.$id}`)
                            }
                            className="bg-white/10 hover:bg-white/20 cursor-pointer transition rounded-2xl p-6 shadow-xl"
                        >
                            {/* TEAM HEADER */}
                            <div className="flex items-center gap-4 mb-4">
                                {team.logo && (
                                    <img
                                        src={team.logo}
                                        alt={team.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                )}

                                <div>
                                    <h2 className="text-xl font-bold">
                                        {team.name}
                                    </h2>
                                    <p className="text-sm text-gray-300">
                                        Budget: ₹ {team.budget}
                                    </p>
                                </div>

                                {/* EDIT / DELETE */}
                                <div className="ml-auto flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate("/add-team", {
                                                state: team,
                                            });
                                        }}
                                        className="bg-blue-500 px-3 py-1 text-xs rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(team.$id);
                                        }}
                                        className="bg-red-500 px-3 py-1 text-xs rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* SQUAD PROGRESS */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Players</span>
                                    <span>
                                        {squadPlayers.length}/{MAX_PLAYERS}
                                    </span>
                                </div>

                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{
                                            width: `${(squadPlayers.length / MAX_PLAYERS) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* PLAYER LIST */}
                            <div className="space-y-2">
                                {squadPlayers.length === 0 && (
                                    <p className="text-sm text-gray-400">
                                        No players bought yet
                                    </p>
                                )}

                                {squadPlayers.map((player) => (
                                    <div
                                        key={player.$id}
                                        className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-lg text-sm"
                                    >
                                        <span>{player.name}</span>

                                        <div className="flex gap-2 items-center">
                                            <span className="text-gray-300">
                                                {player.role}
                                            </span>
                                            <span className="text-green-400 text-xs font-bold">
                                                SOLD
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* REMAINING SLOTS */}
                            {remainingSlots > 0 && (
                                <p className="mt-4 text-xs text-yellow-400">
                                    Remaining slots: {remainingSlots}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TeamList;
