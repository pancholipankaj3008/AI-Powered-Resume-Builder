import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
    GenerateSummary,
    ResetAIState,
} from "../../redux/ai/aiSlice";



const Summary = ({ formData, setFormData }) => {


    const dispatch = useDispatch();

    const { loading, summary, error } = useSelector(
    (state) => state.ai
);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            summary: e.target.value,
        });
    };


    const handleGenerate = () => {
        dispatch(
            GenerateSummary({
                profession: formData.profession,
                skills: formData.skills,
                experience: formData.experience
                    .map(
                        (exp) =>
                            `${exp.position} at ${exp.company}. ${exp.description.join(", ")}`
                    )
                    .join("\n"),
            })
        );
    };


    useEffect(() => {

        if (summary) {

            setFormData((prev) => ({
                ...prev,
                summary,
            }));

            dispatch(ResetAIState());

        }

    }, [summary, dispatch, setFormData]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(ResetAIState());
        }
    }, [error, dispatch]);

    return (
        <div className="space-y-3">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Professional Summary
                </h2>

                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-4 py-2 bg-violet-600 text-white rounded disabled:opacity-50"
                >
                    {loading ? "Generating..." : "✨ Generate AI Summary"}
                </button>

            </div>

            <textarea
                rows={5}
                value={formData.summary}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Write a short professional summary..."
            />

        </div>
    );
};

export default Summary;