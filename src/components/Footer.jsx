import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">
                            🏏 IPL Auction
                        </h2>
                        <p className="text-sm mt-2 text-slate-400">
                            Live cricket auction management system.
                            Real-time bidding, teams & squad tracking.
                        </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">
                                Home
                            </li>
                            <li className="hover:text-white cursor-pointer">
                                Live Auction
                            </li>
                            <li className="hover:text-white cursor-pointer">
                                Teams
                            </li>
                            <li className="hover:text-white cursor-pointer">
                                Team Squads
                            </li>
                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Follow Us
                        </h3>
                        <div className="flex gap-4 text-xl">
                            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
                            <FaYoutube className="hover:text-red-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-slate-700 my-6"></div>

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                    <p>
                        © {new Date().getFullYear()} IPL Auction. All rights reserved.
                    </p>
                    <p className="mt-2 md:mt-0">
                        Built with ❤️ using React & Appwrite
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer