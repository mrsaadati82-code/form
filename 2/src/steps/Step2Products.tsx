import { FormData } from '../types';
import CheckboxCard from '../components/CheckboxCard';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const productCounts = [
  { val: 'lt50', icon: '📦', label: 'کمتر از ۵۰ محصول', desc: 'مناسب شروع کار' },
  { val: '50-200', icon: '📦📦', label: '۵۰ تا ۲۰۰ محصول', desc: 'فروشگاه متوسط' },
  { val: '200-1000', icon: '🏪', label: '۲۰۰ تا ۱۰۰۰ محصول', desc: 'فروشگاه بزرگ' },
  { val: 'gt1000', icon: '🏬', label: 'بیشتر از ۱۰۰۰ محصول', desc: 'فروشگاه سازمانی' },
];

const contentItems = [
  { id: 'images', icon: '🖼️', label: 'تصاویر محصولات' },
  { id: 'descriptions', icon: '📝', label: 'توضیحات محصولات' },
  { id: 'prices', icon: '💰', label: 'قیمت‌ها' },
  { id: 'specs', icon: '📋', label: 'مشخصات فنی' },
];

const uploaders = [
  { val: 'client', icon: '👤', label: 'کارفرما (خودم)' },
  { val: 'designer', icon: '💻', label: 'طراح سایت' },
  { val: 'both', icon: '🤝', label: 'به صورت مشترک' },
];

export default function Step2Products({ data, onChange }: Props) {
  const toggleContent = (id: string) => {
    const current = data.contentReady || [];
    const updated = current.includes(id) ? current.filter(g => g !== id) : [...current, id];
    onChange('contentReady', updated);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📦</div>
        <h2 className="text-2xl font-bold text-slate-800">محصولات</h2>
        <p className="text-slate-500 text-sm mt-1">بگویید چه محصولاتی دارید</p>
      </div>

      {/* Product count */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          حدوداً چند محصول دارید؟
        </label>
        <div className="grid grid-cols-1 gap-2">
          {productCounts.map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('productCount', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
                data.productCount === opt.val
                  ? 'border-indigo-400 bg-indigo-50 shadow-md'
                  : 'border-slate-100 bg-white hover:border-indigo-200'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${data.productCount === opt.val ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-slate-400">{opt.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.productCount === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.productCount === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Has variants */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          محصولات دارای تنوع هستند؟
        </label>
        <p className="text-xs text-slate-400">مثلاً رنگ، سایز، مدل، طرح و ...</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'yes', icon: '✅', label: 'بله، دارند' },
            { val: 'no', icon: '❌', label: 'خیر، ندارند' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('hasVariants', opt.val)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.hasVariants === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content ready */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          اطلاعات محصولات آماده است؟ <span className="text-slate-400 text-xs">(هر چه آماده است تیک بزنید)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {contentItems.map(item => (
            <CheckboxCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              selected={(data.contentReady || []).includes(item.id)}
              onClick={() => toggleContent(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Content uploader */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          چه کسی محصولات را در سایت وارد می‌کند؟
        </label>
        <div className="grid grid-cols-1 gap-2">
          {uploaders.map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange('contentUploader', opt.val)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.contentUploader === opt.val
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="flex-1 text-right">{opt.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                data.contentUploader === opt.val ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data.contentUploader === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
