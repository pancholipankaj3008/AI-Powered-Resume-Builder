import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans flex items-center justify-center relative overflow-hidden selection:bg-[#fbbf24] selection:text-[#0b0c0e]">

            {/* Ambient Background Glow Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>

            {/* Tech Layout Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>

            <div className="relative z-10 text-center px-6 py-16 max-w-lg mx-auto">

                <div className="relative inline-block mb-4">
                    <span className="text-[6rem] sm:text-[8rem] font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] drop-shadow-[0_0_40px_rgba(251,191,36,0.25)]">
                        404
                    </span>
                    <div className="absolute inset-0 -z-10 blur-3xl bg-[#fbbf24] opacity-[0.12] rounded-full"></div>
                </div>

                <div className="w-11 h-11 mx-auto mb-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#fbbf24]">
                    <Compass className="w-5 h-5" strokeWidth={1.5} />
                </div>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Page Not Found
                </h2>

                <p className="text-sm text-gray-400 font-medium mt-2.5 leading-relaxed">
                    The page you're looking for doesn't exist, or may have been moved somewhere else.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-6 py-3 rounded-xl text-sm shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:shadow-[0_0_45px_rgba(251,191,36,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                >
                    <Home className="w-4 h-4" strokeWidth={2.5} />
                    Go Home
                </Link>

            </div>

        </div>
    );
};

export default NotFound;