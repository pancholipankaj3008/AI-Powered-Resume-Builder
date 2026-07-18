import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {

    const { loading, isAuthenticated } = useSelector(
        (state) => state.profile
    );

    if (loading) {
        return <h2 className="text-center mt-10">Loading...</h2>;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;