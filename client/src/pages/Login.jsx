import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LoginUser, ResetAuthState } from "../redux/auth/authSlice";
import { GetProfile } from "../redux/profile/profileSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.auth);
    const { isAuthenticated } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginUser(formData));
    };

    useEffect(() => {
        if (success) {
            dispatch(GetProfile());
            dispatch(ResetAuthState());
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans flex items-center justify-center overflow-hidden relative selection:bg-[#fbbf24] selection:text-[#0b0c0e] px-4">

            <style>{`
                // @keyframes aurora-spin {
                //     from { transform: rotate(0deg); }
                //     to { transform: rotate(360deg); }
                // }
                @keyframes aurora-hue {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                @keyframes float-blob-1 {
                    0%, 100% { transform: translate(0,0) scale(1); }
                    33% { transform: translate(-40px, -45px) scale(1.15); }
                    66% { transform: translate(25px, 30px) scale(0.9); }
                }
                @keyframes float-blob-2 {
                    0%, 100% { transform: translate(0,0) scale(1); }
                    40% { transform: translate(50px, 35px) scale(1.1); }
                    75% { transform: translate(-30px, -25px) scale(0.92); }
                }
                @keyframes float-blob-3 {
                    0%, 100% { transform: translate(0,0) scale(1); }
                    50% { transform: translate(-20px, 45px) scale(1.08); }
                }
                @keyframes card-glow {
                    0%, 100% { box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,191,36,0.06); }
                    50% { box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.16); }
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(-120%) skewX(-20deg); }
                    100% { transform: translateX(220%) skewX(-20deg); }
                }
                .aurora-layer {
                    animation: aurora-spin 40s linear infinite reverse, aurora-hue 18s linear infinite;
                }
                .blob-1 { animation: float-blob-1 14s ease-in-out infinite; }
                .blob-2 { animation: float-blob-2 17s ease-in-out infinite; }
                .blob-3 { animation: float-blob-3 12s ease-in-out infinite; }
                .glass-card { animation: card-glow 5s ease-in-out infinite; }
                .btn-shine::after {
                    content: "";
                    position: absolute;
                    top: 0; left: 0;
                    width: 40%; height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
                    animation: shine-sweep 3.2s ease-in-out infinite;
                }
            `}</style>

            {/* Aurora rotating gradient layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
                <div
                    className="aurora-layer w-[270rem] h-[270rem] opacity-[0.12] blur-[160px]"
                    style={{
                        background: "conic-gradient(from 0deg, #fde68a, #d97706, #fbbf24, #f59e0b, #fde68a)"
                    }}
                ></div>
            </div>

            {/* Floating drifting blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="blob-1 absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.08] blur-[140px]"></div>
                <div className="blob-2 absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.09] blur-[150px]"></div>
                <div className="blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-[#f59e0b] rounded-full opacity-[0.06] blur-[130px]"></div>
            </div>

            {/* Tech Layout Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] opacity-70 pointer-events-none z-0"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Brand Logo Header */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                        <span className="text-[#0b0c0e] font-black text-base">R</span>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white">Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fde68a] to-[#d97706]">AI</span></span>
                </div>

                {/* Glassmorphic Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="glass-card bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.04] via-transparent to-transparent pointer-events-none"></div>

                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white text-center mb-1 relative z-10">Welcome Back</h2>
                    <p className="text-xs text-gray-500 text-center mb-6 font-medium relative z-10">Log in to manage your premium workspaces</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2 relative z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">Email Address</label>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@domain.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">Security Token / Password</label>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 text-sm text-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-shine relative overflow-hidden w-full mt-6 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black py-3 rounded-xl text-sm shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.45)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none z-10"
                    >
                        <span className="relative z-10">{loading ? "Verifying Credentials..." : "Authenticate Session"}</span>
                    </button>

                    <p className="mt-6 text-xs text-center text-gray-400 font-medium relative z-10">
                        Don't have an instance account yet?{" "}
                        <Link to="/register" className="text-[#fbbf24] hover:underline font-bold">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;