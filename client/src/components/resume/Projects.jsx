import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GenerateProject,
    ResetAIState,
} from "../../redux/ai/aiSlice";


const Projects = ({ formData, setFormData }) => {


    const dispatch = useDispatch();

const {
    loading,
    project,
} = useSelector((state) => state.ai);

// console.log("Projects props:", formData);
    const [tech, setTech] = useState({});
    const [bullet, setBullet] = useState({});

    const handleChange = (index, e) => {

        const { name, value } = e.target;

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            updatedProjects[index] = {
                ...updatedProjects[index],
                [name]: value,
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    const addProject = () => {

        setFormData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    title: "",
                    techStack: [],
                    github: "",
                    liveDemo: "",
                    description: [],
                },
            ],
        }));
    };

    const removeProject = (index) => {

        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    const addTech = (index) => {

        const value = tech[index]?.trim();

        if (!value) return;

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            if (
                !updatedProjects[index].techStack.some(
                    (item) => item.toLowerCase() === value.toLowerCase()
                )
            ) {
                updatedProjects[index] = {
                    ...updatedProjects[index],
                    techStack: [
                        ...updatedProjects[index].techStack,
                        value,
                    ],
                };
            }

            return {
                ...prev,
                projects: updatedProjects,
            };
        });

        setTech((prev) => ({
            ...prev,
            [index]: "",
        }));
    };

    const removeTech = (projectIndex, techIndex) => {

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            updatedProjects[projectIndex] = {
                ...updatedProjects[projectIndex],
                techStack: updatedProjects[
                    projectIndex
                ].techStack.filter((_, i) => i !== techIndex),
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };

    const addBullet = (index) => {

        const value = bullet[index]?.trim();

        if (!value) return;

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            updatedProjects[index] = {
                ...updatedProjects[index],
                description: [
                    ...updatedProjects[index].description,
                    value,
                ],
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });

        setBullet((prev) => ({
            ...prev,
            [index]: "",
        }));
    };

    const removeBullet = (projectIndex, bulletIndex) => {

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            updatedProjects[projectIndex] = {
                ...updatedProjects[projectIndex],
                description: updatedProjects[
                    projectIndex
                ].description.filter((_, i) => i !== bulletIndex),
            };

            return {
                ...prev,
                projects: updatedProjects,
            };
        });
    };


    useEffect(() => {

    if (
        project &&
        project.index !== null &&
        project.bullets.length > 0
    ) {

        setFormData((prev) => {

            const updatedProjects = [...prev.projects];

            updatedProjects[project.index] = {
                ...updatedProjects[project.index],
                description: project.bullets,
            };

            return {
                ...prev,
                projects: updatedProjects,
            };

        });

        dispatch(ResetAIState());

    }

}, [
    project,
    dispatch,
    setFormData,
]);

    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold">
                    Projects
                </h2>

                <button
                    type="button"
                    onClick={addProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Project
                </button>

            </div>

            {(formData?.projects || []).map((project, index) => (

                <div
                    key={index}
                    className="border rounded-lg p-5 mb-5"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="url"
                            name="github"
                            placeholder="GitHub URL"
                            value={project.github}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="url"
                            name="liveDemo"
                            placeholder="Live Demo URL"
                            value={project.liveDemo}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2 md:col-span-2"
                        />

                    </div>

                    <div className="mt-5">

                        <h3 className="font-semibold mb-2">
                            Tech Stack
                        </h3>

                        <div className="flex gap-2">

                            <input
                                type="text"
                                placeholder="React"
                                value={tech[index] || ""}
                                onChange={(e) =>
                                    setTech((prev) => ({
                                        ...prev,
                                        [index]: e.target.value,
                                    }))
                                }
                                className="flex-1 border rounded p-2"
                            />

                            <button
                                type="button"
                                onClick={() => addTech(index)}
                                className="bg-blue-600 text-white px-4 rounded"
                            >
                                Add
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">

                            {(project.techStack || []).map((item, techIndex) => (

                                <span
                                    key={techIndex}
                                    className="bg-blue-100 px-3 py-1 rounded flex items-center gap-2"
                                >
                                    {item}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTech(index, techIndex)
                                        }
                                        className="text-red-600"
                                    >
                                        ×
                                    </button>
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="mt-5">

                        <div className="flex justify-between items-center mb-2">

    <h3 className="font-semibold">
        Description
    </h3>

    <button
        type="button"
        disabled={loading}
        onClick={() =>
            dispatch(
                GenerateProject({
                    index,
                    title: project.title,
                    techStack: project.techStack.join(", "),
                })
            )
        }
        className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
    >
        {loading
            ? "Generating..."
            : "✨ Generate AI Description"}
    </button>

</div>

                        <div className="flex gap-2">

                            <input
                                type="text"
                                placeholder="Built REST APIs..."
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

                        <ul className="mt-3 space-y-2">

                            {(project.description || []).map((item, bulletIndex) => (

                                <li
                                    key={bulletIndex}
                                    className="flex justify-between items-center border rounded p-2"
                                >
                                    <span>• {item}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeBullet(index, bulletIndex)
                                        }
                                        className="text-red-600"
                                    >
                                        Remove
                                    </button>

                                </li>

                            ))}

                        </ul>

                    </div>

                    <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-5"
                    >
                        Remove Project
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Projects;