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

    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold">
                    Certifications
                </h2>

                <button
                    type="button"
                    onClick={addCertification}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Certification
                </button>

            </div>

            {(formData.certifications || []).map((certification, index) => (

                <div
                    key={index}
                    className="border rounded-lg p-4 mb-5"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="title"
                            placeholder="Certification Title"
                            value={certification.title}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="issuer"
                            placeholder="Issuing Organization"
                            value={certification.issuer}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="date"
                            name="issueDate"
                            value={
                                certification.issueDate
                                    ? certification.issueDate.slice(0, 10)
                                    : ""
                            }
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="credentialId"
                            placeholder="Credential ID"
                            value={certification.credentialId}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="url"
                            name="credentialURL"
                            placeholder="Credential URL"
                            value={certification.credentialURL}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2 md:col-span-2"
                        />

                    </div>

                    <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Remove
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Certifications;