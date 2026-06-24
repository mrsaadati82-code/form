import { FormData } from '../types';
import CheckboxCard from '../components/CheckboxCard';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const goals = [
  { id: 'online-sales', icon: '🛒', label: 'فروش آنلاین' },
  { id: 'product-intro', icon: '📦', label: 'معرفی محصولات' },
  { id: 'bulk-order', icon: '🏭', label: 'دریافت سفارش عمده' },
  { id: 'agency', icon: '🤝', label: 'نمایندگی فروش' },
  { id: 'brand-trust', icon: '⭐', label: 'افزایش اعتبار برند' },
];

export default function Step1Business({ data, onChange }: Props) {
  const toggleGoal = (id: string) => {
    const current = data.mainGoals || [];
    const updated = current.includes(id) ? current.filter(g => g !== id) : [...current, id];
    onChange('mainGoals', updated);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🏪</div>
        <h2 className="text-2xl font-bold text-slate-800">اطلاعات کسب‌وکار</h2>
        <p className="text-slate-500 text-sm mt-1">بیایید با هم شروع کنیم!</p>
      </div>

      {/* Brand Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          نام برند یا فروشگاه <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="مثلاً: ظروف آریا، فروشگاه گلدیس، ..."
          value={data.brandName}
          onChange={e => onChange('brandName', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none bg-white text-slate-800 placeholder:text-slate-300 text-sm transition-all"
        />
      </div>

      {/* Has Site */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          آیا در حال حاضر سایت دارید؟
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'yes', icon: '✅', label: 'بله، دارم' },
            { val: 'no', icon: '❌', label: 'خیر، ندارم' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('hasSite', opt.val)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.hasSite === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current site URL */}
      {data.hasSite === 'yes' && (
        <div className="space-y-2 animate-fade-in-up">
          <label className="block text-sm font-semibold text-slate-700">
            آدرس سایت فعلی
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            value={data.currentSiteUrl}
            onChange={e => onChange('currentSiteUrl', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none bg-white text-slate-800 placeholder:text-slate-300 text-sm transition-all"
            dir="ltr"
          />
        </div>
      )}

      {/* Main Goals */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          هدف اصلی از راه‌اندازی سایت چیست؟ <span className="text-slate-400 text-xs">(می‌توانید چند مورد انتخاب کنید)</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {goals.map(g => (
            <CheckboxCard
              key={g.id}
              icon={g.icon}
              label={g.label}
              selected={(data.mainGoals || []).includes(g.id)}
              onClick={() => toggleGoal(g.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
