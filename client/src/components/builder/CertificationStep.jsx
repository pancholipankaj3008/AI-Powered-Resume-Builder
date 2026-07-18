import Certifications from "../resume/Certifications";
import StepNavigation from "./StepNavigation";

const CertificationStep = ({
    formData,
    setFormData,
    onPrevious,
    onSkip,
    onNext,
}) => {
    return (
        <>
            <Certifications
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

export default CertificationStep;