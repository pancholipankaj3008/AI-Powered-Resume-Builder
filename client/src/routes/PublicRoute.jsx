import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const PublicRoute = ({ children }) => {

    const { loading, isAuthenticated } = useSelector(
        (state) => state.profile
    );

    if (loading) {
        return <Loader text="Loading..." />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
