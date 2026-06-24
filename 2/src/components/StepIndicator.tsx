

interface Step {
  icon: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ steps, currentStep, totalSteps }: StepIndicatorProps) {
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs text-indigo-600 font-semibold">
          مرحله {currentStep + 1} از {totalSteps}
        </span>
        <span className="text-xs text-slate-500">{steps[currentStep]?.title}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 progress-bar"
          style={{ width: `${Math.max(progress, 5)}%` }}
        />
      </div>

      {/* Step dots - scrollable on mobile */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 z-0" />
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center z-10 gap-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-300 border-2 ${
                idx < currentStep
                  ? 'bg-indigo-500 border-indigo-500 text-white scale-90'
                  : idx === currentStep
                  ? 'bg-white border-indigo-500 text-indigo-600 scale-110 shadow-lg shadow-indigo-100 step-active'
                  : 'bg-white border-slate-200 text-slate-300'
              }`}
            >
              {idx < currentStep ? '✓' : step.icon}
            </div>
            <span className={`text-[10px] font-medium max-w-[60px] text-center leading-tight ${
              idx === currentStep ? 'text-indigo-600' : idx < currentStep ? 'text-slate-500' : 'text-slate-300'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
