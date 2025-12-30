import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPlayers } from "../../features/players/playerSlice";

function PlayerList() {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector(state => state.players);

    useEffect(() => {
        dispatch(fetchPlayers());
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="p-6 space-y-2">
            {list.map(player => (
                <li
                    key={player.$id}
                    className="border p-3 flex justify-between"
                >
                    <span>
                        {player.name} ({player.role})
                    </span>
                    <span>₹{player.basePrice}</span>
                </li>
            ))}
        </ul>
    );
}

export default PlayerList;
