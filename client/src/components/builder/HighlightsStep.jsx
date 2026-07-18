import Achievements from "../resume/Achievements";
import StepNavigation from "./StepNavigation";

const HighlightsStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
    loading,
}) => {
    return (
        <>
            <Achievements
                formData={formData}
                setFormData={setFormData}
            />

            <StepNavigation
                onPrevious={onPrevious}
                onNext={onNext}
                nextText="Create Resume"
                loading={loading}
            />
        </>
    );
};

export default HighlightsStep;