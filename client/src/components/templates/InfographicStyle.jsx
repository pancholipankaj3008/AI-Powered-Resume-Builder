import React from "react";

const InfographicStyle = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 shadow-2xl rounded-3xl overflow-hidden font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* High Impact Infographic Banner */}
            <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 md:p-12 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {personalInfo?.firstName} <span className="text-indigo-400 font-light">{personalInfo?.lastName}</span>
                    </h1>
                    <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[12px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mt-3">
                        {resume.profession}
                    </div>
                </div>

                {/* Info Pills Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8 pt-6 border-t border-indigo-700/50 text-[13px] text-indigo-200">
                    {personalInfo?.phone && <p className="flex items-center gap-2"><span>📞</span> {personalInfo.phone}</p>}
                    {personalInfo?.email && <p className="flex items-center gap-2"><span>✉️</span> {personalInfo.email}</p>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <p className="flex items-center gap-2">
                            <span>📍</span> 
                            <span className="truncate">
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                            </span>
                        </p>
                    )}
                </div>

                {/* Connected Social Nodes */}
                <div className="flex flex-wrap gap-3 mt-4 text-[12px]">
                    {[
                        { name: "LinkedIn", url: personalInfo?.linkedin },
                        { name: "GitHub", url: personalInfo?.github },
                        { name: "Portfolio", url: personalInfo?.portfolio },
                        { name: "Website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a
                            key={idx}
                            href={withProtocol(link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md font-medium transition-all text-white border border-white/5"
                        >
                            {link.name} ↗
                        </a>
                    ))}
                </div>
            </header>

            {/* Asymmetric Core Interface */}
            <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
                
                {/* Left Analytics Track (Experience & Innovation) */}
                <main className="md:w-[62%] space-y-4">
                    
                    {/* Core Metric Summary */}
                    {hasSummary && (
                        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-3 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">👤</span> Profile Mission
                            </h2>
                            <p className="text-[13.5px] text-slate-600 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Timeline Tracker */}
                    {hasExperience && (
                        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-5 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">💼</span> Career Chronology
                            </h2>
                            
                            <div className="space-y-6 relative border-l-2 border-indigo-100 pl-5 ml-2.5">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative group">
                                        <div className="w-3.5 h-3.5 bg-indigo-600 rounded-full absolute -left-[28px] top-1 border-4 border-white ring-4 ring-indigo-50" />
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                                            <h3 className="font-extrabold text-[15px] text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[11px] font-bold bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                                {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-[12px] font-bold text-indigo-600 uppercase tracking-wide mb-2.5">
                                            {exp.company} {exp.location && <span className="text-slate-400 font-medium lowercase">({exp.location})</span>}
                                        </p>
                                        
                                        <ul className="space-y-2 text-[13px] text-slate-600 list-none">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2.5 text-justify">
                                                    <span className="text-indigo-500 shrink-0 mt-1 text-[10px]">⚡</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Product & Strategy Ecosystem */}
                    {hasProjects && (
                        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-4 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">🛠️</span> Applied Execution
                            </h2>

                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-[14px] text-slate-900 hover:text-indigo-600 transition-colors"
                                                >
                                                    {project.title}
                                                </a>
                                            ) : (
                                                <h3 className="font-bold text-[14px] text-slate-900">
                                                    {project.title}
                                                </h3>
                                            )}

                                            <div className="flex gap-2 text-[11px] font-bold text-indigo-600">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:underline">Repository</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:underline">Deployment</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <ul className="space-y-1 text-[13px] text-slate-600 list-none">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Right Parameter Track (Data Elements) */}
                <aside className="md:w-[38%] space-y-4">
                    
                    {/* Infographic Visual Skill Clusters */}
                    {hasSkills && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-4 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">📊</span> Core Strengths
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span
                                        key={index}
                                        className="text-[12px] bg-slate-900 text-white font-bold px-3 py-1 rounded-xl transition-transform hover:scale-105"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic Modules */}
                    {hasEducation && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-4 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">🎓</span> Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                        <p className="font-extrabold text-slate-900 leading-tight">{edu.degree}</p>
                                        {edu.fieldOfStudy && <p className="text-slate-500 text-[12px] font-medium mt-0.5">{edu.fieldOfStudy}</p>}
                                        <p className="text-indigo-600 text-[12px] mt-1 font-semibold">{edu.school}</p>
                                        <div className="flex justify-between items-center mt-2 text-[11px] font-bold text-slate-400">
                                            <span>{formatMonthYear(edu.startDate)} - {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}</span>
                                            {edu.grade && <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{edu.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications Array */}
                    {hasCertifications && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-4 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">📜</span> Credentials
                            </h2>
                            <div className="space-y-3 text-[13px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="text-xl shrink-0">🏅</span>
                                        <div className="leading-tight">
                                            <p className="font-bold text-slate-800">{cert.title}</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Communication Vectors */}
                    {hasLanguages && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-3 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">🌐</span> Languages
                            </h2>
                            <div className="text-[13px] space-y-2">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800">{lang.language}</span>
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Value Highlights */}
                    {hasHighlights && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h2 className="text-[14px] font-black uppercase text-indigo-950 tracking-wider mb-3 flex items-center gap-2">
                                <span className="p-1 bg-indigo-50 rounded-lg text-indigo-600">🏆</span> Key Milestones
                            </h2>
                            <ul className="space-y-2 text-[13px] text-slate-600 list-none">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-0.5">⭐</span>
                                        <span className="leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default InfographicStyle;