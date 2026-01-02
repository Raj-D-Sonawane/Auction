import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    startAuction,
    placeBid,
    markSold,
    markUnsold,
    resetAuction,
} from "../../features/auction/auctionSlice";
import { updateTeam } from "../../features/teams/teamSlice";

const MAX_PLAYERS = 11;
const MIN_BASE_PRICE = 1000;

function LiveAuction() {
    const dispatch = useAppDispatch();
    const players = useAppSelector((state) => state.players.list);
    const teams = useAppSelector((state) => state.teams.list);
    const auction = useAppSelector((state) => state.auction);

    const [playerIndex, setPlayerIndex] = useState(0);

    useEffect(() => {
        if (players.length && playerIndex < players.length) {
            dispatch(startAuction(players[playerIndex]));
        }
    }, [players, playerIndex, dispatch]);

    const handleBid = (team) => {
        if (auction.status !== "running") return;

        const newBid = auction.currentBid + 500;
        const remainingSlots = MAX_PLAYERS - team.players.length;
        const minRequiredBudget = remainingSlots * MIN_BASE_PRICE;

        if (team.budget < newBid) return;

        if (team.budget - newBid < minRequiredBudget) {
            alert("Remaining budget not sufficient for 11 players");
            return;
        }

        dispatch(placeBid({ team, amount: newBid }));
    };

    const handleSold = async () => {
        const team = auction.highestBidder;
        const player = auction.currentPlayer;

        if (!team) return;

        await dispatch(
            updateTeam({
                id: team.$id,
                data: {
                    budget: team.budget - auction.currentBid,
                    players: [...team.players, player.$id],
                },
            })
        );

        dispatch(markSold());
    };

    const nextPlayer = () => {
        dispatch(resetAuction());
        setPlayerIndex((i) => i + 1);
    };

    if (!auction.currentPlayer) return <p>No players</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                🏏 LIVE AUCTION
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Player */}
                <div className="bg-white text-black p-6 rounded-xl">
                    <h2 className="text-2xl font-bold">
                        {auction.currentPlayer.name}
                    </h2>
                    <p>{auction.currentPlayer.role}</p>
                    <p className="mt-4 text-xl">
                        Base Price : ₹ {auction.currentPlayer.basePrice}
                    </p>
                </div>

                {/* Bid */}
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl">Current Bid</p>
                    <p className="text-5xl font-bold text-yellow-400">
                        ₹ {auction.currentBid}
                    </p>
                    {auction.highestBidder && (
                        <p className="mt-2">
                            {auction.highestBidder.name}
                        </p>
                    )}
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <button
                            key={team.$id}
                            onClick={() => handleBid(team)}
                            disabled={
                                auction.status !== "running" ||
                                team.players.length >= MAX_PLAYERS
                            }
                            className="bg-white text-black p-3 rounded-lg"
                        >
                            <div>{team.name}</div>
                            <div className="text-sm">
                                ₹ {team.budget} | {team.players.length}/11
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {auction.status === "running" && (
                <div className="mt-10 flex justify-center gap-6">
                    <button
                        onClick={handleSold}
                        className="bg-green-600 px-8 py-3 rounded-full"
                    >
                        SOLD
                    </button>
                    <button
                        onClick={() => dispatch(markUnsold())}
                        className="bg-red-600 px-8 py-3 rounded-full"
                    >
                        UNSOLD
                    </button>
                </div>
            )}

            {auction.status !== "running" && (
                <div className="mt-6 text-center">
                    <button
                        onClick={nextPlayer}
                        className="bg-blue-600 px-8 py-3 rounded-full"
                    >
                        NEXT PLAYER
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveAuction;
