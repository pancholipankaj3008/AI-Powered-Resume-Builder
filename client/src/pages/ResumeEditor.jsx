import ResumeForm from "../components/resume/ResumeForm";

const ResumeEditor = () => {
    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Resume Editor
            </h1>

            <ResumeForm />

        </div>
    );
};

export default ResumeEditor;