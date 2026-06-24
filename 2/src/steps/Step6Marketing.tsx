import { FormData } from '../types';

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string | string[]) => void;
}

const marketingFeatures = [
  {
    key: 'basicSeo' as keyof FormData,
    icon: '🔍',
    label: 'سئو اولیه سایت',
    desc: 'بهینه‌سازی برای موتورهای جستجو',
  },
  {
    key: 'googleAnalytics' as keyof FormData,
    icon: '📊',
    label: 'گوگل آنالیتیکس و سرچ کنسول',
    desc: 'آمار بازدید و عملکرد سایت',
  },
  {
    key: 'socialMediaConnect' as keyof FormData,
    icon: '📱',
    label: 'اتصال به اینستاگرام و شبکه‌های اجتماعی',
    desc: 'نمایش پست‌ها و لینک‌های شبکه اجتماعی',
  },
  {
    key: 'smsNotification' as keyof FormData,
    icon: '💬',
    label: 'پیامک اطلاع‌رسانی سفارشات',
    desc: 'ارسال پیامک وضعیت سفارش به مشتری',
  },
];

const infraFeatures = [
  {
    key: 'hasDomain' as keyof FormData,
    icon: '🌐',
    label: 'دامنه (.ir یا .com) تهیه شده',
    desc: 'آدرس اینترنتی سایت',
  },
  {
    key: 'hasHosting' as keyof FormData,
    icon: '🖥️',
    label: 'هاست تهیه شده',
    desc: 'فضای میزبانی سایت',
  },
  {
    key: 'orgEmail' as keyof FormData,
    icon: '📧',
    label: 'ایمیل سازمانی',
    desc: 'مثلاً: info@yourbrand.com',
  },
];

export default function Step6Marketing({ data, onChange }: Props) {
  const toggle = (key: keyof FormData) => {
    onChange(key, (data[key] as string) === 'yes' ? 'no' : 'yes');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📈</div>
        <h2 className="text-2xl font-bold text-slate-800">سئو، بازاریابی و زیرساخت</h2>
        <p className="text-slate-500 text-sm mt-1">رشد و دیده شدن سایت</p>
      </div>

      {/* Marketing */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          امکانات بازاریابی:
        </label>
        <div className="grid grid-cols-1 gap-2">
          {marketingFeatures.map(feature => (
            <button
              key={feature.key}
              type="button"
              onClick={() => toggle(feature.key)}
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

      {/* Infrastructure */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          زیرساخت‌های موجود:
        </label>
        <div className="grid grid-cols-1 gap-2">
          {infraFeatures.map(feature => (
            <button
              key={feature.key}
              type="button"
              onClick={() => toggle(feature.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all ${
                data[feature.key] === 'yes'
                  ? 'border-emerald-400 bg-emerald-50 shadow-md'
                  : 'border-slate-100 bg-white hover:border-emerald-200'
              }`}
            >
              <span className="text-xl">{feature.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${data[feature.key] === 'yes' ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {feature.label}
                </div>
                <div className="text-xs text-slate-400">{feature.desc}</div>
              </div>
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                data[feature.key] === 'yes' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
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
    </div>
  );
}
