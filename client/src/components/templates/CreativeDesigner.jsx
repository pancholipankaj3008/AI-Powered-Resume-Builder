import React from "react";

const CreativeDesigner = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden font-sans border border-slate-100 selection:bg-purple-100 selection:text-purple-900">
            
            {/* Top Large Creative Banner Header */}
            <header className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 p-8 md:p-12 text-white relative">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute left-1/3 bottom-0 w-48 h-12 bg-purple-500/20 blur-xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
                    {/* Big Initials Box with Shadow Gradient */}
                    <div className="w-24 h-24 shrink-0 rounded-2xl bg-white text-indigo-600 flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-900/30 transform -rotate-2">
                        {initials}
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            {personalInfo?.firstName} <span className="text-purple-200">{personalInfo?.lastName}</span>
                        </h1>
                        <p className="text-purple-100 text-[16px] md:text-[18px] mt-2 font-medium tracking-wide uppercase">
                            {resume.profession}
                        </p>
                    </div>
                </div>

                {/* Inline Responsive Links Section */}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-purple-100 font-medium">
                    {personalInfo?.phone && <span className="flex items-center gap-1">📞 {personalInfo.phone}</span>}
                    {personalInfo?.email && <span className="flex items-center gap-1">✉️ {personalInfo.email}</span>}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <span className="flex items-center gap-1">
                            📍 {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}
                        </span>
                    )}
                    
                    {/* Hyperlink Badges */}
                    <div className="flex flex-wrap gap-3 ml-auto">
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
                                className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white underline underline-offset-2 transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Split Content Body Structure */}
            <div className="flex flex-col md:flex-row">
                
                {/* Main Content Pane (Left Sub-side) */}
                <main className="md:w-[65%] p-8 md:p-10 bg-white space-y-8">
                    
                    {/* Professional Summary */}
                    {hasSummary && (
                        <section>
                            <h2 className="text-[14px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-2 mb-3">
                                <span className="w-1.5 h-4 bg-indigo-600 rounded-full inline-block" /> Profile Summary
                            </h2>
                            <p className="text-[14px] text-slate-600 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Experience Pipeline */}
                    {hasExperience && (
                        <section>
                            <h2 className="text-[14px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-2 mb-4">
                                <span className="w-1.5 h-4 bg-indigo-600 rounded-full inline-block" /> Professional Journey
                            </h2>
                            
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-[90%] before:bg-purple-100 group">
                                        <div className="absolute -left-[3px] top-1.5 w-2 h-2 rounded-full bg-purple-300 group-hover:bg-indigo-600 transition-colors" />
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1.5">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-slate-800">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-[13px] font-medium text-purple-600">
                                                    {exp.company} {exp.location && <span className="text-slate-400 font-normal">({exp.location})</span>}
                                                </p>
                                            </div>
                                            <span className="text-[12px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                {formatMonthYear(exp.startDate)} - {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        
                                        <ul className="list-disc ml-4 space-y-1 text-[13.5px] text-slate-600 marker:text-purple-400">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="pl-0.5">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects Grid */}
                    {hasProjects && (
                        <section>
                            <h2 className="text-[14px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-2 mb-4">
                                <span className="w-1.5 h-4 bg-indigo-600 rounded-full inline-block" /> Creative Showcase
                            </h2>

                            <div className="space-y-5">
                                {projects.map((project, index) => (
                                    <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all">
                                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-[15px] text-slate-800 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
                                                >
                                                    {project.title} 🔗
                                                </a>
                                            ) : (
                                                <h3 className="font-bold text-[15px] text-slate-800">
                                                    {project.title}
                                                </h3>
                                            )}
                                            
                                            <div className="flex gap-2 text-[11px] font-bold">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Repository</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Live Link</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] font-bold tracking-wide text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <ul className="list-disc ml-4 space-y-1 text-[13px] text-slate-600 marker:text-indigo-400">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="pl-0.5">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar Pane (Right Sub-side Layout) */}
                <aside className="md:w-[35%] p-8 md:p-10 bg-slate-50/70 border-l border-slate-100 space-y-8">
                    
                    {/* Dynamic Skill Tags */}
                    {hasSkills && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-3">Expertise</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span
                                        key={index}
                                        className="text-[12px] bg-white border border-slate-200 shadow-sm rounded-xl px-3 py-1.5 text-slate-700 font-medium hover:scale-105 transition-transform"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education Segment */}
                    {hasEducation && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-3">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                                        <p className="text-[13px] font-bold text-slate-800">{edu.degree}</p>
                                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{formatMonthYear(edu.startDate)} - {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}</p>
                                        <p className="text-[12px] text-slate-600 mt-1 font-medium">{edu.school}</p>
                                        {edu.grade && <span className="inline-block text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1.5">Grade: {edu.grade}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications Block */}
                    {hasCertifications && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-3">Certifications</h2>
                            <ul className="space-y-3">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <li key={index} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                                        <span className="text-[13px] font-bold text-slate-800 leading-snug">{cert.title}</span>
                                        <span className="text-[11px] text-purple-600 font-medium mt-0.5">{cert.issuer}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Languages Section */}
                    {hasLanguages && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-3">Languages</h2>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <span key={index} className="text-[12px] font-semibold text-slate-700 bg-slate-200/60 px-2.5 py-1 rounded-lg">
                                        {lang.language} <span className="text-[10px] text-slate-400 font-normal">({lang.proficiency})</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Highlights */}
                    {hasHighlights && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-2">Highlights</h2>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-1.5">
                                        <span className="text-purple-500">✨</span>
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

export default CreativeDesigner;