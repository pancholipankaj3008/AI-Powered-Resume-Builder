import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children }) => {

    const { loading, isAuthenticated } = useSelector(
        (state) => state.profile
    );

    if (loading) {
        return <Loader text="Loading Profile..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;