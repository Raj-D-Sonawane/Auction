import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    startAuction,
    placeBid,
    markSold,
    markUnsold,
    resetAuction,
} from "../../features/auction/auctionSlice";
import { updateTeam } from "../../features/teams/teamSlice";
import { updatePlayer } from "../../features/players/playerSlice";

const MAX_PLAYERS_PER_TEAM = 11;
const MIN_TEAMS = 2;
const BID_INCREMENT = 500;
const MIN_BASE_PRICE = 1000;

function LiveAuction() {
    const dispatch = useAppDispatch();

    const allPlayers = useAppSelector((state) => state.players.list);
    const teams = useAppSelector((state) => state.teams.list);
    const auction = useAppSelector((state) => state.auction);

    const [playerIndex, setPlayerIndex] = useState(0);

    /* ✅ UNSOLD players only */
    const unsoldPlayers = useMemo(
        () => allPlayers.filter((p) => p.status !== "sold"),
        [allPlayers]
    );

    /* 🔢 Dynamic calculation */
    const totalTeams = teams.length;
    const requiredPlayers = totalTeams * MAX_PLAYERS_PER_TEAM;

    /* 🚫 Auction start validation */
    if (
        totalTeams < MIN_TEAMS ||
        unsoldPlayers.length < requiredPlayers
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
                <div className="bg-black/40 p-8 rounded-xl text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        🚫 Auction cannot start
                    </h2>
                    <p>Teams added: {totalTeams}</p>
                    <p>Minimum teams required: {MIN_TEAMS}</p>
                    <p className="mt-2">
                        Unsold Players: {unsoldPlayers.length}
                    </p>
                    <p>
                        Minimum players required: {requiredPlayers}
                    </p>
                </div>
            </div>
        );
    }

    /* ▶ Start auction */
    useEffect(() => {
        if (
            unsoldPlayers.length &&
            playerIndex < unsoldPlayers.length
        ) {
            dispatch(startAuction(unsoldPlayers[playerIndex]));
        }
    }, [unsoldPlayers, playerIndex, dispatch]);

    /* 💰 Bid logic */
    const handleBid = (team) => {
        if (auction.status !== "running") return;

        if (team.players.length >= MAX_PLAYERS_PER_TEAM) {
            alert("This team already has 11 players");
            return;
        }

        const newBid = auction.currentBid + BID_INCREMENT;

        const remainingSlots =
            MAX_PLAYERS_PER_TEAM - team.players.length;
        const minRequiredBudget =
            remainingSlots * MIN_BASE_PRICE;

        if (team.budget < newBid) {
            alert("Not enough budget");
            return;
        }

        if (team.budget - newBid < minRequiredBudget) {
            alert(
                "Remaining budget must allow minimum base price for remaining players"
            );
            return;
        }

        dispatch(placeBid({ team, amount: newBid }));
    };

    /* ✅ SOLD */
    const handleSold = async () => {
        if (!auction.highestBidder) {
            alert("No bids placed");
            return;
        }

        const team = auction.highestBidder;
        const player = auction.currentPlayer;

        await dispatch(
            updateTeam({
                id: team.$id,
                data: {
                    budget: team.budget - auction.currentBid,
                    players: [...team.players, player.$id],
                },
            })
        );

        await dispatch(
            updatePlayer({
                id: player.$id,
                data: {
                    status: "sold",
                    soldTo: team.$id,
                    soldPrice: auction.currentBid,
                },
            })
        );

        dispatch(markSold());
    };

    /* ❌ UNSOLD */
    const handleUnsold = async () => {
        await dispatch(
            updatePlayer({
                id: auction.currentPlayer.$id,
                data: {
                    status: "unsold",
                },
            })
        );
        dispatch(markUnsold());
    };

    /* ⏭ Next player */
    const nextPlayer = () => {
        dispatch(resetAuction());
        setPlayerIndex((i) => i + 1);
    };

    if (!auction.currentPlayer) {
        return (
            <p className="text-center mt-10 text-xl text-white">
                No players left for auction
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6">

            <h1 className="text-3xl font-extrabold text-center mb-8">
                🏏 LIVE AUCTION
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* PLAYER */}
                <div className="bg-white text-black rounded-xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold">
                        {auction.currentPlayer.name}
                    </h2>
                    <p className="text-gray-600">
                        {auction.currentPlayer.role}
                    </p>
                    <p className="mt-4 text-xl font-semibold text-blue-700">
                        Base Price: ₹ {auction.currentPlayer.basePrice}
                    </p>

                    {auction.status !== "running" && (
                        <p
                            className={`mt-6 text-3xl font-bold text-center ${auction.status === "sold"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {auction.status.toUpperCase()}
                        </p>
                    )}
                </div>

                {/* CURRENT BID */}
                <div className="flex flex-col justify-center items-center bg-black/40 rounded-xl p-6">
                    <p className="text-lg tracking-widest">
                        CURRENT BID
                    </p>
                    <p className="text-5xl font-extrabold text-yellow-400 my-4">
                        ₹ {auction.currentBid}
                    </p>

                    {auction.highestBidder && (
                        <p className="text-lg">
                            Highest Bidder:
                            <span className="ml-2 font-bold text-green-400">
                                {auction.highestBidder.name}
                            </span>
                        </p>
                    )}
                </div>

                {/* TEAMS */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-center">
                        Teams
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {teams.map((team) => (
                            <button
                                key={team.$id}
                                onClick={() => handleBid(team)}
                                disabled={
                                    auction.status !== "running" ||
                                    team.players.length >= MAX_PLAYERS_PER_TEAM
                                }
                                className="bg-white text-black rounded-lg py-3 font-bold disabled:opacity-40 hover:bg-yellow-400 transition"
                            >
                                <div>{team.name}</div>
                                <div className="text-sm">
                                    ₹ {team.budget} |{" "}
                                    {team.players.length}/11
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ADMIN */}
            {auction.status === "running" && (
                <div className="mt-10 flex justify-center gap-6">
                    <button
                        onClick={handleSold}
                        className="bg-green-600 px-8 py-3 text-lg font-bold rounded-full"
                    >
                        SOLD
                    </button>
                    <button
                        onClick={handleUnsold}
                        className="bg-red-600 px-8 py-3 text-lg font-bold rounded-full"
                    >
                        UNSOLD
                    </button>
                </div>
            )}

            {/* NEXT */}
            {auction.status !== "running" && (
                <div className="mt-10 text-center">
                    <button
                        onClick={nextPlayer}
                        className="bg-blue-600 px-10 py-3 text-lg font-bold rounded-full"
                    >
                        NEXT PLAYER
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveAuction;
