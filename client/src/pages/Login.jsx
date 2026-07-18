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
      <div className="min-h-screen flex items-center justify-center">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm p-6 border rounded-lg shadow"
  >
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

    {error && (
      <p className="text-red-500 text-sm mb-2">{error}</p>
    )}

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border p-2 rounded mb-3"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border p-2 rounded mb-3"
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded"
    >
      {loading ? "Logging In..." : "Login"}
    </button>
  </form>
</div>
    );
};


export default Login;