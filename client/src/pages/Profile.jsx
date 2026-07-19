import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    FileText,
    ShieldCheck,
    Lock,
    Eye,
    EyeOff,
    Sparkles,
    LayoutTemplate,
    LayoutDashboard,
    LogOut,
    AlertTriangle,
    X,
} from "lucide-react";

import {
    GetProfile,
    LogoutUser,
    ResetProfileState,
    UpdatePassword,
} from "../redux/profile/profileSlice";

import { GetAllResume } from "../redux/resume/resumeSlice";

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.profile);
    const { resumes } = useSelector((state) => state.resume);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        // dispatch(GetProfile());
        dispatch(GetAllResume());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.currentPassword.trim()) {
            return toast.error("Current password is required.");
        }

        if (formData.newPassword.length < 6) {
            return toast.error(
                "Password must be at least 6 characters."
            );
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        const result = await dispatch(
            UpdatePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            })
        );

        if (UpdatePassword.fulfilled.match(result)) {

            toast.success("Password updated successfully.");

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            dispatch(ResetProfileState());

        } else {

            toast.error(
                result.payload || "Failed to update password."
            );

        }

    };

    const handleLogout = async () => {

        const result = await dispatch(LogoutUser());

        if (LogoutUser.fulfilled.match(result)) {

            toast.success("Logged out successfully.");

            navigate("/login");

        } else {

            toast.error(result.payload || "Logout failed.");

        }

    };

    // Simple password strength scorer (0-4)
    const getPasswordStrength = (pwd) => {

        if (!pwd) return 0;

        let score = 0;

        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        return score;
    };

    const strength = getPasswordStrength(formData.newPassword);

    const strengthConfig = [
        { label: "", color: "bg-white/10" },
        { label: "Weak", color: "bg-red-500" },
        { label: "Fair", color: "bg-orange-500" },
        { label: "Good", color: "bg-[#fbbf24]" },
        { label: "Strong", color: "bg-emerald-500" },
    ];

    const inputClass =
        "w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-11 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner";

    const labelClass =
        "block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1";

    return (
        <div className="min-h-screen bg-[#07080a] text-[#e4e6eb] font-sans relative overflow-hidden selection:bg-[#fbbf24] selection:text-[#0b0c0e]">

            {/* Ambient Background Glow Layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-[#fbbf24] rounded-full opacity-[0.06] blur-[140px]"></div>
                <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] bg-[#d97706] rounded-full opacity-[0.08] blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-1/3 w-[28rem] h-[28rem] bg-[#f59e0b] rounded-full opacity-[0.05] blur-[130px]"></div>
            </div>

            {/* Tech Layout Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8">

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] p-[2px] shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                            <div className="w-full h-full bg-[#0d0e12] rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
                                {user?.name ? user.name[0].toUpperCase() : "U"}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                                {user?.name || "My Profile"}
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm font-medium">
                                Manage your account and security.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    >
                        <LayoutDashboard className="w-4 h-4" strokeWidth={2} />
                        Dashboard
                    </button>

                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">

                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-4 sm:p-5">
                        <div className="w-9 h-9 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-3">
                            <FileText className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <p className="text-2xl font-black text-white">{resumes?.length || 0}</p>
                        <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">Total Resumes</p>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-4 sm:p-5">
                        <div className="w-9 h-9 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-3">
                            <ShieldCheck className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <p className="text-2xl font-black text-white">Active</p>
                        <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">Account Status</p>
                    </div>

                    <div className="col-span-2 sm:col-span-1 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-4 sm:p-5">
                        <div className="w-9 h-9 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-3">
                            <Sparkles className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <p className="text-2xl font-black text-white">Pro</p>
                        <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">Member Type</p>
                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Account Info */}
                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-lg font-black tracking-tight text-white mb-5">
                                Account Information
                            </h2>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3">
                                    <User className="w-4 h-4 text-[#fbbf24]/60 shrink-0" strokeWidth={1.5} />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Name</p>
                                        <p className="font-semibold text-sm text-gray-200 truncate">{user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3">
                                    <Mail className="w-4 h-4 text-[#fbbf24]/60 shrink-0" strokeWidth={1.5} />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Email</p>
                                        <p className="font-semibold text-sm text-gray-200 truncate">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3">
                                    <FileText className="w-4 h-4 text-[#fbbf24]/60 shrink-0" strokeWidth={1.5} />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Total Resumes</p>
                                        <p className="font-semibold text-sm text-gray-200">{resumes?.length || 0}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-lg font-black tracking-tight text-white mb-5">
                                Change Password
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                <div>
                                    <label className={labelClass}>Current Password</label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type={showCurrent ? "text" : "password"}
                                            name="currentPassword"
                                            placeholder="Enter current password"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            {showCurrent ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>New Password</label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type={showNew ? "text" : "password"}
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            {showNew ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                        </button>
                                    </div>

                                    {formData.newPassword && (
                                        <div className="mt-2.5 px-1">
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-all ${
                                                            i <= strength ? strengthConfig[strength].color : "bg-white/10"
                                                        }`}
                                                    ></div>
                                                ))}
                                            </div>
                                            <p className="text-[11px] font-semibold text-gray-500 mt-1.5">
                                                {strengthConfig[strength].label && `Strength: ${strengthConfig[strength].label}`}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Re-enter new password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            {showConfirm ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black rounded-xl py-3.5 text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </button>

                            </form>
                        </div>
                    </div>

                </div>

                {/* Quick Actions */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-6 mt-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-lg font-black tracking-tight text-white mb-5">
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => navigate("/builder")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-5 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                            >
                                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                                Create Resume
                            </button>

                            <button
                                onClick={() => navigate("/templates")}
                                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                <LayoutTemplate className="w-4 h-4" strokeWidth={2} />
                                Templates
                            </button>

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                <LayoutDashboard className="w-4 h-4" strokeWidth={2} />
                                Dashboard
                            </button>

                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/[0.04] backdrop-blur-3xl border border-red-500/20 rounded-2xl p-5 sm:p-6 mt-6 relative overflow-hidden">

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                                <AlertTriangle className="w-5 h-5" strokeWidth={1.75} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black tracking-tight text-red-400">
                                    Danger Zone
                                </h2>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    Signing out will end your current session on this device.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="shrink-0 inline-flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                        >
                            <LogOut className="w-4 h-4" strokeWidth={2} />
                            Logout
                        </button>
                    </div>
                </div>

            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        onClick={() => setShowLogoutModal(false)}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    ></div>

                    <div className="relative z-10 w-full max-w-sm bg-[#0d0e12] border border-white/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                            <LogOut className="w-5 h-5" strokeWidth={1.75} />
                        </div>

                        <h3 className="text-lg font-black text-white tracking-tight">
                            Log out of your account?
                        </h3>
                        <p className="text-sm text-gray-400 font-medium mt-2 leading-relaxed">
                            You'll need to sign in again to access your dashboard and resumes.
                        </p>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowLogoutModal(false);
                                    handleLogout();
                                }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                Logout
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );

};

export default Profile;