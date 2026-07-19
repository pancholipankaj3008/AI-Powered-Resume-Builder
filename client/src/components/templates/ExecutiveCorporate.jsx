import React from "react";

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
        <div className="max-w-4xl mx-auto bg-white text-stone-900 p-10 md:p-14 shadow-md font-serif leading-relaxed tracking-normal select-text">
            
            {/* Executive Top Banner Head */}
            <div className="text-center border-t-[3px] border-b-[3px] border-[#1e3a5f] py-6 my-2">
                <h1 className="text-3xl font-bold uppercase tracking-[0.15em] text-[#1e3a5f]">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>
                
                {resume.profession && (
                    <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-stone-600 mt-2">
                        {resume.profession}
                    </p>
                )}

                {/* Symmetrical Corporate Contact Layout */}
                <div className="text-xs font-sans text-stone-600 mt-4 flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 font-medium tracking-wide">
                    <span>
                        {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                    </span>
                    
                    {personalInfo?.email && (
                        <>
                            <span className="text-stone-300 pointer-events-none">•</span>
                            <a href={`mailto:${personalInfo.email}`} className="hover:text-[#1e3a5f] underline decoration-stone-300 transition-colors font-semibold">
                                {personalInfo.email}
                            </a>
                        </>
                    )}

                    {personalInfo?.phone && (
                        <>
                            <span className="text-stone-300 pointer-events-none">•</span>
                            <span className="font-semibold">{personalInfo.phone}</span>
                        </>
                    )}

                    {/* Loop for Online Presence Links */}
                    {[
                        { name: "LinkedIn", url: personalInfo?.linkedin },
                        { name: "GitHub", url: personalInfo?.github },
                        { name: "Portfolio", url: personalInfo?.portfolio },
                        { name: "Website", url: personalInfo?.website }
                    ].map((link, i) => link.url && (
                        <React.Fragment key={i}>
                            <span className="text-stone-300 pointer-events-none">•</span>
                            <a href={withProtocol(link.url)} target="_blank" rel="noopener noreferrer" className="hover:text-[#1e3a5f] underline decoration-stone-300 font-medium">
                                {link.name}
                            </a>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Profile Brief Summary */}
            {hasSummary && (
                <section className="mt-8">
                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                        Professional Summary
                    </h2>
                    <div className="border-t border-stone-200 mb-3" />
                    <p className="text-[14.5px] text-stone-800 text-justify leading-relaxed font-serif">
                        {summary}
                    </p>
                </section>
            )}

            {/* Core Capabilities Matrix */}
            {hasSkills && (
                <section className="mt-8">
                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                        Core Competencies
                    </h2>
                    <div className="border-t border-stone-200 mb-3.5" />
                    <p className="text-[13.5px] font-sans text-stone-800 text-center tracking-wide leading-relaxed max-w-3xl mx-auto">
                        {skills.join("   •   ")}
                    </p>
                </section>
            )}

            {/* Career Timeline Chronology */}
            {hasExperience && (
                <section className="mt-8">
                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                        Professional Experience
                    </h2>
                    <div className="border-t border-stone-200 mb-4" />
                    
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-5 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                                <h3 className="font-bold text-[15px] text-stone-900">
                                    {exp.position}
                                </h3>
                                <span className="text-[12.5px] font-sans font-semibold text-stone-600 tracking-wider uppercase whitespace-nowrap">
                                    {formatMonthYear(exp.startDate)} — {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                </span>
                            </div>
                            
                            <p className="text-[13.5px] font-sans italic text-stone-700 mt-0.5 font-medium">
                                {exp.company}{exp.location && `, ${exp.location}`}
                            </p>

                            <ul className="list-disc ml-4 mt-2 space-y-1 text-[14px] text-stone-800">
                                {(exp.description || []).map((item, i) => item.trim() && (
                                    <li key={i} className="pl-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Strategic Signature Projects */}
            {hasProjects && (
                <section className="mt-8">
                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                        Key Projects
                    </h2>
                    <div className="border-t border-stone-200 mb-4" />
                    
                    {projects.map((project, index) => (
                        <div key={index} className="mb-5 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                                <h3 className="font-bold text-[15px] text-stone-900">
                                    {project.title}
                                </h3>
                                
                                {(project.github || project.liveDemo) && (
                                    <div className="text-xs font-sans font-medium space-x-2">
                                        {project.github && (
                                            <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#1e3a5f] underline decoration-stone-200">GitHub</a>
                                        )}
                                        {project.github && project.liveDemo && <span className="text-stone-300">|</span>}
                                        {project.liveDemo && (
                                            <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#1e3a5f] underline decoration-stone-200">Live Release</a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {(project.techStack || []).length > 0 && (
                                <p className="text-xs font-sans italic text-stone-600 mt-0.5">
                                    <span className="font-semibold text-stone-700 not-italic">Technologies:</span> {project.techStack.join(", ")}
                                </p>
                            )}

                            <ul className="list-disc ml-4 mt-2 space-y-1 text-[14px] text-stone-800">
                                {(project.description || []).map((item, i) => item.trim() && (
                                    <li key={i} className="pl-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education History */}
            {hasEducation && (
                <section className="mt-8">
                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                        Education History
                    </h2>
                    <div className="border-t border-stone-200 mb-4" />
                    
                    {education.map((edu, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline flex-wrap gap-x-3">
                                <h3 className="font-bold text-[15px] text-stone-900">
                                    {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                                </h3>
                                <span className="text-[12.5px] font-sans font-semibold text-stone-600 tracking-wider uppercase whitespace-nowrap">
                                    {formatMonthYear(edu.startDate)} — {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-baseline text-[13.5px] font-sans text-stone-700 mt-0.5 font-medium">
                                <span>{edu.school}</span>
                                {edu.grade && <span className="text-xs font-bold text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded">Marks: {edu.grade}</span>}
                            </div>
                            
                            {edu.description && (
                                <p className="text-[13.5px] text-stone-600 mt-1 font-serif italic">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Credentials & Dynamic Meta Footer Grid */}
            {(hasCertifications || hasLanguages || hasHighlights) && (
                <div className="space-y-7 mt-8">
                    {/* Certifications Dynamic Full-width List */}
                    {hasCertifications && (
                        <section>
                            <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] text-center mb-1.5">
                                Professional Certifications
                            </h2>
                            <div className="border-t border-stone-200 mb-3" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-sans text-[13.5px]">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="border-l-2 border-[#1e3a5f]/30 pl-3 py-0.5 bg-stone-50/50">
                                        <div className="flex justify-between items-baseline gap-x-2">
                                            <span className="font-bold text-stone-900">{cert.title}</span>
                                            {cert.issueDate && (
                                                <span className="text-[11px] font-semibold text-stone-500 whitespace-nowrap">{formatMonthYear(cert.issueDate)}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-stone-600 font-medium">{cert.issuer}{cert.credentialId && ` • Lic: ${cert.credentialId}`}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Symmetrical Dual Footer (Languages & Achievements) */}
                    {(hasLanguages || hasHighlights) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {hasLanguages && (
                                <section>
                                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] mb-1.5">
                                        Languages
                                    </h2>
                                    <div className="border-t border-stone-200 mb-2.5" />
                                    <p className="text-[13.5px] font-sans text-stone-800 tracking-wide leading-relaxed">
                                        {languages.map((lang) => `${lang.language} (${lang.proficiency})`).join("   •   ")}
                                    </p>
                                </section>
                            )}

                            {hasHighlights && (
                                <section>
                                    <h2 className="text-xs font-bold font-sans uppercase tracking-[0.25em] text-[#1e3a5f] mb-1.5">
                                        Key Highlights & Honors
                                    </h2>
                                    <div className="border-t border-stone-200 mb-2.5" />
                                    <ul className="list-disc ml-4 space-y-1 text-[13.5px] text-stone-800">
                                        {resume.achievements.map((item, index) => item.trim() && (
                                            <li key={index} className="pl-0.5">{item}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExecutiveCorporate;