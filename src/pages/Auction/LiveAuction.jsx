import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    startAuction,
    placeBid,
    markSold,
    markUnsold,
    resetAuction,
} from "../../features/auction/auctionSlice";

function LiveAuction() {
    const dispatch = useAppDispatch();
    const players = useAppSelector(state => state.players.list);
    const teams = useAppSelector(state => state.teams.list);
    const auction = useAppSelector(state => state.auction);

    const [timer, setTimer] = useState(30);
    const [playerIndex, setPlayerIndex] = useState(0);

    // Start auction for first player
    useEffect(() => {
        if (players.length > 0) {
            dispatch(startAuction(players[playerIndex]));
        }
    }, [players, playerIndex]);

    // Timer logic
    useEffect(() => {
        if (auction.status !== "running") return;

        if (timer === 0) {
            dispatch(markSold());
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, auction.status]);

    const handleBid = (team) => {
        const newBid = auction.currentBid + 10;
        if (team.budget >= newBid) {
            dispatch(placeBid({ team, amount: newBid }));
        }
    };

    const nextPlayer = () => {
        setTimer(30);
        dispatch(resetAuction());
        setPlayerIndex(prev => prev + 1);
    };

    if (!auction.currentPlayer) return <p>No players</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Live Auction</h2>

            {/* Player Info */}
            <div className="border p-4 mb-4">
                <h3 className="text-xl">{auction.currentPlayer.name}</h3>
                <p>Role: {auction.currentPlayer.role}</p>
                <p>Base Price: ₹{auction.currentPlayer.basePrice}</p>
                <p className="text-red-600">Time Left: {timer}s</p>
            </div>

            {/* Current Bid */}
            <div className="mb-4">
                <h3 className="text-lg">
                    Current Bid: ₹{auction.currentBid}
                </h3>
                {auction.highestBidder && (
                    <p>Highest Bidder: {auction.highestBidder.name}</p>
                )}
            </div>

            {/* Teams Bidding */}
            <div className="grid grid-cols-2 gap-4">
                {teams.map(team => (
                    <button
                        key={team.$id}
                        onClick={() => handleBid(team)}
                        className="border p-3 hover:bg-green-200"
                    >
                        {team.name} (₹{team.budget})
                    </button>
                ))}
            </div>

            {/* Auction Result */}
            {auction.status !== "running" && (
                <div className="mt-6">
                    {auction.highestBidder ? (
                        <p className="text-green-600">
                            SOLD to {auction.highestBidder.name} for ₹{auction.currentBid}
                        </p>
                    ) : (
                        <p className="text-red-600">UNSOLD</p>
                    )}

                    <button
                        onClick={nextPlayer}
                        className="mt-4 bg-blue-600 text-white px-4 py-2"
                    >
                        Next Player
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveAuction;
