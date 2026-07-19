import React from "react";

const TechStartup = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-slate-900 text-slate-100 shadow-2xl rounded-3xl overflow-hidden font-sans border border-slate-800 p-6 md:p-10 space-y-8 selection:bg-cyan-500 selection:text-slate-950">
            
            {/* Modular Glowing Glassmorphism Header */}
            <header className="relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            {personalInfo?.firstName} <span className="text-cyan-400 font-light">{personalInfo?.lastName}</span>
                        </h1>
                        <p className="text-[13px] font-bold tracking-[0.25em] text-purple-400 mt-2.5 uppercase">
                            // {resume.profession}
                        </p>
                    </div>

                    {/* Meta Endpoints Terminal */}
                    <div className="text-[12px] space-y-1.5 text-slate-400 font-mono border-l md:border-l-0 md:border-r border-slate-700 pl-4 md:pl-0 md:pr-4 md:text-right">
                        {personalInfo?.phone && <p className="hover:text-cyan-300 transition-colors">⚡ {personalInfo.phone}</p>}
                        {personalInfo?.email && <p className="hover:text-cyan-300 transition-colors">✉️ {personalInfo.email}</p>}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <p>📍 {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                        )}
                    </div>
                </div>

                {/* Network Interface Hub */}
                <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-wrap gap-3 text-[12px] font-mono">
                    {[
                        { name: "linkedin", url: personalInfo?.linkedin },
                        { name: "github", url: personalInfo?.github },
                        { name: "portfolio", url: personalInfo?.portfolio },
                        { name: "website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a
                            key={idx}
                            href={withProtocol(link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                        >
                            {link.name}.io
                        </a>
                    ))}
                </div>
            </header>

            {/* Asymmetric Modular Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Engine Pane (Left & Middle Column) */}
                <main className="md:col-span-2 space-y-6">
                    
                    {/* Founder/Tech Vision Summary */}
                    {hasSummary && (
                        <section className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[13px] font-bold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2 font-mono">
                                <span>[01]</span> Executive Scope
                            </h2>
                            <p className="text-[13.5px] text-slate-400 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Fast-Paced Work History Pipeline */}
                    {hasExperience && (
                        <section className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[13px] font-bold tracking-widest text-cyan-400 uppercase mb-5 flex items-center gap-2 font-mono">
                                <span>[02]</span> Scale & Impact
                            </h2>
                            
                            <div className="space-y-6 relative border-l border-slate-800 pl-4 ml-1">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative group">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full absolute -left-[21px] top-1.5 group-hover:bg-cyan-400 ring-4 ring-slate-900 dynamic-pulse" />
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                                            <h3 className="font-extrabold text-[15px] text-white">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[11px] font-mono text-cyan-400 whitespace-nowrap bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/40">
                                                {formatMonthYear(exp.startDate)} - {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-[12px] font-bold text-slate-400 mb-3 uppercase tracking-wide">
                                            ⚡ {exp.company} {exp.location && <span className="text-slate-600 font-normal">({exp.location})</span>}
                                        </p>
                                        
                                        <ul className="space-y-1.5 text-[13px] text-slate-400 list-none">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2.5 text-justify">
                                                    <span className="text-purple-500 shrink-0 mt-1 text-[10px]">■</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Shipped Systems / Projects Block */}
                    {hasProjects && (
                        <section className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[13px] font-bold tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2 font-mono">
                                <span>[03]</span> Shipped Repositories
                            </h2>

                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 transition-colors">
                                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-extrabold text-[14px] text-white hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
                                                >
                                                    🚀 {project.title}
                                                </a>
                                            ) : (
                                                <h3 className="font-extrabold text-[14px] text-white inline-flex items-center gap-1.5">
                                                    🚀 {project.title}
                                                </h3>
                                            )}

                                            <div className="flex gap-2 text-[11px] font-mono">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">[code]</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors">[demo]</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 font-mono px-2 py-0.5 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <ul className="space-y-1 text-[13px] text-slate-400 list-none">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-slate-600 shrink-0 mt-0.5">-</span>
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

                {/* Parameters Column (Right Sidebar Column) */}
                <aside className="space-y-6">
                    
                    {/* Stack Matrix Elements */}
                    {hasSkills && (
                        <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 font-mono">// Tech Matrix</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span
                                        key={index}
                                        className="text-[11px] font-mono bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Engineering Credentials */}
                    {hasEducation && (
                        <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 font-mono">// Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px] border-b border-slate-800/60 last:border-0 pb-3 last:pb-0">
                                        <p className="font-extrabold text-white leading-snug">&gt; {edu.degree}</p>
                                        <p className="text-slate-400 text-[12px] mt-0.5">{edu.school}</p>
                                        <div className="flex justify-between items-center mt-2 text-[11px] font-mono text-slate-500">
                                            <span>{formatMonthYear(edu.startDate)} - {formatMonthYear(edu.endDate)}</span>
                                            {edu.grade && <span className="text-purple-400 bg-purple-950/30 border border-purple-900/40 px-1.5 py-0.5 rounded">{edu.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verification Records */}
                    {hasCertifications && (
                        <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 font-mono">// Credentials</h2>
                            <div className="space-y-3 text-[12px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                                        <p className="font-bold text-white leading-tight">■ {cert.title}</p>
                                        <p className="text-[11px] text-slate-500 font-mono mt-1">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Localization Systems */}
                    {hasLanguages && (
                        <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3 font-mono">// Locales</h2>
                            <div className="text-[12px] space-y-2 font-mono">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex justify-between items-center border-b border-slate-800/50 pb-1.5 last:border-0 last:pb-0">
                                        <span className="text-slate-300">{lang.language}</span>
                                        <span className="text-[10px] text-purple-400 uppercase bg-purple-950/40 border border-purple-900/30 px-1.5 rounded">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Milestones Loop */}
                    {hasHighlights && (
                        <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3 font-mono">// Milestones</h2>
                            <ul className="space-y-2 text-[13px] text-slate-400 list-none">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1 text-[10px]">♦</span>
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

export default TechStartup;