import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
    FolderGit2,
    ExternalLink,
    Sparkles,
    Loader2,
    Plus,
    Trash2,
    X,
} from "lucide-react";

const GithubIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
);

import {
    GenerateProject,
    ResetAIState,
} from "../../redux/ai/aiSlice";


const Projects = ({ formData, setFormData }) => {

    const dispatch = useDispatch();

    const {
        loading,
        project: aiProject,
        error,
    } = useSelector((state) => state.ai);

    const [tech, setTech] = useState({});
    const [bullet, setBullet] = useState({});
    const [generatingIndex, setGeneratingIndex] = useState(null);

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

    const handleGenerate = (index, proj) => {
        setGeneratingIndex(index);
        dispatch(
            GenerateProject({
                index,
                title: proj.title,
                techStack: proj.techStack.join(", "),
            })
        );
    };

    useEffect(() => {

        if (
            aiProject &&
            aiProject.index !== null &&
            aiProject.bullets.length > 0
        ) {

            setFormData((prev) => {

                const updatedProjects = [...prev.projects];

                updatedProjects[aiProject.index] = {
                    ...updatedProjects[aiProject.index],
                    description: aiProject.bullets,
                };

                return {
                    ...prev,
                    projects: updatedProjects,
                };

            });

            toast.success("Description generated!");
            setGeneratingIndex(null);
            dispatch(ResetAIState());

        }

    }, [aiProject, dispatch, setFormData]);

    useEffect(() => {

        if (error) {
            toast.error(error);
            setGeneratingIndex(null);
            dispatch(ResetAIState());
        }

    }, [error, dispatch]);

    const inputClass =
        "w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner";

    const labelClass =
        "block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1";

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        Projects
                    </h2>

                    <button
                        type="button"
                        onClick={addProject}
                        className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Project
                    </button>
                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    Showcase the work that best represents your skills.
                </p>

                {(formData?.projects || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No projects added yet.</p>
                    </div>
                )}

                <div className="space-y-5">
                    {(formData?.projects || []).map((proj, index) => (

                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                title="Remove this project"
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">

                                <div className="md:col-span-2">
                                    <label className={labelClass}>Project Title</label>
                                    <div className="relative">
                                        <FolderGit2 className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Resume Builder AI"
                                            value={proj.title}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>GitHub URL</label>
                                    <div className="relative">
                                        <GithubIcon
    className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2"
/>
                                        <input
                                            type="url"
                                            name="github"
                                            placeholder="github.com/username/repo"
                                            value={proj.github}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Live Demo URL</label>
                                    <div className="relative">
                                        <ExternalLink className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="url"
                                            name="liveDemo"
                                            placeholder="project.vercel.app"
                                            value={proj.liveDemo}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="mt-5">

                                <h3 className={labelClass}>Tech Stack</h3>

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
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTech(index);
                                            }
                                        }}
                                        className="flex-1 bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => addTech(index)}
                                        className="shrink-0 inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 rounded-xl text-sm font-bold transition-all"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                                        Add
                                    </button>

                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">

                                    {(proj.techStack || []).map((item, techIndex) => (

                                        <span
                                            key={techIndex}
                                            className="inline-flex items-center gap-1.5 bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20 px-3 py-1 rounded-lg text-xs font-bold"
                                        >
                                            {item}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTech(index, techIndex)
                                                }
                                                className="hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-3 h-3" strokeWidth={3} />
                                            </button>
                                        </span>

                                    ))}

                                </div>

                            </div>

                            <div className="mt-5">

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">

                                    <h3 className={labelClass}>Description</h3>

                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleGenerate(index, proj)}
                                        className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-4 py-2 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                                    >
                                        {loading && generatingIndex === index ? (
                                            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                                        ) : (
                                            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                                        )}
                                        {loading && generatingIndex === index ? "Generating..." : "Generate AI Description"}
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
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addBullet(index);
                                            }
                                        }}
                                        className="flex-1 bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => addBullet(index)}
                                        className="shrink-0 inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 rounded-xl text-sm font-bold transition-all"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                                        Add
                                    </button>

                                </div>

                                <ul className="mt-3 space-y-2">

                                    {(proj.description || []).map((item, bulletIndex) => (

                                        <li
                                            key={bulletIndex}
                                            className="flex justify-between items-start gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5"
                                        >
                                            <span className="text-sm text-gray-300 flex gap-2">
                                                <span className="text-[#fbbf24] shrink-0">•</span>
                                                {item}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeBullet(index, bulletIndex)
                                                }
                                                title="Remove"
                                                className="shrink-0 p-1 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
                                            >
                                                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </button>

                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
};

export default Projects;