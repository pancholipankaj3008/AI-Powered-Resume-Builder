import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

import { GetAllResume } from "../redux/resume/resumeSlice";
import { LogoutUser } from "../redux/profile/profileSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Mobile Sidebar State
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Search Functionality State
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = useSelector((state) => state.profile);
    const { resumes, loading } = useSelector((state) => state.resume);

    useEffect(() => {
        dispatch(GetAllResume());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate("/login");
    };

    // Filter resumes based on user search query input
    const filteredResumes = resumes.filter((resume) =>
        resume.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen bg-[#07080a] text-[#e4e6eb] font-sans flex flex-col md:flex-row overflow-hidden relative selection:bg-[#fbbf24] selection:text-[#0b0c0e]">

            {/* ================= AMBIENT GRADIENT MESH (Siri-Inspired Lights) ================= */}
            <style>{`
                @keyframes swirl-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes swirl-spin-rev {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes swirl-pulse {
                    0%, 100% { opacity: 0.45; transform: scale(1); }
                    50% { opacity: 0.75; transform: scale(1.12); }
                }
                .siri-ring-1 { animation: swirl-spin 7s linear infinite; }
                .siri-ring-2 { animation: swirl-spin-rev 10s linear infinite; }
                .siri-ring-3 { animation: swirl-spin 5s linear infinite; }
                .siri-core { animation: swirl-pulse 3.5s ease-in-out infinite; }
                
                /* Clean custom scrollbar for nested sidebar lists */
                .custom-sidebar-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-sidebar-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-sidebar-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                }
                .custom-sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(251, 191, 36, 0.3);
                }
            `}</style>

            {/* Dynamic Background Glow Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>

            {/* ================= MOBILE HEADER (Visible only on Mobile) ================= */}
            <header className="md:hidden w-full bg-black/40 backdrop-blur-xl border-b border-white/10 px-5 py-4 flex items-center justify-between relative z-40 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                        <span className="text-[#0b0c0e] font-black text-sm">R</span>
                    </div>
                    <span className="text-lg font-black tracking-tight text-white">Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] to-[#d97706]">AI</span></span>
                </div>
                
                {/* Menu Button */}
                <button 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        {isMobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </header>

            {/* ================= SIDEBAR (Fixed Viewport Layout - Only Content Scrolls) ================= */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-80 bg-black/60 md:bg-white/[0.02] backdrop-blur-3xl border-r border-white/10 flex flex-col justify-between 
                transition-transform duration-300 ease-in-out shrink-0 h-screen overflow-hidden
                md:relative md:transform-none ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                
                {/* Top Header Block (Fixed) */}
                <div className="p-5 border-b border-white/10 pt-24 md:pt-5 shrink-0">
                    <div className="hidden md:flex items-center gap-2.5 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.35)]">
                            <span className="text-[#0b0c0e] font-black text-lg">R</span>
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] to-[#d97706]">AI</span></span>
                    </div>

                    {/* Functional Working Glass Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search workspace resumes..."
                            className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-300 rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                        />
                        {searchQuery ? (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-600 absolute right-3 top-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.603Z" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Middle Content List (Pure Scrollable Dynamic Viewport Space) */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-sidebar-scrollbar">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase px-2">History & Resumes</span>
                        <div className="mt-3 space-y-1">
                            {loading ? (
                                <div className="p-3 text-xs text-gray-500 animate-pulse flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#fbbf24] animate-ping"></div> Syncing database...
                                </div>
                            ) : filteredResumes.length === 0 ? (
                                <div className="p-3 text-xs text-gray-600 italic">
                                    {searchQuery ? "No matching queries found" : "No workspace instances"}
                                </div>
                            ) : (
                                filteredResumes.map((resume) => (
                                    <Link
                                        key={`side-${resume._id}`}
                                        to={`/resume/${resume._id}`}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="flex items-center justify-between p-2.5 text-sm rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-2.5 truncate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#fbbf24]/70 shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                            <span className="truncate font-medium">{resume.title}</span>
                                        </div>
                                        <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 bg-[#fbbf24]/10 text-[#fbbf24] px-1.5 py-0.5 rounded-md border border-[#fbbf24]/20 transition-all">Open</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Section (Strictly Fixed Container) */}
                <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md shrink-0">
                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-3">
                        <div onClick={() => navigate("/profile")} className="flex items-center gap-3 cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] p-[1.5px] shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                                <div className="w-full h-full bg-[#0d0e12] rounded-full flex items-center justify-center text-xs font-black text-white">
                                    {user?.name ? user.name[0].toUpperCase() : "U"}
                                </div>
                            </div>
                            <div className="truncate">
                                <p className="text-xs font-bold text-white truncate">{user?.name || "Premium User"}</p>
                                <p className="text-[10px] font-semibold text-[#fbbf24] tracking-wider uppercase opacity-80">Pro Member</p>
                            </div>
                        </div>

                        {/* <button
                            onClick={handleLogout}
                            title="Disconnect Session"
                            className="p-2.5 bg-white/[0.02] hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-xl border border-white/10 hover:border-red-500/20 transition-all active:scale-95 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </aside>

            {/* Backdrop layer for mobile layouts */}
            {isMobileOpen && (
                <div 
                    onClick={() => setIsMobileOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
                ></div>
            )}

            {/* ================= MAIN CONTENT WORKSPACE ================= */}
            <main className="flex-1 overflow-y-auto relative z-10 w-full h-full">
                
                {/* Tech Layout Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>

                <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 relative z-10">

                    {/* --- FUTURISTIC HERO ACCENT BANNER (Max Glassmorphism) --- */}
                    <div className="text-center py-10 sm:py-14 md:py-16 px-4 mb-8 md:mb-12 relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.05] via-transparent to-transparent pointer-events-none"></div>

                        {/* Siri Glowing Orb Layout */}
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center scale-90 sm:scale-100">
                            <div className="siri-ring-1 absolute inset-0 rounded-full blur-2xl opacity-60" style={{ background: "conic-gradient(from 0deg, #fbbf24, #f59e0b, #d97706, #fde68a, #fbbf24)" }}></div>
                            <div className="siri-ring-2 absolute inset-3 rounded-full blur-xl opacity-50" style={{ background: "conic-gradient(from 180deg, #fde68a, #fbbf24, #b45309, #f59e0b, #fde68a)" }}></div>
                            <div className="siri-ring-3 absolute inset-6 rounded-full blur-md opacity-40" style={{ background: "conic-gradient(from 90deg, #fff7cc, #fbbf24, #d97706, #fff7cc)" }}></div>
                            
                            <div className="siri-core w-20 h-20 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(251,191,36,0.3)] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25)_0,transparent_65%)]"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fde68a" className="w-8 h-8 relative z-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-8.982M18 13.653V16.5m0-4.5V4.75A2.25 2.25 0 0 0 15.75 2.5H5.25A2.25 2.25 0 0 0 3 4.75v14.5A2.25 2.25 0 0 0 5.25 21.5h7.375" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white relative z-10 px-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706]">{user?.name || "Builder"}</span>!
                        </h1>
                        <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed relative z-10 px-4">
                            Which resume draft or template do you want to analyze and optimize with our AI engine today?
                        </p>

                        <div className="mt-8 relative z-10">
                            <Link
                                to="/builder"
                                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-6 py-3.5 rounded-xl text-sm shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:shadow-[0_0_45px_rgba(251,191,36,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                Create New Resume
                            </Link>
                        </div>
                    </div>

                    {/* --- MAIN INTERACTIVE WORKSPACE SECTION --- */}
                    <div className="mb-6 flex items-center justify-between px-1">
                        <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-4 bg-gradient-to-b from-[#fbbf24] to-[#d97706] rounded-full"></div>
                            <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">Recent Workspaces</h2>
                        </div>
                        <span className="text-[11px] font-semibold bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-lg">
                            Total Units: {resumes?.length || 0}
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((idx) => (
                                <div key={idx} className="animate-pulse bg-white/[0.02] border border-white/10 rounded-2xl p-5 h-28 flex items-center justify-between">
                                    <div className="space-y-3 w-1/2">
                                        <div className="h-4 bg-white/10 rounded-md w-full"></div>
                                        <div className="h-2.5 bg-white/5 rounded-md w-2/3"></div>
                                    </div>
                                    <div className="h-8 bg-white/10 rounded-xl w-20"></div>
                                </div>
                            ))}
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] backdrop-blur-xl">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#fbbf24]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">No resumes generated yet. Create your first ATS copy instance.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Main grid card section can also be optionally filtered by search for parity if desired */}
                            {filteredResumes.map((resume) => (
                                <div
                                    key={resume._id}
                                    className="group bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-3xl border border-white/10 hover:border-[#fbbf24]/30 rounded-2xl p-5 flex justify-between items-center transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                                    
                                    <div className="space-y-1 truncate pr-4 relative z-10">
                                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#fbbf24] transition-colors truncate">
                                            {resume.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium truncate">
                                            {resume.profession || "Profession not configured"}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 shrink-0 relative z-10">
                                        <Link
                                            to={`/resume/${resume._id}`}
                                            className="bg-white/5 hover:bg-[#fbbf24] text-gray-300 hover:text-[#0b0c0e] border border-white/10 hover:border-transparent px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/preview/${resume._id}`}
                                            className="bg-white/[0.01] hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 hover:border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95"
                                        >
                                            Preview
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Dashboard;