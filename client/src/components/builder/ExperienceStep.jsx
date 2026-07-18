import Experience from "../resume/Experience";
import StepNavigation from "./StepNavigation";

const ExperienceStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
}) => {
    return (
        <>
            <Experience
                formData={formData}
                setFormData={setFormData}
            />

            <StepNavigation
                onPrevious={onPrevious}
                onSkip={onSkip}
                onNext={onNext}
                showSkip
            />
        </>
    );
};

export default ExperienceStep;