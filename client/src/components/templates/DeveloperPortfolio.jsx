import React from "react";

const DeveloperPortfolio = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden font-mono text-slate-950 selection:bg-emerald-100 selection:text-emerald-950">
            
            {/* Dark Tech Header */}
            <header className="bg-slate-900 p-8 md:p-10 text-slate-100 border-b-4 border-emerald-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                            const name = <span className="text-emerald-400">"{personalInfo?.firstName} {personalInfo?.lastName}"</span>;
                        </h1>
                        <p className="text-slate-400 text-[14px] font-bold mt-2 tracking-wider uppercase">
                            // {resume.profession}
                        </p>
                    </div>

                    {/* Inline Contact & Location Grid */}
                    <div className="text-[12px] space-y-1 text-slate-300 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-emerald-500 pl-4 md:pl-0 md:pr-4">
                        {personalInfo?.phone && <p>tel: {personalInfo.phone}</p>}
                        {personalInfo?.email && <p>email: {personalInfo.email}</p>}
                        {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                            <p>loc: {[personalInfo?.city, personalInfo?.state, personalInfo?.country].filter(Boolean).join(", ")}</p>
                        )}
                    </div>
                </div>

                {/* Developer Network Endpoints */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-[13px]">
                    {[
                        { name: "linkedin", url: personalInfo?.linkedin },
                        { name: "github", url: personalInfo?.github },
                        { name: "portfolio", url: personalInfo?.portfolio },
                        { name: "website", url: personalInfo?.website }
                    ].map((link, idx) => link.url && (
                        <a
                            key={idx}
                            href={withProtocol(link.url)}
                            target={link.name === "github" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors font-bold"
                        >
                            .{link.name}()
                        </a>
                    ))}
                </div>
            </header>

            {/* Main Template Splitter */}
            <div className="flex flex-col md:flex-row">
                
                {/* Core Development History Side */}
                <main className="md:w-[65%] p-6 md:p-8 space-y-8 bg-white">
                    
                    {/* About Scope */}
                    {hasSummary && (
                        <section>
                            <h2 className="text-[13px] font-black uppercase text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-emerald-500">&lt;</span> Summary <span className="text-emerald-500">/&gt;</span>
                            </h2>
                            <p className="text-[13px] font-sans text-slate-700 leading-relaxed text-justify">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Code Repositories / Projects Section */}
                    {hasProjects && (
                        <section>
                            <h2 className="text-[13px] font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-emerald-500">&lt;</span> Featured_Projects <span className="text-emerald-500">/&gt;</span>
                            </h2>

                            <div className="space-y-6">
                                {projects.map((project, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                            {project.github || project.liveDemo ? (
                                                <a
                                                    href={withProtocol(project.github || project.liveDemo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-[14px] text-slate-900 hover:text-emerald-600 transition-colors"
                                                >
                                                    🚀 {project.title}
                                                </a>
                                            ) : (
                                                <h3 className="font-bold text-[14px] text-slate-900">
                                                    🚀 {project.title}
                                                </h3>
                                            )}

                                            <div className="flex gap-3 text-[11px] font-bold">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 underline">src</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 underline">live</a>}
                                            </div>
                                        </div>

                                        {/* Dynamic Technology Array */}
                                        {(project.techStack || []).length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] bg-slate-900 text-emerald-400 font-bold px-2 py-0.5 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <ul className="list-none space-y-1.5 text-[13px] font-sans text-slate-700">
                                            {(project.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-emerald-500 shrink-0 font-mono mt-0.5">➔</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Engineering Experience Pipeline */}
                    {hasExperience && (
                        <section>
                            <h2 className="text-[13px] font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-emerald-500">&lt;</span> Experience <span className="text-emerald-500">/&gt;</span>
                            </h2>
                            
                            <div className="space-y-5">
                                {experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-slate-200 pl-4 relative">
                                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -left-[6px] top-1.5" />
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                                            <h3 className="font-bold text-[14px] text-slate-950">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">
                                                [{formatMonthYear(exp.startDate)} - {exp.currentlyWorking ? "PRES" : formatMonthYear(exp.endDate)}]
                                            </span>
                                        </div>
                                        
                                        <p className="text-[12px] font-bold text-emerald-600 mb-2">
                                            @{exp.company} {exp.location && <span className="text-slate-400 font-normal">({exp.location})</span>}
                                        </p>
                                        
                                        <ul className="list-none space-y-1 text-[13px] font-sans text-slate-700">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-slate-400 shrink-0 font-mono mt-0.5">-</span>
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

                {/* Technical Credentials Column (Right Sidebar) */}
                <aside className="md:w-[35%] p-6 md:p-8 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 space-y-8">
                    
                    {/* Engineering Tech Stack Badges */}
                    {hasSkills && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase text-slate-900 mb-3">// Tech_Stack</h2>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, index) => skill.trim() && (
                                    <span
                                        key={index}
                                        className="text-[11px] bg-white border border-slate-300 font-bold px-2 py-1 text-slate-800 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic History Block */}
                    {hasEducation && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase text-slate-900 mb-3">// Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[12px]">
                                        <p className="font-bold text-slate-950 leading-tight">&gt; {edu.degree}</p>
                                        <p className="text-slate-600 mt-0.5">{edu.school}</p>
                                        <p className="text-[11px] text-slate-400 font-bold mt-1">
                                            {formatMonthYear(edu.startDate)} - {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                        </p>
                                        {edu.grade && <p className="text-emerald-600 font-bold mt-1">GPA: {edu.grade}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verified Credentials */}
                    {hasCertifications && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase text-slate-900 mb-3">// Credentials</h2>
                            <ul className="space-y-2 text-[12px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <li key={index} className="leading-snug">
                                        <p className="font-bold text-slate-800">■ {cert.title}</p>
                                        <p className="text-[11px] text-slate-400 ml-3">{cert.issuer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* International Languages */}
                    {hasLanguages && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase text-slate-900 mb-3">// Languages</h2>
                            <div className="text-[12px] space-y-1">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <div key={index} className="flex justify-between border-b border-slate-200 pb-1">
                                        <span className="font-bold text-slate-800">{lang.language}</span>
                                        <span className="text-slate-400">[{lang.proficiency}]</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* System Highlights */}
                    {hasHighlights && (
                        <div>
                            <h2 className="text-[12px] font-black uppercase text-slate-900 mb-2">// Accomplishments</h2>
                            <ul className="space-y-1.5 text-[12px] font-sans text-slate-700">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-1">
                                        <span className="text-emerald-500 font-mono">•</span>
                                        <span className="leading-tight">{item}</span>
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

export default DeveloperPortfolio;