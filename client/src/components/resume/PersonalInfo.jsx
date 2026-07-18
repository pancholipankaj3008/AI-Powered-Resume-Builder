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
        <div className="border rounded-lg p-5">

            <h2 className="text-2xl font-semibold mb-5">
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={personalInfo.firstName || ""}
                    onChange={handleChange}
                    className={`border rounded p-2 ${
    errors.firstName
        ? "border-red-500"
        : "border-gray-300"
}`}
                />

                {errors.firstName && (
    <p className="text-red-500 text-sm">
        {errors.firstName}
    </p>
)}

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={personalInfo.lastName || ""}
                    onChange={handleChange}
                    className={`border rounded p-2 ${
    errors.lastName
        ? "border-red-500"
        : "border-gray-300"
}`}
                />
                {errors.lastName && (
    <p className="text-red-500 text-sm">
        {errors.lastName}
    </p>
)}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={personalInfo.email || ""}
                    onChange={handleChange}
                    className={`border rounded p-2 ${
    errors.email
        ? "border-red-500"
        : "border-gray-300"
}`}
                />
                {errors.email && (
    <p className="text-red-500 text-sm">
        {errors.email}
    </p>
)}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={personalInfo.phone || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={personalInfo.address || ""}
                    onChange={handleChange}
                    className="border rounded p-2 md:col-span-2"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={personalInfo.city || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={personalInfo.state || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={personalInfo.country || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile"
                    value={personalInfo.linkedin || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="url"
                    name="github"
                    placeholder="GitHub Profile"
                    value={personalInfo.github || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="url"
                    name="portfolio"
                    placeholder="Portfolio"
                    value={personalInfo.portfolio || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="url"
                    name="website"
                    placeholder="Personal Website"
                    value={personalInfo.website || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

            </div>

        </div>
    );
};

export default PersonalInfo;