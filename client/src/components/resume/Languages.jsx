const Languages = ({ formData, setFormData }) => {

    const handleChange = (index, e) => {

        const { name, value } = e.target;

        setFormData((prev) => {

            const updatedLanguages = [...prev.languages];

            updatedLanguages[index] = {
                ...updatedLanguages[index],
                [name]: value,
            };

            return {
                ...prev,
                languages: updatedLanguages,
            };
        });
    };

    const addLanguage = () => {

        setFormData((prev) => ({
            ...prev,
            languages: [
                ...prev.languages,
                {
                    language: "",
                    proficiency: "Beginner",
                },
            ],
        }));
    };

    const removeLanguage = (index) => {

        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="border rounded-lg p-5">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold">
                    Languages
                </h2>

                <button
                    type="button"
                    onClick={addLanguage}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Language
                </button>

            </div>

            {(formData.languages || []).map((language, index) => (

                <div
                    key={index}
                    className="border rounded-lg p-4 mb-5"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="language"
                            placeholder="Language"
                            value={language.language}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        />

                        <select
                            name="proficiency"
                            value={language.proficiency}
                            onChange={(e) => handleChange(index, e)}
                            className="border rounded p-2"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Professional">Professional</option>
                            <option value="Native">Native</option>
                        </select>

                    </div>

                    <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Remove
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Languages;