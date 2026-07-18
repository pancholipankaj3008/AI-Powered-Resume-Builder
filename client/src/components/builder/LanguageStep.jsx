import Languages from "../resume/Languages";
import StepNavigation from "./StepNavigation";

const LanguageStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
}) => {
    return (
        <>
            <Languages
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

export default LanguageStep;