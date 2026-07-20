import { User, Mail, Phone, MapPin, Globe, Link2, Code2, Briefcase } from "lucide-react";

const inputClass = (hasError) =>
    `w-full bg-white/[0.04] border text-sm text-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:bg-white/[0.07] placeholder-gray-600 transition-all shadow-inner ${
        hasError
            ? "border-red-500/50 focus:border-red-500/70"
            : "border-white/10 focus:border-[#fbbf24]/50"
    }`;

const Field = ({
    name,
    label,
    type = "text",
    placeholder,
    required,
    span,
    icon: Icon,
    value,
    onChange,
    error,
}) => (
    <div className={span ? "md:col-span-2" : ""}>
        <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2 px-1">
            {label}
            {required && <span className="text-red-400"> *</span>}
        </label>

        <div className="relative">
            <Icon className="w-4 h-4 text-[#fbbf24]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange}
                className={inputClass(!!error)}
            />
        </div>

        {error && (
            <p className="text-red-400 text-xs font-semibold mt-1.5 px-1">
                {error}
            </p>
        )}
    </div>
);

const SectionHeading = ({ children }) => (
    <div className="flex items-center gap-3 mb-4">
        <span className="w-1.5 h-4 bg-gradient-to-b from-[#fbbf24] to-[#d97706] rounded-full"></span>
        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {children}
        </h3>
    </div>
);

const PersonalInfo = ({
    formData,
    setFormData,
    errors = {},
}) => {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value,
            },
        }));
    };

    const personalInfo = formData?.personalInfo || {};

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/[0.03] via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
                    Personal Information
                </h2>
                <p className="text-sm text-gray-400 font-medium mb-7">
                    Tell us who you are and how people can reach you.
                </p>

                {/* Basic Details */}
                <div className="mb-8">
                    <SectionHeading>Basic Details</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="firstName" label="First Name" placeholder="John" required icon={User} value={personalInfo.firstName} onChange={handleChange} error={errors.firstName} />
                        <Field name="lastName" label="Last Name" placeholder="Doe" required icon={User} value={personalInfo.lastName} onChange={handleChange} error={errors.lastName} />
                    </div>
                </div>

                {/* Contact Details */}
                <div className="mb-8 pt-6 border-t border-white/5">
                    <SectionHeading>Contact Details</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="email" label="Email" type="email" placeholder="name@domain.com" required icon={Mail} value={personalInfo.email} onChange={handleChange} error={errors.email} />
                        <Field name="phone" label="Phone Number" type="tel" placeholder="+91 98765 43210" icon={Phone} value={personalInfo.phone} onChange={handleChange} error={errors.phone} />
                        <Field name="address" label="Address" placeholder="Street, Area" span icon={MapPin} value={personalInfo.address} onChange={handleChange} error={errors.address} />
                        <Field name="city" label="City" placeholder="Mumbai" icon={MapPin} value={personalInfo.city} onChange={handleChange} error={errors.city} />
                        <Field name="state" label="State" placeholder="Maharashtra" icon={MapPin} value={personalInfo.state} onChange={handleChange} error={errors.state} />
                        <Field name="country" label="Country" placeholder="India" icon={MapPin} value={personalInfo.country} onChange={handleChange} error={errors.country} />
                    </div>
                </div>

                {/* Social & Web Presence */}
                <div className="pt-6 border-t border-white/5">
                    <SectionHeading>Social & Web Presence</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="linkedin" label="LinkedIn Profile" type="url" placeholder="linkedin.com/in/johndoe" icon={Briefcase} value={personalInfo.linkedin} onChange={handleChange} error={errors.linkedin} />
                        <Field name="github" label="GitHub Profile" type="url" placeholder="github.com/johndoe" icon={Code2} value={personalInfo.github} onChange={handleChange} error={errors.github} />
                        <Field name="portfolio" label="Portfolio" type="url" placeholder="yourportfolio.com" icon={Link2} value={personalInfo.portfolio} onChange={handleChange} error={errors.portfolio} />
                        <Field name="website" label="Personal Website" type="url" placeholder="yourwebsite.com" icon={Globe} value={personalInfo.website} onChange={handleChange} error={errors.website} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
