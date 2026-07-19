import React from "react";

const Executive = ({ resume }) => {
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
        <div className="max-w-4xl mx-auto bg-[#fcfbf9] p-8 md:p-14 border border-amber-900/10 shadow-2xl font-serif text-slate-900 selection:bg-amber-100 selection:text-amber-900">
            
            {/* Top Elite Elegant Header */}
            <header className="text-center border-b-2 border-amber-700 pb-6 mb-8">
                <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-slate-900 font-serif">
                    {personalInfo?.firstName} <span className="text-amber-800 font-light">{personalInfo?.lastName}</span>
                </h1>
                
                <p className="text-[13px] font-sans font-bold tracking-[0.25em] text-slate-500 mt-2 uppercase">
                    {resume.profession}
                </p>
                
                {/* Contact Subgrid */}
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-[13px] font-sans text-slate-600 mt-4">
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.email && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-amber-600 hidden sm:inline-block" />
                            <span>{personalInfo.email}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.state || personalInfo?.country) && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-amber-600 hidden sm:inline-block" />
                            <span>
                                {[personalInfo?.city, personalInfo?.state, personalInfo?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </>
                    )}
                </div>

                {/* Hyperlinks row */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[12px] font-sans text-amber-800 font-semibold mt-2.5">
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
                            className="hover:text-amber-900 hover:underline underline-offset-4 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </header>

            {/* Split Corporate Layout: Left (Main) & Right (Sidebar details) */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                
                {/* Left Side (Core History & Profile) */}
                <main className="md:w-[68%] space-y-8 font-sans">
                    
                    {/* Professional Summary */}
                    {hasSummary && (
                        <section>
                            <h2 className="font-serif text-[16px] font-bold text-amber-900 uppercase tracking-wider mb-3">
                                Executive Profile
                            </h2>
                            <p className="text-[13.5px] text-slate-700 leading-relaxed text-justify font-sans">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Work History */}
                    {hasExperience && (
                        <section>
                            <h2 className="font-serif text-[16px] font-bold text-amber-900 uppercase tracking-wider mb-4 border-b border-amber-800/20 pb-1">
                                Leadership & Experience
                            </h2>
                            
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1.5">
                                            <h3 className="font-bold text-[15px] text-slate-900 font-sans">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[12px] font-semibold text-amber-800 uppercase tracking-wider whitespace-nowrap">
                                                {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-[13px] font-medium italic text-slate-500 mb-2">
                                            {exp.company} {exp.location && <span>| {exp.location}</span>}
                                        </p>
                                        
                                        <ul className="list-disc ml-4 space-y-1.5 text-[13.5px] text-slate-700 marker:text-amber-700">
                                            {(exp.description || []).map((item, i) => item.trim() && (
                                                <li key={i} className="pl-0.5 text-justify">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Key Strategic Projects */}
                    {hasProjects && (
                        <section>
                            <h2 className="font-serif text-[16px] font-bold text-amber-900 uppercase tracking-wider mb-4 border-b border-amber-800/20 pb-1">
                                Strategic Initiatives
                            </h2>

                            <div className="space-y-5">
                                {projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {project.github || project.liveDemo ? (
                                                    <a
                                                        href={withProtocol(project.github || project.liveDemo)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-bold text-[14px] text-slate-900 hover:text-amber-800 transition-colors"
                                                    >
                                                        {project.title}
                                                    </a>
                                                ) : (
                                                    <h3 className="font-bold text-[14px] text-slate-900">
                                                        {project.title}
                                                    </h3>
                                                )}
                                            </div>
                                            
                                            <div className="flex gap-2.5 text-[11px] font-semibold tracking-wider text-amber-800 uppercase">
                                                {project.github && <a href={withProtocol(project.github)} target="_blank" rel="noopener noreferrer" className="hover:underline">Source</a>}
                                                {project.liveDemo && <a href={withProtocol(project.liveDemo)} target="_blank" rel="noopener noreferrer" className="hover:underline">Execution</a>}
                                            </div>
                                        </div>

                                        {(project.techStack || []).length > 0 && (
                                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                                                Scope: {project.techStack.join(" / ")}
                                            </p>
                                        )}

                                        <ul className="list-disc ml-4 space-y-1 text-[13.5px] text-slate-700 marker:text-amber-700">
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

                {/* Right Side (Skills, Credentials & Accolades) */}
                <aside className="md:w-[32%] space-y-8 font-sans">
                    
                    {/* Skills Breakdown */}
                    {hasSkills && (
                        <div>
                            <h2 className="font-serif text-[15px] font-bold text-amber-900 uppercase tracking-wider mb-3 border-b border-amber-800/20 pb-1">
                                Expertise
                            </h2>
                            <div className="flex flex-col space-y-2 text-[13px] text-slate-700 font-medium">
                                {skills.map((skill, index) => skill.trim() && (
                                    <div key={index} className="flex items-center gap-2 border-b border-slate-100 pb-1">
                                        <span className="text-amber-700">✦</span>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic History */}
                    {hasEducation && (
                        <div>
                            <h2 className="font-serif text-[15px] font-bold text-amber-900 uppercase tracking-wider mb-3 border-b border-amber-800/20 pb-1">
                                Credentials
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-[13px]">
                                        <p className="font-bold text-slate-800 leading-tight">{edu.degree}</p>
                                        {edu.fieldOfStudy && <p className="text-slate-600 text-[12px]">{edu.fieldOfStudy}</p>}
                                        <p className="text-slate-500 text-[12px] mt-0.5">{edu.school}</p>
                                        <p className="text-[11px] font-medium text-amber-800 tracking-wider mt-0.5">
                                            {formatMonthYear(edu.startDate)} – {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endDate)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Professional Certifications */}
                    {hasCertifications && (
                        <div>
                            <h2 className="font-serif text-[15px] font-bold text-amber-900 uppercase tracking-wider mb-3 border-b border-amber-800/20 pb-1">
                                Certifications
                            </h2>
                            <div className="space-y-3 text-[13px]">
                                {certifications.map((cert, index) => cert.title?.trim() && (
                                    <div key={index} className="leading-tight">
                                        <p className="font-semibold text-slate-800">{cert.title}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages Section */}
                    {hasLanguages && (
                        <div>
                            <h2 className="font-serif text-[15px] font-bold text-amber-900 uppercase tracking-wider mb-3 border-b border-amber-800/20 pb-1">
                                Languages
                            </h2>
                            <ul className="text-[13px] space-y-1.5 text-slate-700">
                                {languages.map((lang, index) => lang.language?.trim() && (
                                    <li key={index} className="flex justify-between">
                                        <span className="font-medium text-slate-800">{lang.language}</span>
                                        <span className="text-slate-400 italic text-[12px]">{lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Executive Key Highlights */}
                    {hasHighlights && (
                        <div>
                            <h2 className="font-serif text-[15px] font-bold text-amber-900 uppercase tracking-wider mb-2 border-b border-amber-800/20 pb-1">
                                Key Distinctions
                            </h2>
                            <ul className="space-y-2 text-[13px] text-slate-700 list-none">
                                {resume.achievements.map((item, index) => item.trim() && (
                                    <li key={index} className="flex items-start gap-2 text-justify">
                                        <span className="text-amber-700 font-bold">▪</span>
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

export default Executive;