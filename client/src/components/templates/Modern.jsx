const Modern = ({ resume }) => {

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

    const initials = `${personalInfo?.firstName?.[0] || ""}${personalInfo?.lastName?.[0] || ""}`;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-sm font-sans flex flex-col md:flex-row">

            {/* Sidebar */}

            <aside className="md:w-[35%] bg-[#0f2d2b] text-white p-8">

                <div className="w-20 h-20 rounded-full bg-teal-400 text-[#0f2d2b] flex items-center justify-center text-2xl font-bold mb-6">
                    {initials}
                </div>

                <h1 className="text-2xl font-bold leading-tight">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>

                <p className="text-teal-300 text-sm mt-1 font-medium">
                    {resume.profession}
                </p>

                {/* Contact */}

                <div className="mt-8">

                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-300 mb-3">
                        Contact
                    </h2>

                    <ul className="text-sm space-y-2 text-teal-50/90 break-words">

                        {personalInfo?.email && <li>{personalInfo.email}</li>}
                        {personalInfo?.phone && <li>{personalInfo.phone}</li>}

                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <li>
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </li>
                        )}

                        {personalInfo?.linkedin && (
                            <li>
                                <a
                                    href={withProtocol(personalInfo.linkedin)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-300 underline"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        )}

                        {personalInfo?.github && (
                            <li>
                                <a
                                    href={withProtocol(personalInfo.github)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-300 underline"
                                >
                                    Github
                                </a>
                            </li>
                        )}

                        {personalInfo?.portfolio && (
                            <li>
                                <a
                                    href={withProtocol(personalInfo.portfolio)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-300 underline"
                                >
                                    Portfolio
                                </a>
                            </li>
                        )}

                        {personalInfo?.website && (
                            <li>
                                <a
                                    href={withProtocol(personalInfo.website)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-300 underline"
                                >
                                    Website
                                </a>
                            </li>
                        )}

                    </ul>

                </div>

                {/* Skills */}

                {hasSkills && (

                    <div className="mt-8">

                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-300 mb-3">
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {skills.map((skill, index) => (

                                <span
                                    key={index}
                                    className="text-xs bg-white/10 rounded px-2 py-1"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                )}

                {/* Languages */}

                {hasLanguages && (

                    <div className="mt-8">

                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-300 mb-3">
                            Languages
                        </h2>

                        <ul className="text-sm space-y-1.5 text-teal-50/90">

                            {languages.map((lang, index) => (
                                <li key={index}>
                                    {lang.language} <span className="text-teal-300/70">— {lang.proficiency}</span>
                                </li>
                            ))}

                        </ul>

                    </div>

                )}

                {/* Certifications */}

                {hasCertifications && (

                    <div className="mt-8">

                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-300 mb-3">
                            Certifications
                        </h2>

                        <ul className="text-sm space-y-3 text-teal-50/90">

                            {certifications.map((cert, index) => (
                                <li key={index}>
                                    <p className="font-medium">{cert.title}</p>
                                    <p className="text-xs text-teal-300/80">{cert.issuer}</p>
                                </li>
                            ))}

                        </ul>

                    </div>

                )}

            </aside>

            {/* Main content */}

            <main className="md:w-[65%] p-8 md:p-10">

                {hasSummary && (

                    <section className="mb-8">

                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d2b] border-l-4 border-teal-400 pl-3 mb-3">
                            Profile
                        </h2>

                        <p className="text-[15px] text-gray-700 leading-relaxed">
                            {summary}
                        </p>

                    </section>

                )}

                {hasExperience && (

                    <section className="mb-8">

                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d2b] border-l-4 border-teal-400 pl-3 mb-4">
                            Experience
                        </h2>

                        {experience.map((exp, index) => (

                            <div key={index} className="mb-5 last:mb-0 relative pl-5 border-l-2 border-gray-200">

                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-teal-400" />

                                <div className="flex justify-between flex-wrap gap-x-3">

                                    <div>
                                        <h3 className="font-semibold text-[15px] text-gray-900">
                                            {exp.position}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {exp.company}
                                            {exp.location && ` — ${exp.location}`}
                                        </p>
                                    </div>

                                    <span className="text-xs text-gray-500 whitespace-nowrap mt-0.5">
                                        {formatMonthYear(exp.startDate)}
                                        {" - "}
                                        {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                    </span>

                                </div>

                                <ul className="list-disc ml-4 mt-2 space-y-1 text-[14px] text-gray-700">

                                    {(exp.description || []).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}

                                </ul>

                            </div>

                        ))}

                    </section>

                )}

                {hasProjects && (

                    <section className="mb-8">

                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d2b] border-l-4 border-teal-400 pl-3 mb-4">
                            Projects
                        </h2>

                        {projects.map((project, index) => (

                            <div key={index} className="mb-5 last:mb-0 relative pl-5 border-l-2 border-gray-200">

                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-teal-400" />

                                {project.github || project.liveDemo ? (
                                    <a
                                        href={withProtocol(project.github || project.liveDemo)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[15px] text-teal-700 underline"
                                    >
                                        {project.title}
                                    </a>
                                ) : (
                                    <h3 className="font-semibold text-[15px] text-gray-900">
                                        {project.title}
                                    </h3>
                                )}

                                {(project.techStack || []).length > 0 && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {project.techStack.join(" · ")}
                                    </p>
                                )}

                                <ul className="list-disc ml-4 mt-2 space-y-1 text-[14px] text-gray-700">

                                    {(project.description || []).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}

                                </ul>

                                {(project.github || project.liveDemo) && (
                                    <p className="text-xs mt-1 space-x-2">
                                        {project.github && (
                                            <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">GitHub</a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Live Demo</a>
                                        )}
                                    </p>
                                )}

                            </div>

                        ))}

                    </section>

                )}

                {hasEducation && (

                    <section className="mb-8">

                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d2b] border-l-4 border-teal-400 pl-3 mb-4">
                            Education
                        </h2>

                        {education.map((edu, index) => (

                            <div key={index} className="mb-4 last:mb-0">

                                <div className="flex justify-between flex-wrap gap-x-3">

                                    <h3 className="font-semibold text-[15px] text-gray-900">
                                        {edu.degree}{edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                                    </h3>

                                    <span className="text-xs text-gray-500 whitespace-nowrap mt-0.5">
                                        {formatMonthYear(edu.startDate)}
                                        {" - "}
                                        {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                    </span>

                                </div>

                                <p className="text-sm text-gray-600">{edu.school}</p>

                                {edu.grade && <p className="text-xs text-gray-500">Grade: {edu.grade}</p>}
                                {edu.description && <p className="text-[14px] text-gray-700 mt-1">{edu.description}</p>}

                            </div>

                        ))}

                    </section>

                )}

                {hasHighlights && (

                    <section>

                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d2b] border-l-4 border-teal-400 pl-3 mb-4">
                            Key Highlights
                        </h2>

                        <ul className="list-disc ml-4 space-y-1.5 text-[14px] text-gray-700">

                            {resume.achievements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </ul>

                    </section>

                )}

            </main>

        </div>
    );
};

export default Modern;