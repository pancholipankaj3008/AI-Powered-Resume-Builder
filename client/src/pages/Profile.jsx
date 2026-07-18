import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    LogoutUser,
    UpdatePassword,
} from "../redux/profile/profileSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(UpdatePassword(formData));

        setFormData({
            oldPassword: "",
            newPassword: "",
        });
    };

    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate("/login");
    };

    return (
        <div className="max-w-xl mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <div className="mb-6">

                <p>
                    <strong>Name:</strong> {user?.name}
                </p>

                <p>
                    <strong>Email:</strong> {user?.email}
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <h2 className="text-xl font-semibold">
                    Update Password
                </h2>

                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>

            </form>

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
};

export default Profile;