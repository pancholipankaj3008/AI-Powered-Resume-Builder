import {
    BadgeCheck,
    Building2,
    Calendar,
    Fingerprint,
    Link as LinkIcon,
    Trash2,
    Plus,
} from "lucide-react";

const Certifications = ({ formData, setFormData }) => {

    const handleChange = (index, e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedCertifications = [...prev.certifications];

            updatedCertifications[index] = {
                ...updatedCertifications[index],
                [name]: value,
            };

            return {
                ...prev,
                certifications: updatedCertifications,
            };
        });
    };

    const addCertification = () => {
        setFormData((prev) => ({
            ...prev,
            certifications: [
                ...prev.certifications,
                {
                    title: "",
                    issuer: "",
                    issueDate: "",
                    credentialId: "",
                    credentialURL: "",
                },
            ],
        }));
    };

    const removeCertification = (index) => {
        setFormData((prev) => ({
            ...prev,
            certifications: prev.certifications.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const inputClass =
        "w-full bg-white/[0.04] border border-white/10 text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner";

    const labelClass =
        "block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1";

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        Certifications
                    </h2>

                    <button
                        type="button"
                        onClick={addCertification}
                        className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Certification
                    </button>
                </div>

                <p className="text-sm text-gray-400 font-medium mb-6">
                    Add licenses and certifications that back up your skills.
                </p>

                {(formData?.certifications || []).length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <p className="text-gray-500 text-sm">No certifications added yet.</p>
                    </div>
                )}

                <div className="space-y-5">
                    {(formData.certifications || []).map((certification, index) => (

                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                title="Remove this certification"
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">

                                <div className="md:col-span-2">
                                    <label className={labelClass}>Certification Title</label>
                                    <div className="relative">
                                        <BadgeCheck className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="AWS Certified Solutions Architect"
                                            value={certification.title}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Issuing Organization</label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="issuer"
                                            placeholder="Amazon Web Services"
                                            value={certification.issuer}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Issue Date</label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="date"
                                            name="issueDate"
                                            value={
                                                certification.issueDate
                                                    ? certification.issueDate.slice(0, 10)
                                                    : ""
                                            }
                                            onChange={(e) => handleChange(index, e)}
                                            className={`${inputClass} [color-scheme:dark]`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Credential ID</label>
                                    <div className="relative">
                                        <Fingerprint className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            name="credentialId"
                                            placeholder="ABC123XYZ"
                                            value={certification.credentialId}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass}>Credential URL</label>
                                    <div className="relative">
                                        <LinkIcon className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                                        <input
                                            type="url"
                                            name="credentialURL"
                                            placeholder="credly.com/badges/..."
                                            value={certification.credentialURL}
                                            onChange={(e) => handleChange(index, e)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
};

export default Certifications;