import Education from "../resume/Education";
import StepNavigation from "./StepNavigation";

const EducationStep = ({
    formData,
    setFormData,
    onPrevious,
    onNext,
}) => {
    return (
        <>
            <Education
                formData={formData}
                setFormData={setFormData}
            />

            <StepNavigation
                onPrevious={onPrevious}
                onNext={onNext}
            />
        </>
    );
};

export default EducationStep;