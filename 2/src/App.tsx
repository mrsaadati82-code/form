import { useState } from 'react';
import { FormData } from './types';
import StepIndicator from './components/StepIndicator';
import Step1Business from './steps/Step1Business';
import Step2Products from './steps/Step2Products';
import Step3Design from './steps/Step3Design';
import Step4Features from './steps/Step4Features';
import Step5Pages from './steps/Step5Pages';
import Step6Marketing from './steps/Step6Marketing';
import Step7Support from './steps/Step7Support';
import Step8Budget from './steps/Step8Budget';
import StepResult from './steps/StepResult';

const STEPS = [
  { icon: '🏪', title: 'کسب‌وکار' },
  { icon: '📦', title: 'محصولات' },
  { icon: '🎨', title: 'طراحی' },
  { icon: '⚙️', title: 'امکانات' },
  { icon: '📄', title: 'صفحات' },
  { icon: '📈', title: 'بازاریابی' },
  { icon: '🛡️', title: 'پشتیبانی' },
  { icon: '💡', title: 'بودجه' },
];

const initialData: FormData = {
  brandName: '',
  activityField: '',
  hasSite: '',
  currentSiteUrl: '',
  mainGoals: [],
  productCount: '',
  hasVariants: '',
  contentReady: [],
  contentUploader: '',
  designStyle: '',
  competitorLinks: '',
  hasBranding: '',
  onlineOrder: '',
  paymentGateway: '',
  shippingMethod: [],
  autoShippingCalc: '',
  discountCode: '',
  userAuth: '',
  wishlist: '',
  compareProducts: '',
  liveChat: '',
  multiVendor: '',
  neededPages: [],
  contentProvider: '',
  basicSeo: '',
  googleAnalytics: '',
  socialMediaConnect: '',
  smsNotification: '',
  hasDomain: '',
  hasHosting: '',
  orgEmail: '',
  trainingNeeded: '',
  supportNeeded: '',
  supportDuration: '',
  deliveryTime: '',
  budget: '',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (key: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  const stepComponents = [
    <Step1Business data={formData} onChange={handleChange} />,
    <Step2Products data={formData} onChange={handleChange} />,
    <Step3Design data={formData} onChange={handleChange} />,
    <Step4Features data={formData} onChange={handleChange} />,
    <Step5Pages data={formData} onChange={handleChange} />,
    <Step6Marketing data={formData} onChange={handleChange} />,
    <Step7Support data={formData} onChange={handleChange} />,
    <Step8Budget data={formData} onChange={handleChange} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-50/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-2 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-4">
            <span className="text-sm">🍽️</span>
            <span className="text-sm font-semibold text-slate-700">فرم سفارش طراحی فروشگاه ظروف</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-1">
            امیرحسین سعادتی
          </h1>
          <p className="text-sm text-slate-500">طراح و توسعه‌دهنده وب حرفه‌ای</p>
        </div>
      </header>

      {/* Main Form */}
      <main className="relative z-10 flex-1 px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="glass-card rounded-3xl shadow-xl border border-white/60 overflow-hidden">
            {!submitted ? (
              <>
                {/* Step indicator */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-50">
                  <StepIndicator
                    steps={STEPS}
                    currentStep={currentStep}
                    totalSteps={STEPS.length}
                  />
                </div>

                {/* Step content */}
                <div className="px-6 py-6 min-h-[400px]">
                  {stepComponents[currentStep]}
                </div>

                {/* Navigation */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    {!isFirstStep && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
                      >
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        قبلی
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-100 transition-all"
                    >
                      {isLastStep ? (
                        <>
                          <span>ارسال فرم و دریافت قیمت</span>
                          <span>🚀</span>
                        </>
                      ) : (
                        <>
                          <span>مرحله بعد</span>
                          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Skip note */}
                  <p className="text-center text-xs text-slate-400 mt-3">
                    پاسخ به سوالات اجباری نیست • می‌توانید مراحل را رد کنید
                  </p>
                </div>
              </>
            ) : (
              <div className="px-6 py-8">
                <StepResult data={formData} />
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(0);
                    setFormData(initialData);
                  }}
                  className="w-full mt-6 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  ارسال فرم جدید
                </button>
              </div>
            )}
          </div>

          {/* Trust badges */}
          {!submitted && (
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>🔒</span>
                <span>اطلاعات شما محفوظ است</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>⚡</span>
                <span>پاسخ سریع</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>🎯</span>
                <span>مشاوره رایگان</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-xs text-slate-400">
          طراحی شده توسط <span className="font-semibold text-indigo-600">امیرحسین سعادتی</span> • کلیه حقوق محفوظ است
        </p>
      </footer>
    </div>
  );
}
