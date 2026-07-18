import Summary from "../resume/Summary";
import StepNavigation from "./StepNavigation";

const SummaryStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
}) => {
    return (
        <>
            <Summary
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

export default SummaryStep;