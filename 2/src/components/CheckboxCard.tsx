interface CheckboxCardProps {
  icon?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function CheckboxCard({ icon, label, selected, onClick }: CheckboxCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`option-card flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all duration-200 ${
        selected
          ? 'border-indigo-400 bg-indigo-50 shadow-md shadow-indigo-100 selected'
          : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30'
      }`}
    >
      {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
      <span className={`text-sm font-medium flex-1 ${selected ? 'text-indigo-700' : 'text-slate-700'}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
      }`}>
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}
