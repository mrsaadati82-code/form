import { FormData } from '../types';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const budgetRanges = [
  { val: 'lt10', icon: '💰', label: 'کمتر از ۱۰ میلیون تومان', desc: 'بودجه محدود' },
  { val: '10-20', icon: '💰💰', label: '۱۰ تا ۲۰ میلیون تومان', desc: 'بودجه متوسط' },
  { val: '20-40', icon: '💰💰💰', label: '۲۰ تا ۴۰ میلیون تومان', desc: 'بودجه خوب' },
  { val: '40-80', icon: '💎', label: '۴۰ تا ۸۰ میلیون تومان', desc: 'پروژه حرفه‌ای' },
  { val: 'gt80', icon: '🏆', label: 'بیشتر از ۸۰ میلیون تومان', desc: 'پروژه سازمانی' },
  { val: 'unknown', icon: '🤷', label: 'نمی‌دانم، پیشنهاد بدهید', desc: 'بر اساس نیازم تعیین کنید' },
];

export default function Step8Budget({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">💡</div>
        <h2 className="text-2xl font-bold text-slate-800">بودجه تقریبی</h2>
        <p className="text-slate-500 text-sm mt-1">این کمک می‌کند پکیج مناسب معرفی کنیم</p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
        <span className="text-xl">💡</span>
        <p className="text-sm text-indigo-700 leading-relaxed">
          بودجه شما هیچ تأثیری بر کیفیت پیشنهاد ما ندارد. این اطلاعات فقط برای معرفی پکیج مناسب است.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {budgetRanges.map(opt => (
          <button
            key={opt.val}
            type="button"
            onClick={() => onChange('budget', opt.val)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
              data.budget === opt.val
                ? 'border-indigo-400 bg-indigo-50 shadow-md'
                : 'border-slate-100 bg-white hover:border-indigo-200'
            }`}
          >
            <span className="text-xl w-8 text-center flex-shrink-0">{opt.icon}</span>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${data.budget === opt.val ? 'text-indigo-700' : 'text-slate-700'}`}>
                {opt.label}
              </div>
              <div className="text-xs text-slate-400">{opt.desc}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              data.budget === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
            }`}>
              {data.budget === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          توضیحات تکمیلی <span className="text-slate-400 text-xs">(اختیاری)</span>
        </label>
        <textarea
          rows={3}
          placeholder="هر چیزی که فکر می‌کنید مهم است و در سوالات بالا نبود، اینجا بنویسید..."
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none bg-white text-slate-800 placeholder:text-slate-300 text-sm transition-all resize-none"
          onChange={e => onChange('activityField', e.target.value)}
          value={data.activityField}
        />
      </div>
    </div>
  );
}
