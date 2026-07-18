const Education = ({ formData, setFormData }) => {

    const handleChange = (index, e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => {

            const updatedEducation = [...prev.education];

            updatedEducation[index] = {
                ...updatedEducation[index],
                [name]: type === "checkbox" ? checked : value,
            };

            return {
                ...prev,
                education: updatedEducation,
            };
        });
    };

    const addEducation = () => {

        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    school: "",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    currentlyStudying: false,
                    grade: "",
                    description: "",
                },
            ],
        }));
    };

    const removeEducation = (index) => {

        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    

    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold">
                    Education
                </h2>

                <button
                    type="button"
                    onClick={addEducation}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Education
                </button>

            </div>

            {(formData.education || []).map((edu, index) => (

                <div
                    key={index}
                    className="border rounded-lg p-5 mb-5"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="school"
                            placeholder="School / College"
                            value={edu.school || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="degree"
                            placeholder="Degree"
                            value={edu.degree || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="fieldOfStudy"
                            placeholder="Field of Study"
                            value={edu.fieldOfStudy || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="grade"
                            placeholder="Grade / CGPA"
                            value={edu.grade || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="date"
                            name="startDate"
                            value={edu.startDate ? edu.startDate.slice(0, 10) : ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <input
                            type="date"
                            name="endDate"
                            value={edu.endDate ? edu.endDate.slice(0, 10) : ""}
                            disabled={edu.currentlyStudying}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                    </div>

                    <label className="flex items-center gap-2 mt-4">

                        <input
                            type="checkbox"
                            name="currentlyStudying"
                            checked={edu.currentlyStudying || false}
                            onChange={(e) => handleChange(index, e)}
                        />

                        Currently Studying Here

                    </label>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={edu.description || ""}
                        onChange={(e) => handleChange(index, e)}
                        rows={4}
                        className="border rounded p-2 w-full mt-4"
                    />

                    <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Remove
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Education;