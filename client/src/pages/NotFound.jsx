import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-6xl font-bold text-red-500">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-600 mt-2">
                The page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
            >
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;