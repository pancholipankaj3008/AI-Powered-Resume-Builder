import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">

            <h1 className="text-4xl font-bold">
                AI Resume Builder
            </h1>

            <p className="text-gray-600">
                Build professional resumes with AI.
            </p>

            <div className="flex gap-4">

                <Link
                    to="/login"
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="bg-green-600 text-white px-5 py-2 rounded"
                >
                    Register
                </Link>

            </div>

        </div>
    );
};

export default Home;