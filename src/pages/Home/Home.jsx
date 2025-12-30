import React from 'react'

function Home() {
    return (
        <div className="px-6 md:px-12 py-8 bg-slate-100 min-h-[calc(100vh-120px)]">

            {/* PAGE TITLE */}
            <h1 className="text-3xl font-bold text-slate-800 mb-8">
                Auction Dashboard
            </h1>

            {/* STATS SECTION */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <Stat title="Total Players" value="120" />
                <Stat title="Teams" value="8" />
                <Stat title="Sold" value="45" />
                <Stat title="Unsold" value="75" />
            </div>

            {/* MAIN AUCTION CARD */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
                <p className="text-gray-500 mb-2">Current Player</p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Virat Kohli
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Batsman • India
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">Current Bid</p>
                        <h3 className="text-3xl font-bold text-green-600">
                            ₹15.5 Cr
                        </h3>
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                        Place Bid
                    </button>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard title="Add Player" />
                <ActionCard title="Manage Teams" />
                <ActionCard title="Auction History" />
            </div>

        </div>
    );
}

export default Home

const Stat = ({ title, value }) => (
    <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-2">
            {value}
        </h2>
    </div>
);

const ActionCard = ({ title }) => (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold text-slate-800">
            {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
            Click to open
        </p>
    </div>
);