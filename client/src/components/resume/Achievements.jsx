import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GenerateHighlights,
    ResetAIState,
} from "../../redux/ai/aiSlice";


const Achievements = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

const {
    loading,
    highlights,
} = useSelector((state) => state.ai);

    const handleChange = (index, value) => {

        const updatedAchievements = [...formData.achievements];
        updatedAchievements[index] = value;

        setFormData((prev) => ({
            ...prev,
            achievements: updatedAchievements,
        }));
    };

    const addAchievement = () => {

        setFormData((prev) => ({
            ...prev,
            achievements: [...prev.achievements, ""],
        }));
    };

    const removeAchievement = (index) => {

        const updatedAchievements = formData.achievements.filter(
            (_, i) => i !== index
        );

        setFormData((prev) => ({
            ...prev,
            achievements: updatedAchievements,
        }));
    };


    useEffect(() => {

    if (highlights.length > 0) {

        setFormData((prev) => ({
            ...prev,
            achievements: highlights,
        }));

        dispatch(ResetAIState());

    }

}, [
    highlights,
    dispatch,
    setFormData,
]);

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

    <h2 className="text-xl font-semibold">
        Key Highlights
    </h2>

    <div className="flex gap-2">

        <button
            type="button"
            disabled={loading}
            onClick={() =>
                dispatch(
                    GenerateHighlights({

                        profession: formData.profession,

                        summary: formData.summary,

                        skills: formData.skills.join(", "),

                        experience: formData.experience
                            .map(
                                (exp) =>
                                    `${exp.position} at ${exp.company}. ${exp.description.join(", ")}`
                            )
                            .join("\n"),

                        projects: formData.projects
                            .map(
                                (project) =>
                                    `${project.title}. ${project.description.join(", ")}`
                            )
                            .join("\n"),

                    })
                )
            }
            className="bg-purple-600 text-white px-4 py-2 rounded"
        >
            {loading
                ? "Generating..."
                : "✨ Generate AI Highlights"}
        </button>

        <button
            type="button"
            onClick={addAchievement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            + Add Highlight
        </button>

    </div>

</div>

            {formData.achievements.map((achievement, index) => (

                <div
                    key={index}
                    className="flex gap-3 items-start"
                >

                    <textarea
                        rows={2}
                        placeholder="e.g. Built AI Resume Builder using MERN Stack"
                        value={achievement}
                        onChange={(e) =>
                            handleChange(index, e.target.value)
                        }
                        className="flex-1 border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {formData.achievements.length > 1 && (

                        <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                            Remove
                        </button>

                    )}

                </div>

            ))}

        </div>

    );
};

export default Achievements;