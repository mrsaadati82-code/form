import { FormData } from '../types';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const deliveryTimes = [
  { val: '1month', icon: '🚀', label: 'هرچه زودتر (۱ ماه)', desc: 'پروژه فوری' },
  { val: '2months', icon: '📅', label: 'حدود ۲ ماه', desc: 'زمان معمول' },
  { val: '3months', icon: '🗓️', label: 'حدود ۳ ماه', desc: 'بدون عجله' },
  { val: 'flexible', icon: '🤷', label: 'منعطف هستم', desc: 'کیفیت مهم‌تر است' },
];

const supportDurations = [
  { val: '1month', icon: '1️⃣', label: '۱ ماه' },
  { val: '3months', icon: '3️⃣', label: '۳ ماه' },
  { val: '6months', icon: '6️⃣', label: '۶ ماه' },
  { val: '12months', icon: '🔁', label: '۱۲ ماه' },
];

export default function Step7Support({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🛡️</div>
        <h2 className="text-2xl font-bold text-slate-800">پشتیبانی و زمان‌بندی</h2>
        <p className="text-slate-500 text-sm mt-1">برنامه‌ریزی برای تحویل و پشتیبانی</p>
      </div>

      {/* Delivery time */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          چه زمانی می‌خواهید سایت آماده باشد؟
        </label>
        <div className="grid grid-cols-1 gap-2">
          {deliveryTimes.map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('deliveryTime', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
                data.deliveryTime === opt.val
                  ? 'border-indigo-400 bg-indigo-50 shadow-md'
                  : 'border-slate-100 bg-white hover:border-indigo-200'
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${data.deliveryTime === opt.val ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-slate-400">{opt.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.deliveryTime === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.deliveryTime === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Training */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          آموزش مدیریت سایت نیاز دارید؟
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'yes', icon: '🎓', label: 'بله، آموزش می‌خواهم' },
            { val: 'no', icon: '👍', label: 'خیر، بلدم' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('trainingNeeded', opt.val)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.trainingNeeded === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Support needed */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          پشتیبانی پس از تحویل نیاز دارید؟
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'yes', icon: '🛡️', label: 'بله، می‌خواهم' },
            { val: 'no', icon: '✌️', label: 'خیر، نیازی ندارم' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('supportNeeded', opt.val)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.supportNeeded === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Support duration */}
      {data.supportNeeded === 'yes' && (
        <div className="space-y-2 animate-fade-in-up">
          <label className="block text-sm font-semibold text-slate-700">
            مدت پشتیبانی موردنیاز:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {supportDurations.map(opt => (
              <button
                key={opt.val}
                type="button"
                onClick={() => onChange('supportDuration', opt.val)}
                className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.supportDuration === opt.val
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <span className="text-xs">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
