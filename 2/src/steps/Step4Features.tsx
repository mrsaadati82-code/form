import { FormData } from '../types';
import CheckboxCard from '../components/CheckboxCard';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const shippingMethods = [
  { id: 'post', icon: '📮', label: 'پست' },
  { id: 'tipax', icon: '🚚', label: 'تیپاکس / پیک موتوری' },
  { id: 'courier', icon: '🏍️', label: 'پیک اختصاصی' },
  { id: 'inperson', icon: '🏪', label: 'تحویل حضوری' },
];

const yesNoFeatures = [
  { key: 'onlineOrder' as keyof FormData, icon: '🛒', label: 'ثبت سفارش آنلاین', desc: 'مشتری بتواند سفارش ثبت کند' },
  { key: 'paymentGateway' as keyof FormData, icon: '💳', label: 'درگاه پرداخت آنلاین', desc: 'پرداخت آنلاین با کارت بانکی' },
  { key: 'autoShippingCalc' as keyof FormData, icon: '📦', label: 'محاسبه هزینه ارسال خودکار', desc: 'بر اساس وزن و مقصد' },
  { key: 'discountCode' as keyof FormData, icon: '🎫', label: 'کد تخفیف', desc: 'اعمال کوپن و تخفیف' },
  { key: 'userAuth' as keyof FormData, icon: '👤', label: 'ثبت‌نام و ورود کاربران', desc: 'پنل کاربری شخصی' },
  { key: 'wishlist' as keyof FormData, icon: '❤️', label: 'علاقه‌مندی‌ها (Wishlist)', desc: 'ذخیره محصولات موردعلاقه' },
  { key: 'compareProducts' as keyof FormData, icon: '⚖️', label: 'مقایسه محصولات', desc: 'مقایسه ویژگی محصولات' },
  { key: 'liveChat' as keyof FormData, icon: '💬', label: 'چت آنلاین', desc: 'پشتیبانی آنلاین با مشتری' },
  { key: 'multiVendor' as keyof FormData, icon: '🏬', label: 'چند فروشنده (Multi-Vendor)', desc: 'چند فروشنده در یک سایت' },
];

export default function Step4Features({ data, onChange }: Props) {
  const toggleShipping = (id: string) => {
    const current = data.shippingMethod || [];
    const updated = current.includes(id) ? current.filter(g => g !== id) : [...current, id];
    onChange('shippingMethod', updated);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">⚙️</div>
        <h2 className="text-2xl font-bold text-slate-800">امکانات فروشگاه</h2>
        <p className="text-slate-500 text-sm mt-1">چه قابلیت‌هایی نیاز دارید؟</p>
      </div>

      {/* Yes/No features */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          امکانات موردنیاز را انتخاب کنید:
        </label>
        <div className="grid grid-cols-1 gap-2">
          {yesNoFeatures.map(feature => (
            <button
              key={feature.key}
              type="button"
              onClick={() => onChange(feature.key, (data[feature.key] as string) === 'yes' ? 'no' : 'yes')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
                data[feature.key] === 'yes'
                  ? 'border-indigo-400 bg-indigo-50 shadow-md'
                  : 'border-slate-100 bg-white hover:border-indigo-200'
              }`}
            >
              <span className="text-xl">{feature.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${data[feature.key] === 'yes' ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {feature.label}
                </div>
                <div className="text-xs text-slate-400">{feature.desc}</div>
              </div>
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                data[feature.key] === 'yes' ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
              }`}>
                {data[feature.key] === 'yes' && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shipping methods */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          روش‌های ارسال <span className="text-slate-400 text-xs">(چند مورد قابل انتخاب)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {shippingMethods.map(item => (
            <CheckboxCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              selected={(data.shippingMethod || []).includes(item.id)}
              onClick={() => toggleShipping(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
