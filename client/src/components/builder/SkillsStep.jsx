import Skills from "../resume/Skills";
import StepNavigation from "./StepNavigation";

const SkillsStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
}) => {
    return (
        <>
            <Skills
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

export default SkillsStep;