import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    GenerateExperience,
    ResetAIState,
} from "../../redux/ai/aiSlice";

const Experience = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

    const { loading, experience, error } = useSelector(
        (state) => state.ai
    );

    const [bullet, setBullet] = useState({});

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            const updatedExperience = [...prev.experience];

            updatedExperience[index] = {
                ...updatedExperience[index],
                [name]: type === "checkbox" ? checked : value,
            };

            return {
                ...prev,
                experience: updatedExperience,
            };
        });
    };

    const addExperience = () => {
        setFormData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    company: "",
                    position: "",
                    employmentType: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    description: [],
                },
            ],
        }));
    };

    const removeExperience = (index) => {
        setFormData((prev) => ({
            ...prev,
            experience: prev.experience.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const addBullet = (index) => {

        const text = bullet[index]?.trim();

        if (!text) return;

        setFormData((prev) => {

            const updatedExperience = [...prev.experience];

            updatedExperience[index] = {
                ...updatedExperience[index],
                description: [
                    ...updatedExperience[index].description,
                    text,
                ],
            };

            return {
                ...prev,
                experience: updatedExperience,
            };

        });

        setBullet((prev) => ({
            ...prev,
            [index]: "",
        }));

    };

    const removeBullet = (expIndex, bulletIndex) => {

        setFormData((prev) => {

            const updatedExperience = [...prev.experience];

            updatedExperience[expIndex] = {
                ...updatedExperience[expIndex],
                description:
                    updatedExperience[
                        expIndex
                    ].description.filter(
                        (_, i) => i !== bulletIndex
                    ),
            };

            return {
                ...prev,
                experience: updatedExperience,
            };

        });

    };

    useEffect(() => {

        if (
            experience &&
            experience.index !== null &&
            experience.bullets.length
        ) {

            setFormData((prev) => {

                const updatedExperience = [...prev.experience];

                updatedExperience[
                    experience.index
                ] = {
                    ...updatedExperience[
                        experience.index
                    ],
                    description:
                        experience.bullets,
                };

                return {
                    ...prev,
                    experience:
                        updatedExperience,
                };

            });

            dispatch(ResetAIState());

        }

    }, [experience, dispatch, setFormData]);

    useEffect(() => {

        if (error) {

            alert(error);

            dispatch(ResetAIState());

        }

    }, [error, dispatch]);


        return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold">
                    Experience
                </h2>

                <button
                    type="button"
                    onClick={addExperience}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Experience
                </button>

            </div>

            {(formData.experience || []).map((exp, index) => (

                <div
                    key={index}
                    className="border rounded-lg p-5 mb-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={exp.company || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={exp.position || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="employmentType"
                            placeholder="Employment Type"
                            value={exp.employmentType || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={exp.location || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="date"
                            name="startDate"
                            value={
                                exp.startDate
                                    ? exp.startDate.slice(0, 10)
                                    : ""
                            }
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="date"
                            name="endDate"
                            value={
                                exp.endDate
                                    ? exp.endDate.slice(0, 10)
                                    : ""
                            }
                            disabled={exp.currentlyWorking}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                    </div>

                    <label className="flex items-center gap-2 mt-4">

                        <input
                            type="checkbox"
                            name="currentlyWorking"
                            checked={exp.currentlyWorking}
                            onChange={(e) => handleChange(index, e)}
                        />

                        Currently Working Here

                    </label>

                    <div className="mt-5">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                dispatch(
                                    GenerateExperience({
                                        index,
                                        profession: formData.profession,
                                        company: exp.company,
                                        position: exp.position,
                                        technologies:
                                            formData.skills.join(", "),
                                    })
                                )
                            }
                            className="px-4 py-2 bg-violet-600 text-white rounded disabled:opacity-50"
                        >
                            {loading
                                ? "Generating..."
                                : "✨ Generate AI Responsibilities"}
                        </button>

                    </div>

                    <div className="mt-5">

                        <h3 className="font-semibold mb-2">
                            Responsibilities
                        </h3>

                        <div className="flex gap-2">

                            <input
                                type="text"
                                placeholder="Write a responsibility..."
                                value={bullet[index] || ""}
                                onChange={(e) =>
                                    setBullet((prev) => ({
                                        ...prev,
                                        [index]: e.target.value,
                                    }))
                                }
                                className="flex-1 border rounded p-2"
                            />

                            <button
                                type="button"
                                onClick={() => addBullet(index)}
                                className="bg-green-600 text-white px-4 rounded"
                            >
                                Add
                            </button>

                        </div>

                        <ul className="mt-4 space-y-2">

                            {(exp.description || []).map(
                                (item, bulletIndex) => (

                                    <li
                                        key={bulletIndex}
                                        className="flex justify-between items-center border rounded p-2"
                                    >

                                        <span>
                                            • {item}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeBullet(
                                                    index,
                                                    bulletIndex
                                                )
                                            }
                                            className="text-red-600"
                                        >
                                            Remove
                                        </button>

                                    </li>

                                )
                            )}

                        </ul>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            removeExperience(index)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded mt-5"
                    >
                        Remove Experience
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Experience;