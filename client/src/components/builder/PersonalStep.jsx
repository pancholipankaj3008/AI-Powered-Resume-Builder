import PersonalInfo from "../resume/PersonalInfo";
import StepNavigation from "./StepNavigation";

const PersonalStep = ({
    formData,
    setFormData,
    errors,
    onPrevious,
    onNext,
}) => {
    return (
        <>
            <PersonalInfo
                formData={formData}
                setFormData={setFormData}
                errors={errors}
            />

            <StepNavigation
                onPrevious={onPrevious}
                onNext={onNext}
            />
        </>
    );
};

export default PersonalStep;