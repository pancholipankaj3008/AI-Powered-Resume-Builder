import React from "react";

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
        <div className="max-w-4xl mx-auto bg-slate-50 shadow-2xl rounded-xl overflow-hidden font-sans flex flex-col md:flex-row selection:bg-teal-200 selection:text-teal-900">
            
            {/* Sidebar (Sleek Gradient & Glassmorphism Hints) */}
            <aside className="md:w-[35%] bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-8 md:p-10">
                
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-900 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-teal-500/20 rotate-3 transition-transform hover:rotate-0">
                    {initials}
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
                    {personalInfo?.firstName} <span className="text-teal-400">{personalInfo?.lastName}</span>
                </h1>

                <p className="text-teal-300/90 text-[15px] mt-2 font-medium tracking-wide">
                    {resume.profession}
                </p>

                {/* Contact */}
                <div className="mt-10">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                        Contact
                    </h2>
                    <ul className="text-[14px] space-y-3 text-slate-300 break-words">
                        {personalInfo?.email && (
                            <li className="flex items-center gap-2 hover:text-white transition-colors">
                                {personalInfo.email}
                            </li>
                        )}
                        {personalInfo?.phone && (
                            <li className="flex items-center gap-2 hover:text-white transition-colors">
                                {personalInfo.phone}
                            </li>
                        )}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <li className="flex items-center gap-2">
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </li>
                        )}
                        
                        {/* Links mapped cleanly */}
                        {[
                            { name: "LinkedIn", url: personalInfo?.linkedin },
                            { name: "GitHub", url: personalInfo?.github },
                            { name: "Portfolio", url: personalInfo?.portfolio },
                            { name: "Website", url: personalInfo?.website }
                        ].map((link, idx) => link.url && (
                            <li key={idx}>
                                <a
                                    href={withProtocol(link.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-400 hover:text-teal-300 underline underline-offset-4 transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Skills (Pill badges with subtle glassmorphism) */}
                {hasSkills && (
                    <div className="mt-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                            Expertise
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => skill.trim() && (
                                <span
                                    key={index}
                                    className="text-[13px] bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-slate-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {hasLanguages && (
                    <div className="mt-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                            Languages
                        </h2>
                        <ul className="text-[14px] space-y-2 text-slate-300">
                            {languages.map((lang, index) => lang.language?.trim() && (
                                <li key={index} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                                    <span className="font-medium text-slate-200">{lang.language}</span>
                                    <span className="text-[12px] text-teal-400/80 bg-teal-400/10 px-2 py-0.5 rounded">{lang.proficiency}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

               
            </aside>

            {/* Main Content (Clean & Spacious) */}
            <main className="md:w-[65%] p-8 md:p-12 bg-white">
                
                {hasSummary && (
                    <section className="mb-10">
                        <div className="flex items-center gap-4 mb-5">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Profile</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                        <p className="text-[15px] text-slate-600 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </section>
                )}

                {hasExperience && (
                    <section className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Experience</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                        
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-slate-100 group">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-teal-400 transition-colors duration-300 ring-4 ring-white" />
                                    
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                                        <div>
                                            <h3 className="font-bold text-[16px] text-slate-800">
                                                {exp.position}
                                            </h3>
                                            <p className="text-[14px] font-medium text-teal-600 mt-0.5">
                                                {exp.company} {exp.location && <span className="text-slate-400 font-normal">— {exp.location}</span>}
                                            </p>
                                        </div>
                                        <span className="text-[13px] font-medium text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-md">
                                            {formatMonthYear(exp.startDate)} - {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                        </span>
                                    </div>
                                    
                                    <ul className="list-disc ml-4 space-y-1.5 text-[14px] text-slate-600 marker:text-slate-300">
                                        {(exp.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="pl-1">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {hasProjects && (
                    <section className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Projects</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <div className="space-y-6">
                            {projects.map((project, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-slate-100 group">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-teal-400 transition-colors duration-300 ring-4 ring-white" />
                                    
                                    <div className="mb-2">
                                        {project.github || project.liveDemo ? (
                                            <a
                                                href={withProtocol(project.github || project.liveDemo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-bold text-[16px] text-teal-600 hover:text-teal-700 hover:underline transition-colors inline-flex items-center gap-2"
                                            >
                                                {project.title}
                                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <h3 className="font-bold text-[16px] text-slate-800">
                                                {project.title}
                                            </h3>
                                        )}

                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <ul className="list-disc ml-4 space-y-1.5 text-[14px] text-slate-600 marker:text-slate-300 mt-3">
                                        {(project.description || []).map((item, i) => item.trim() && (
                                            <li key={i} className="pl-1">{item}</li>
                                        ))}
                                    </ul>

                                    {(project.github || project.liveDemo) && (
                                        <div className="flex gap-4 mt-3 text-[13px] font-medium">
                                            {project.github && (
                                                <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline underline-offset-2">GitHub Repo</a>
                                            )}
                                            {project.liveDemo && (
                                                <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline underline-offset-2">Live Demo</a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {hasEducation && (
                    <section className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Education</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <div className="space-y-5">
                            {education.map((edu, index) => (
                                <div key={index} className="group">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                        <h3 className="font-bold text-[15px] text-slate-800 group-hover:text-teal-600 transition-colors">
                                            {edu.degree}{edu.fieldOfStudy && <span className="font-normal text-slate-500"> in {edu.fieldOfStudy}</span>}
                                        </h3>
                                        <span className="text-[13px] font-medium text-slate-400 whitespace-nowrap">
                                            {formatMonthYear(edu.startDate)} - {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-slate-600 mt-1">{edu.school}</p>
                                    {edu.grade && <p className="text-[13px] font-medium text-teal-600/80 mt-1 bg-teal-50 inline-block px-2 py-0.5 rounded">Grade: {edu.grade}</p>}
                                    {edu.description && <p className="text-[14px] text-slate-500 mt-2 leading-relaxed">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                
                {hasCertifications && (
                    <div className="mt-10">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Certifications</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                        <ul className="text-[14px] space-y-4 text-slate-300">
                            {certifications.map((cert, index) => cert.title?.trim() && (
                                
                                <>
                                <li key={index} className="flex items-start gap-2 mb-0">
                                    <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-500 whitespace-nowrap">{cert.title}</span>
                                </li>
                                    <p className="text-[14px] text-slate-500 mt-0.5 mb-4">{cert.issuer}</p>
                                </>
                            ))}
                        </ul>
                    </div>
                )}

                {hasHighlights && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800 whitespace-nowrap">Key Highlights</h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-slate-600">
                            {resume.achievements.map((item, index) => item.trim() && (
                                <li key={index} className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Modern;