const Minimal = ({ resume }) => {

    const {
        personalInfo,
        summary,
        education,
        experience,
        projects,
        skills,
        certifications,
        languages,
    } = resume;

    const formatMonthYear = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };


    const hasExperience = experience?.some(
    (exp) =>
        exp.company?.trim() ||
        exp.position?.trim() ||
        exp.location?.trim() ||
        exp.description?.some((item) => item.trim()) ||
        exp.startDate ||
        exp.endDate
);

const hasProjects = projects?.some(
    (project) =>
        project.title?.trim() ||
        project.techStack?.length > 0 ||
        project.description?.some((item) => item.trim()) ||
        project.github?.trim() ||
        project.liveDemo?.trim()
);

const hasEducation = education?.some(
    (edu) =>
        edu.school?.trim() ||
        edu.degree?.trim() ||
        edu.fieldOfStudy?.trim() ||
        edu.grade?.trim() ||
        edu.description?.trim() ||
        edu.startDate ||
        edu.endDate
);

const hasSkills = skills?.some((skill) => skill.trim());

const hasCertifications = certifications?.some(
    (cert) =>
        cert.title?.trim() ||
        cert.issuer?.trim() ||
        cert.issueDate
);

const hasLanguages = languages?.some(
    (lang) =>
        lang.language?.trim() ||
        lang.proficiency?.trim()
);

const hasHighlights = resume.achievements?.some(
    (item) => item.trim()
);

const hasSummary = summary?.trim();


    const withProtocol = (url) =>
        /^https?:\/\//i.test(url) ? url : `https://${url}`;

    return (
        <div className="max-w-3xl mx-auto bg-white text-neutral-900 px-10 py-14 font-sans">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-light tracking-tight text-neutral-900">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>

                <p className="text-[15px] text-neutral-500 mt-1">
                    {resume.profession}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[13px] text-neutral-500">

                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}

                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <span>
                            {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                .filter(Boolean)
                                .join(", ")}
                        </span>
                    )}

                    {personalInfo?.linkedin && (
                        <a href={withProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">
                            LinkedIn
                        </a>
                    )}

                    {personalInfo?.github && (
                        <a href={withProtocol(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">
                            Github
                        </a>
                    )}

                    {personalInfo?.portfolio && (
                        <a href={withProtocol(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">
                            Portfolio
                        </a>
                    )}

                    {personalInfo?.website && (
                        <a href={withProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">
                            Website
                        </a>
                    )}

                </div>

            </div>

            {/* Summary */}

            {hasSummary && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                        Summary
                    </h2>

                    <p className="text-[15px] text-neutral-800 leading-relaxed">
                        {summary}
                    </p>

                </section>

            )}

            {/* Experience */}

            {hasExperience> 0 && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                        Experience
                    </h2>

                    {experience.map((exp, index) => (

                        <div key={index} className="mb-6 last:mb-0">

                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">

                                <h3 className="font-medium text-[15px] text-neutral-900">
                                    {exp.position}
                                    <span className="text-neutral-500 font-normal"> · {exp.company}</span>
                                </h3>

                                <span className="text-[13px] text-neutral-400 whitespace-nowrap">
                                    {formatMonthYear(exp.startDate)}
                                    {" – "}
                                    {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                </span>

                            </div>

                            {exp.location && (
                                <p className="text-[13px] text-neutral-400">{exp.location}</p>
                            )}

                            <ul className="mt-2 space-y-1.5 text-[14px] text-neutral-700">

                                {(exp.description || []).map((item, i) => (
                                    <li key={i} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-neutral-300">
                                        {item}
                                    </li>
                                ))}

                            </ul>

                        </div>

                    ))}

                </section>

            )}

            {/* Projects */}

            {hasProjects&& (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                        Projects
                    </h2>

                    {projects.map((project, index) => (

                        <div key={index} className="mb-6 last:mb-0">

                            {project.github || project.liveDemo ? (
                                <a
                                    href={withProtocol(project.github || project.liveDemo)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-[15px] text-neutral-900 underline underline-offset-2"
                                >
                                    {project.title}
                                </a>
                            ) : (
                                <h3 className="font-medium text-[15px] text-neutral-900">
                                    {project.title}
                                </h3>
                            )}

                            {(project.techStack || []).length > 0 && (
                                <p className="text-[13px] text-neutral-400 mt-0.5">
                                    {project.techStack.join(" · ")}
                                </p>
                            )}

                            <ul className="mt-2 space-y-1.5 text-[14px] text-neutral-700">

                                {(project.description || []).map((item, i) => (
                                    <li key={i} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-neutral-300">
                                        {item}
                                    </li>
                                ))}

                            </ul>

                            {(project.github || project.liveDemo) && (
                                <p className="text-[13px] mt-1 space-x-3">
                                    {project.github && (
                                        <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">GitHub</a>
                                    )}
                                    {project.liveDemo && (
                                        <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-2">Live Demo</a>
                                    )}
                                </p>
                            )}

                        </div>

                    ))}

                </section>

            )}

            {/* Education */}

            {hasEducation&& (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                        Education
                    </h2>

                    {education.map((edu, index) => (

                        <div key={index} className="mb-5 last:mb-0">

                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">

                                <h3 className="font-medium text-[15px] text-neutral-900">
                                    {edu.degree}{edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                                </h3>

                                <span className="text-[13px] text-neutral-400 whitespace-nowrap">
                                    {formatMonthYear(edu.startDate)}
                                    {" – "}
                                    {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                </span>

                            </div>

                            <p className="text-[14px] text-neutral-500">{edu.school}</p>

                            {edu.grade && <p className="text-[13px] text-neutral-400">Grade: {edu.grade}</p>}
                            {edu.description && <p className="text-[14px] text-neutral-700 mt-1">{edu.description}</p>}

                        </div>

                    ))}

                </section>

            )}

            {/* Skills */}

            {hasSkills && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                        Skills
                    </h2>

                    <p className="text-[14px] text-neutral-700">
                        {skills.join("  ·  ")}
                    </p>

                </section>

            )}

            {/* Certifications */}

            {hasCertifications && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                        Certifications
                    </h2>

                    {certifications.map((cert, index) => (

                        <div key={index} className="mb-3 last:mb-0 flex justify-between flex-wrap gap-x-3">

                            <div>
                                <p className="text-[14px] text-neutral-900 font-medium">{cert.title}</p>
                                <p className="text-[13px] text-neutral-500">{cert.issuer}</p>
                            </div>

                            {cert.issueDate && (
                                <span className="text-[13px] text-neutral-400">{formatMonthYear(cert.issueDate)}</span>
                            )}

                        </div>

                    ))}

                </section>

            )}

            {/* Languages */}

            {hasLanguages && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                        Languages
                    </h2>

                    <p className="text-[14px] text-neutral-700">
                        {languages.map((lang) => `${lang.language} (${lang.proficiency})`).join("  ·  ")}
                    </p>

                </section>

            )}

            {/* Key Highlights */}

            {hasHighlights && (

                <section className="mt-10">

                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                        Key Highlights
                    </h2>

                    <ul className="space-y-1.5 text-[14px] text-neutral-700">

                        {resume.achievements.map((item, index) => (
                            <li key={index} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-neutral-300">
                                {item}
                            </li>
                        ))}

                    </ul>

                </section>

            )}

        </div>
    );
};

export default Minimal;