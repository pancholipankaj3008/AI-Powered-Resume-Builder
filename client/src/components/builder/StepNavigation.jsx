const StepNavigation = ({
    onPrevious,
    onNext,
    onSkip,
    showSkip = false,
    nextText = "Next",
    loading = false,
}) => {
    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">

            <button
                type="button"
                onClick={onPrevious}
                disabled={loading}
                className="border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
                ← Previous
            </button>

            <div className="flex gap-3">

                {showSkip && (
                    <button
                        type="button"
                        onClick={onSkip}
                        disabled={loading}
                        className="border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Skip
                    </button>
                )}

                <button
                    type="button"
                    onClick={onNext}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#d97706] text-[#0b0c0e] font-black px-6 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 flex items-center gap-2"
                >
                    {loading && (
                        <span className="w-3.5 h-3.5 border-2 border-[#0b0c0e]/30 border-t-[#0b0c0e] rounded-full animate-spin"></span>
                    )}
                    {loading ? "Please wait..." : nextText}
                </button>

            </div>

        </div>
    );
};

export default StepNavigation;