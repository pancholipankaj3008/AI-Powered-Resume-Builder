const ATSProfessional = ({ resume }) => {

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
        <div className="max-w-4xl mx-auto bg-white text-gray-900 p-10 md:p-12 shadow-sm font-[Arial,Helvetica,sans-serif] leading-relaxed">

            {/* Header */}

            <div className="text-center border-b border-gray-300 pb-4">

                <h1 className="text-4xl font-serif tracking-tight text-gray-900">
    {personalInfo?.firstName} {personalInfo?.lastName}
</h1>

<p className="text-[15px] mt-1.5 text-gray-700">
    {resume.profession}
</p>

<p className="text-sm mt-3 text-gray-700">

    {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
        .filter(Boolean)
        .join(", ")}

    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) &&
        (personalInfo?.email || personalInfo?.phone) && " | "}

    {personalInfo?.email}
    {personalInfo?.email && personalInfo?.phone && " | "}
    {personalInfo?.phone}

{(personalInfo?.portfolio || personalInfo?.linkedin || personalInfo?.github || personalInfo?.website) && " | "}

{personalInfo?.portfolio && (
    <a
        href={withProtocol(personalInfo.portfolio)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
    >
        Portfolio
    </a>
)}

{personalInfo?.portfolio && (personalInfo?.linkedin || personalInfo?.github || personalInfo?.website) && " | "}

{personalInfo?.linkedin && (
    <a
        href={withProtocol(personalInfo.linkedin)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
    >
        LinkedIn
    </a>
)}

{personalInfo?.linkedin && (personalInfo?.github || personalInfo?.website) && " | "}

{personalInfo?.github && (
    <a
        href={withProtocol(personalInfo.github)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
    >
        Github
    </a>
)}

{personalInfo?.github && personalInfo?.website && " | "}

{personalInfo?.website && (
    <a
        href={withProtocol(personalInfo.website)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
    >
        Website
    </a>
)}

</p>

            </div>

            {/* Summary */}

            {hasSummary && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Professional Summary
                    </h2>

                    <p className="text-[15px] text-gray-800">
                        {summary}
                    </p>

                </section>

            )}

            {/* Skills */}

            {hasSkills && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Skills
                    </h2>

                    <p className="text-[15px] text-gray-800">
                        {skills.join(" • ")}
                    </p>

                </section>

            )}

            {/* Experience */}

            {hasExperience && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Experience
                    </h2>

                    {experience.map((exp, index) => (

    <div key={index} className="mb-5 last:mb-0">

        <div className="flex justify-between items-baseline flex-wrap gap-x-3">

            <div>

                <h3 className="font-semibold text-[15px] text-gray-900">
                    {exp.position}
                </h3>

                <p className="font-medium text-[15px] text-gray-700">
                    {exp.company}
                    {exp.location && (
                        <span className="font-normal text-gray-500"> — {exp.location}</span>
                    )}
                </p>

            </div>

            <span className="text-sm text-gray-600 whitespace-nowrap">

                {formatMonthYear(exp.startDate)}
                {" - "}
                {exp.currentlyWorking
                    ? "Present"
                    : formatMonthYear(exp.endDate)}

            </span>

        </div>

        <ul className="list-disc ml-5 mt-2 space-y-1 text-[15px] text-gray-800">

            {(exp.description || []).map((item, i) => (

                <li key={i}>
                    {item}
                </li>

            ))}

        </ul>

    </div>

))}

                </section>

            )}

            {/* Education */}

            {hasEducation && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Education
                    </h2>

                    {education.map((edu, index) => (

    <div key={index} className="mb-4 last:mb-0">

        <div className="flex justify-between items-baseline flex-wrap gap-x-3">

            <h3 className="font-semibold text-[15px] text-gray-900">

                {edu.degree}

                {edu.fieldOfStudy &&
                    ` - ${edu.fieldOfStudy}`}

            </h3>

            <span className="text-sm text-gray-600 whitespace-nowrap">

                {formatMonthYear(edu.startDate)}

                {" - "}

                {edu.currentlyStudying
                    ? "Present"
                    : formatMonthYear(edu.endDate)}

            </span>

        </div>

        <p className="text-[15px] text-gray-700">{edu.school}</p>

        {edu.grade && (
            <p className="text-sm text-gray-600">Grade: {edu.grade}</p>
        )}

        {edu.description && (
            <p className="text-[15px] text-gray-800 mt-1">{edu.description}</p>
        )}

    </div>

))}

                </section>

            )}

            {/* Projects */}

            {hasProjects && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Projects
                    </h2>

                    {projects.map((project, index) => (

    <div key={index} className="mb-4 last:mb-0">

        {project.github || project.liveDemo ? (

            <a
                href={withProtocol(project.github || project.liveDemo)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[15px] text-blue-700 underline"
            >
                {project.title}
            </a>

        ) : (

            <h3 className="font-semibold text-[15px] text-gray-900">
                {project.title}
            </h3>

        )}

        {(project.techStack || []).length > 0 && (

            <p className="text-sm text-gray-700 mt-0.5">
                <strong className="font-semibold text-gray-800">Tech Stack:</strong>{" "}
                {project.techStack.join(", ")}
            </p>

        )}

        <ul className="list-disc ml-5 mt-2 space-y-1 text-[15px] text-gray-800">

            {(project.description || []).map((item, i) => (

                <li key={i}>
                    {item}
                </li>

            ))}

        </ul>

        {(project.github || project.liveDemo) && (

            <p className="text-sm mt-1">

                (
                {project.github && (
                    <a
                        href={withProtocol(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline"
                    >
                        GitHub
                    </a>
                )}
                {project.github && project.liveDemo && ", "}
                {project.liveDemo && (
                    <a
                        href={withProtocol(project.liveDemo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline"
                    >
                        Live Demo
                    </a>
                )}
                )

            </p>

        )}

    </div>

))}

                </section>

            )}


            {/* Certifications */}

            {hasCertifications && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Certifications
                    </h2>

                    {certifications.map((cert, index) => (

    <div key={index} className="mb-3 last:mb-0">

        <div className="flex justify-between items-baseline flex-wrap gap-x-3">

            <p className="font-semibold text-[15px] text-gray-900">
                {cert.title}
            </p>

            {cert.issueDate && (

                <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatMonthYear(cert.issueDate)}
                </span>

            )}

        </div>

        <p className="text-[15px] text-gray-700">{cert.issuer}</p>

        {cert.credentialId && (
            <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
        )}

    </div>

))}

                </section>

            )}

            {/* Languages */}

            {hasLanguages && (

                <section className="mt-7">

                    <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
                        Languages
                    </h2>

                    <ul className="list-disc ml-6 space-y-1 text-[15px] text-gray-800">

                        {languages.map((lang, index) => (

                            <li key={index}>
                                {lang.language}
                                {" - "}
                                {lang.proficiency}
                            </li>

                        ))}

                    </ul>

                </section>

            )}


            {/* Key Highlights */}

{hasHighlights && (

    <section className="mt-7">

        <h2 className="text-xl font-serif text-blue-900 border-b-2 border-blue-900/40 pb-1 mb-3">
            Key Highlights
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-[15px] text-gray-800">

            {resume.achievements.map((item, index) => (

                <li key={index}>
                    {item}
                </li>

            ))}

        </ul>

    </section>

)}

        </div>
    );
};

export default ATSProfessional;