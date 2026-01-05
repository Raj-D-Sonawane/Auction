import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

function TeamSquad() {
    const { teamId } = useParams();
    const navigate = useNavigate();

    const teams = useAppSelector((state) => state.teams.list);
    const players = useAppSelector((state) => state.players.list);

    const team = teams.find((t) => t.$id === teamId);

    if (!team) {
        return <p className="p-6">Team not found</p>;
    }

    const squadPlayers = players.filter(
        (p) =>
            p.status === "sold" &&
            p.soldTo === teamId
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black p-6 text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold"

            >
                Back
            </button>
            <h1 className="text-3xl font-extrabold mb-6 text-center">
                🏏 {team.name} – Squad
            </h1>

            <div className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
                <p className="mb-4 text-sm text-gray-300">
                    Total Players: {squadPlayers.length}
                </p>

                {squadPlayers.length === 0 ? (
                    <p className="text-gray-400 text-center">
                        No players bought yet
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {squadPlayers.map((player) => (
                            <li
                                key={player.$id}
                                className="flex justify-between bg-black/40 px-4 py-3 rounded-lg"
                            >
                                <div>
                                    <p className="font-bold">
                                        {player.name}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {player.role}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-green-400 font-bold">
                                        ₹ {player.soldPrice}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TeamSquad;
