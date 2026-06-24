import { FormData } from '../types';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const designStyles = [
  { val: 'minimal', icon: '🤍', label: 'ساده و مینیمال', desc: 'تمیز، کمیاب، بدون شلوغی' },
  { val: 'modern', icon: '⚡', label: 'مدرن و پویا', desc: 'انیمیشن، رنگ‌های جذاب' },
  { val: 'luxury', icon: '💎', label: 'لوکس و شیک', desc: 'کلاس بالا، طراحی اختصاصی' },
  { val: 'similar', icon: '🎯', label: 'مشابه برند خاص', desc: 'لینک نمونه ارسال می‌کنم' },
];

export default function Step3Design({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎨</div>
        <h2 className="text-2xl font-bold text-slate-800">طراحی ظاهری</h2>
        <p className="text-slate-500 text-sm mt-1">سایتتان چه ظاهری داشته باشد؟</p>
      </div>

      {/* Design style */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          سبک طراحی موردنظر
        </label>
        <div className="grid grid-cols-1 gap-2">
          {designStyles.map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('designStyle', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
                data.designStyle === opt.val
                  ? 'border-indigo-400 bg-indigo-50 shadow-md'
                  : 'border-slate-100 bg-white hover:border-indigo-200'
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${data.designStyle === opt.val ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-slate-400">{opt.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.designStyle === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.designStyle === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Competitor link */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          آیا نمونه سایت یا رقیبی مدنظر دارید؟ <span className="text-slate-400 text-xs">(اختیاری)</span>
        </label>
        <textarea
          rows={2}
          placeholder="لینک سایت‌های موردپسندتان را اینجا بنویسید..."
          value={data.competitorLinks}
          onChange={e => onChange('competitorLinks', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none bg-white text-slate-800 placeholder:text-slate-300 text-sm transition-all resize-none"
          dir="ltr"
        />
      </div>

      {/* Logo & branding */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          لوگو و هویت بصری برند آماده است؟
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { val: 'yes', icon: '✅', label: 'بله، لوگو و رنگ‌بندی آماده دارم' },
            { val: 'partial', icon: '🔶', label: 'فقط لوگو دارم، رنگ‌بندی ندارم' },
            { val: 'no', icon: '❌', label: 'خیر، نیاز به طراحی هویت بصری دارم' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('hasBranding', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.hasBranding === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="flex-1 text-right">{opt.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.hasBranding === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.hasBranding === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
