import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeams } from "../../features/teams/teamSlice";

function TeamList() {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector(state => state.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="p-6 space-y-2">
            {list.map(team => (
                <li
                    key={team.$id}
                    className="border p-3 flex justify-between"
                >
                    <span>{team.name}</span>
                    <span>₹{team.budget}</span>
                </li>
            ))}
        </ul>
    );
}

export default TeamList;
