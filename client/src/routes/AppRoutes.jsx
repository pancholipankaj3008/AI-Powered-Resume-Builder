import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ResumeEditor from "../pages/ResumeEditor";
import ResumePreview from "../pages/ResumePreview";
import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import ResumeBuilder from "../pages/ResumeBuilder";


import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Home />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/builder"
                    element={
                        <ProtectedRoute>
                            <ResumeBuilder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeEditor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pdf-preview/:id"
                    element={<ResumePreview />}
                />

                <Route
                    path="/preview/:id"
                    element={
                        <ProtectedRoute>
                            <ResumePreview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/templates"
                    element={
                        <ProtectedRoute>
                            <Templates />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;