interface OptionCardProps {
  icon?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ icon, label, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`option-card w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all duration-200 ${
        selected
          ? `border-indigo-400 bg-indigo-50 shadow-md shadow-indigo-100 selected`
          : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30'
      }`}
    >
      {icon && (
        <span className="text-xl flex-shrink-0">{icon}</span>
      )}
      <span className={`text-sm font-medium flex-1 ${selected ? 'text-indigo-700' : 'text-slate-700'}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}
