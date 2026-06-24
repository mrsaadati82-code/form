import { FormData } from '../types';
import CheckboxCard from '../components/CheckboxCard';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const pages = [
  { id: 'home', icon: '🏠', label: 'صفحه اصلی' },
  { id: 'shop', icon: '🛍️', label: 'فروشگاه' },
  { id: 'about', icon: 'ℹ️', label: 'درباره ما' },
  { id: 'contact', icon: '📞', label: 'تماس با ما' },
  { id: 'blog', icon: '📰', label: 'وبلاگ' },
  { id: 'faq', icon: '❓', label: 'سوالات متداول' },
  { id: 'rules', icon: '📜', label: 'قوانین و مقررات' },
  { id: 'gallery', icon: '🖼️', label: 'گالری تصاویر' },
];

export default function Step5Pages({ data, onChange }: Props) {
  const togglePage = (id: string) => {
    const current = data.neededPages || [];
    const updated = current.includes(id) ? current.filter(g => g !== id) : [...current, id];
    onChange('neededPages', updated);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📄</div>
        <h2 className="text-2xl font-bold text-slate-800">صفحات و محتوا</h2>
        <p className="text-slate-500 text-sm mt-1">سایتتان چه صفحاتی داشته باشد؟</p>
      </div>

      {/* Pages */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          صفحات موردنیاز را انتخاب کنید:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {pages.map(page => (
            <CheckboxCard
              key={page.id}
              icon={page.icon}
              label={page.label}
              selected={(data.neededPages || []).includes(page.id)}
              onClick={() => togglePage(page.id)}
            />
          ))}
        </div>
      </div>

      {/* Content provider */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          تولید و درج محتوا بر عهده کیست؟
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { val: 'client', icon: '👤', label: 'خودم محتوا تهیه و وارد می‌کنم' },
            { val: 'designer', icon: '✍️', label: 'طراح سایت محتوا تهیه کند' },
            { val: 'both', icon: '🤝', label: 'مشترک تهیه می‌کنیم' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('contentProvider', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.contentProvider === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="flex-1 text-right">{opt.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.contentProvider === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.contentProvider === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
