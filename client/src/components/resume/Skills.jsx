import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GenerateSkills,
    ResetAIState,
} from "../../redux/ai/aiSlice";

const Skills = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

const {
    loading,
    skills: aiSkills,
} = useSelector((state) => state.ai);

    const [skill, setSkill] = useState("");

    const addSkill = () => {

        const value = skill.trim();

        if (!value) return;

        if (
            (formData.skills || []).some(
                (item) => item.toLowerCase() === value.toLowerCase()
            )
        ) {
            setSkill("");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, value],
        }));

        setSkill("");
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const removeSkill = (index) => {

        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {

    if (aiSkills.length > 0) {

        setFormData((prev) => {

            const mergedSkills = [
                ...new Set([
                    ...prev.skills,
                    ...aiSkills,
                ]),
            ];

            return {
                ...prev,
                skills: mergedSkills,
            };

        });

        dispatch(ResetAIState());

    }

}, [
    aiSkills,
    dispatch,
    setFormData,
]);

    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-semibold">
        Skills
    </h2>

    <button
        type="button"
        disabled={loading}
        onClick={() =>
            dispatch(
                GenerateSkills({
                    profession: formData.profession,
                })
            )
        }
        className="bg-purple-600 text-white px-4 py-2 rounded"
    >
        {loading
            ? "Generating..."
            : "✨ Suggest AI Skills"}
    </button>

</div>

            <div className="flex gap-2">

                <input
                    type="text"
                    placeholder="Type a skill..."
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border rounded p-2"
                />

                <button
                    type="button"
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Add
                </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

                {(formData.skills || []).map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded"
                    >

                        <span>{item}</span>

                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-600 font-bold"
                        >
                            ×
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Skills;