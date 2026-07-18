const StepNavigation = ({
    onPrevious,
    onNext,
    onSkip,
    showSkip = false,
    nextText = "Next",
}) => {
    return (
        <div className="flex justify-between items-center mt-8">

            <button
                type="button"
                onClick={onPrevious}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
                ← Previous
            </button>

            <div className="flex gap-3">

                {showSkip && (
                    <button
                        type="button"
                        onClick={onSkip}
                        className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Skip
                    </button>
                )}

                <button
                    onClick={onNext}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {nextText}
                </button>

            </div>

        </div>
    );
};

export default StepNavigation;