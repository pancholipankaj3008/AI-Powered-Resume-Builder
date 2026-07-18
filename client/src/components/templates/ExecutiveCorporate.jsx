const ExecutiveCorporate = ({ resume }) => {

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
        <div className="max-w-4xl mx-auto bg-white text-neutral-900 p-12 font-serif">

            {/* Header */}

            <div className="text-center border-t-4 border-b-4 border-[#1e3a5f] py-5">

                <h1 className="text-3xl font-bold uppercase tracking-[0.12em] text-[#1e3a5f]">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>

                <p className="text-[15px] mt-2 tracking-wide text-neutral-700">
                    {resume.profession}
                </p>

                <p className="text-[13px] mt-3 text-neutral-600 tracking-wide">

                    {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (personalInfo?.email || personalInfo?.phone) && "  |  "}
                    {personalInfo?.email}
                    {personalInfo?.email && personalInfo?.phone && "  |  "}
                    {personalInfo?.phone}

                    {(personalInfo?.linkedin || personalInfo?.github || personalInfo?.portfolio || personalInfo?.website) && "  |  "}

                    {personalInfo?.linkedin && (
                        <a href={withProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">LinkedIn</a>
                    )}
                    {personalInfo?.linkedin && (personalInfo?.github || personalInfo?.portfolio || personalInfo?.website) && "  |  "}

                    {personalInfo?.github && (
                        <a href={withProtocol(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">Github</a>
                    )}
                    {personalInfo?.github && (personalInfo?.portfolio || personalInfo?.website) && "  |  "}

                    {personalInfo?.portfolio && (
                        <a href={withProtocol(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">Portfolio</a>
                    )}
                    {personalInfo?.portfolio && personalInfo?.website && "  |  "}

                    {personalInfo?.website && (
                        <a href={withProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">Website</a>
                    )}

                </p>

            </div>

            {/* Summary */}

            {hasSummary && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Professional Summary
                    </h2>

                    <div className="border-t border-neutral-300 mb-3" />

                    <p className="text-[15px] text-neutral-800 leading-relaxed text-justify">
                        {summary}
                    </p>

                </section>

            )}

            {/* Experience */}

            {hasExperience && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Professional Experience
                    </h2>

                    <div className="border-t border-neutral-300 mb-4" />

                    {experience.map((exp, index) => (

                        <div key={index} className="mb-5 last:mb-0">

                            <div className="flex justify-between flex-wrap gap-x-3">

                                <h3 className="font-bold text-[15px] text-neutral-900">
                                    {exp.position}
                                </h3>

                                <span className="text-[14px] italic text-neutral-600 whitespace-nowrap">
                                    {formatMonthYear(exp.startDate)}
                                    {" – "}
                                    {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                </span>

                            </div>

                            <p className="text-[14px] italic text-neutral-700">
                                {exp.company}
                                {exp.location && `, ${exp.location}`}
                            </p>

                            <ul className="list-disc ml-5 mt-2 space-y-1 text-[14px] text-neutral-800">

                                {(exp.description || []).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}

                            </ul>

                        </div>

                    ))}

                </section>

            )}

            {/* Education */}

            {hasEducation && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Education
                    </h2>

                    <div className="border-t border-neutral-300 mb-4" />

                    {education.map((edu, index) => (

                        <div key={index} className="mb-4 last:mb-0">

                            <div className="flex justify-between flex-wrap gap-x-3">

                                <h3 className="font-bold text-[15px] text-neutral-900">
                                    {edu.degree}{edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                                </h3>

                                <span className="text-[14px] italic text-neutral-600 whitespace-nowrap">
                                    {formatMonthYear(edu.startDate)}
                                    {" – "}
                                    {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                </span>

                            </div>

                            <p className="text-[14px] italic text-neutral-700">{edu.school}</p>

                            {edu.grade && <p className="text-[13px] text-neutral-600">Grade: {edu.grade}</p>}
                            {edu.description && <p className="text-[14px] text-neutral-800 mt-1">{edu.description}</p>}

                        </div>

                    ))}

                </section>

            )}

            {/* Projects */}

            {hasProjects && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Selected Projects
                    </h2>

                    <div className="border-t border-neutral-300 mb-4" />

                    {projects.map((project, index) => (

                        <div key={index} className="mb-5 last:mb-0">

                            {project.github || project.liveDemo ? (
                                <a
                                    href={withProtocol(project.github || project.liveDemo)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-[15px] text-[#1e3a5f] underline"
                                >
                                    {project.title}
                                </a>
                            ) : (
                                <h3 className="font-bold text-[15px] text-neutral-900">
                                    {project.title}
                                </h3>
                            )}

                            {(project.techStack || []).length > 0 && (
                                <p className="text-[13px] italic text-neutral-600 mt-0.5">
                                    {project.techStack.join(", ")}
                                </p>
                            )}

                            <ul className="list-disc ml-5 mt-2 space-y-1 text-[14px] text-neutral-800">

                                {(project.description || []).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}

                            </ul>

                            {(project.github || project.liveDemo) && (
                                <p className="text-[13px] mt-1">
                                    (
                                    {project.github && (
                                        <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">GitHub</a>
                                    )}
                                    {project.github && project.liveDemo && ", "}
                                    {project.liveDemo && (
                                        <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] underline">Live Demo</a>
                                    )}
                                    )
                                </p>
                            )}

                        </div>

                    ))}

                </section>

            )}

            {/* Skills */}

            {hasSkills && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Core Competencies
                    </h2>

                    <div className="border-t border-neutral-300 mb-3" />

                    <p className="text-[14px] text-neutral-800 text-center">
                        {skills.join("  •  ")}
                    </p>

                </section>

            )}

            {/* Certifications */}

            {hasCertifications && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Certifications
                    </h2>

                    <div className="border-t border-neutral-300 mb-4" />

                    {certifications.map((cert, index) => (

                        <div key={index} className="mb-3 last:mb-0 flex justify-between flex-wrap gap-x-3">

                            <div>
                                <p className="font-bold text-[14px] text-neutral-900">{cert.title}</p>
                                <p className="text-[13px] italic text-neutral-700">{cert.issuer}</p>
                                {cert.credentialId && <p className="text-[12px] text-neutral-500">ID: {cert.credentialId}</p>}
                            </div>

                            {cert.issueDate && (
                                <span className="text-[13px] italic text-neutral-600 whitespace-nowrap">{formatMonthYear(cert.issueDate)}</span>
                            )}

                        </div>

                    ))}

                </section>

            )}

            {/* Languages */}

            {hasLanguages && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Languages
                    </h2>

                    <div className="border-t border-neutral-300 mb-3" />

                    <p className="text-[14px] text-neutral-800 text-center">
                        {languages.map((lang) => `${lang.language} (${lang.proficiency})`).join("  •  ")}
                    </p>

                </section>

            )}

            {/* Key Highlights */}

            {hasHighlights && (

                <section className="mt-8">

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f] text-center mb-3">
                        Key Highlights
                    </h2>

                    <div className="border-t border-neutral-300 mb-4" />

                    <ul className="list-disc ml-5 space-y-1.5 text-[14px] text-neutral-800">

                        {resume.achievements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}

                    </ul>

                </section>

            )}

        </div>
    );
};

export default ExecutiveCorporate;