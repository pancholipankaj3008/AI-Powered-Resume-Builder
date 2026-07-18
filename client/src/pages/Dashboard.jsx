import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { GetAllResume } from "../redux/resume/resumeSlice";
import { LogoutUser } from "../redux/profile/profileSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.profile);
    const { resumes, loading } = useSelector((state) => state.resume);

    useEffect(() => {
        dispatch(GetAllResume());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate("/login");
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">

    <div className="flex justify-between items-start">

        <div>

            <h1 className="text-4xl font-bold">
                Welcome back, {user?.name} 👋
            </h1>

            <p className="mt-3 text-blue-100 text-lg max-w-xl">
                Build a professional ATS-friendly resume with AI assistance.
                Create, edit and download your resumes in just a few minutes.
            </p>

            <Link
                to="/builder"
                className="inline-block mt-6 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
                + Create New Resume
            </Link>

        </div>

        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
            Logout
        </button>

    </div>

</div>

            

            <h2 className="text-2xl font-bold mb-6">
    Recent Resumes
</h2>

            {loading ? (
                <p>Loading...</p>
            ) : resumes.length === 0 ? (
                <p>No Resume Found.</p>
            ) : (
                <div className="space-y-4">

                    {resumes.map((resume) => (

                        <div
                            key={resume._id}
                            className="border rounded p-4 flex justify-between items-center"
                        >
                            <div>

                                <h3 className="font-semibold">
                                    {resume.title}
                                </h3>

                                <p>{resume.profession}</p>

                            </div>

                            <div className="flex gap-3">

                                <Link
                                    to={`/resume/${resume._id}`}
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </Link>

                                <Link
                                    to={`/preview/${resume._id}`}
                                    className="bg-gray-700 text-white px-3 py-1 rounded"
                                >
                                    Preview
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default Dashboard;