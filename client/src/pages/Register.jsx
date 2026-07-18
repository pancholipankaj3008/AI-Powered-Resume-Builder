import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RegisterUser, ResetAuthState } from "../redux/auth/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
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
        dispatch(RegisterUser(formData));
    };

    useEffect(() => {
        if (success) {
            dispatch(ResetAuthState());
            navigate("/login");
        }
    }, [success, dispatch, navigate]);

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Register</h2>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },

    form: {
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    input: {
        padding: "10px",
        fontSize: "16px",
    },

    button: {
        padding: "10px",
        cursor: "pointer",
    },
};

export default Register;