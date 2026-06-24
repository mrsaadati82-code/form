import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  Layers, 
  TrendingUp, 
  Search, 
  Award, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Plus, 
  Trash2, 
  Eye, 
  Settings, 
  X, 
  Database, 
  SearchCheck, 
  Zap, 
  Star, 
  MessageCircle 
} from 'lucide-react';

// Define Interface for Submission
interface AssessmentSubmission {
  id: string;
  date: string;
  clientName: string;
  clientPhone: string;
  brandName: string;
  activityType: string;
  hasCurrentSite: boolean;
  currentSiteUrl: string;
  primaryGoals: string[];
  productCount: string;
  hasVariations: boolean;
  productDataStatus: string;
  productUploader: string;
  competitorUrl: string;
  designStyle: string;
  hasLogo: boolean;
  needPaymentGateway: boolean;
  shippingMethods: string[];
  autoShippingCalculation: boolean;
  couponSystem: boolean;
  extraFeatures: string[];
  seoLevel: string;
  seoKeywords: string;
  blogContentNeeded: string;
  hostingStatus: string;
  extraPages: boolean;
  clientBudget: string;
  supportDuration: string;
  clientMessage: string;
  estimatedPrice: number;
  recommendedPackageName: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'form' | 'packages' | 'admin' | 'about'>('form');
  
  // Step State (0 to 6)
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<AssessmentSubmission | null>(null);

  // Search filter for Admin
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedAdminRow, setSelectedAdminRow] = useState<AssessmentSubmission | null>(null);

  // Form Field States
  const [brandName, setBrandName] = useState('');
  const [activityType, setActivityType] = useState('ظروف لوکس پذیرایی و دکوری');
  const [hasCurrentSite, setHasCurrentSite] = useState<boolean>(false);
  const [currentSiteUrl, setCurrentSiteUrl] = useState('');
  const [primaryGoals, setPrimaryGoals] = useState<string[]>(['online_sale', 'seo_ranking']);
  
  const [productCount, setProductCount] = useState<string>('50_200'); // less_50, 50_200, 200_1000, more_1000
  const [hasVariations, setHasVariations] = useState<boolean>(true); // colors, sizes, models
  const [productDataStatus, setProductDataStatus] = useState<string>('images_only'); // ready, images_only, none
  const [productUploader, setProductUploader] = useState<string>('mutual'); // client, designer, mutual
  
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [designStyle, setDesignStyle] = useState<string>('luxury'); // luxury, minimal, traditional, creative
  const [hasLogo, setHasLogo] = useState<boolean>(false); // false = needs logo design
  
  const [needPaymentGateway, setNeedPaymentGateway] = useState<boolean>(true);
  const [shippingMethods, setShippingMethods] = useState<string[]>(['post', 'tipax', 'peyk']);
  const [autoShippingCalculation, setAutoShippingCalculation] = useState<boolean>(true);
  const [couponSystem, setCouponSystem] = useState<boolean>(true);
  const [extraFeatures, setExtraFeatures] = useState<string[]>(['wishlist', 'otp']); // wishlist, comparison, otp, multivendor
  
  const [seoLevel, setSeoLevel] = useState<string>('vip'); // basic, pro, vip (vital for 1st page requirement!)
  const [seoKeywords, setSeoKeywords] = useState('خرید ظروف پذیرایی شیک، سرویس آرکوپال جدید، ظروف سرامیکی مدرن');
  const [blogContentNeeded, setBlogContentNeeded] = useState<string>('yes'); // no, yes
  
  const [hostingStatus, setHostingStatus] = useState<string>('both_needed'); // both_ready, need_host, both_needed
  const [extraPages, setExtraPages] = useState<boolean>(false);
  
  const [clientBudget, setClientBudget] = useState<string>('mid'); // low (15-25m), mid (25-45m), high (45-80m), very_high (80m+)
  const [supportDuration, setSupportDuration] = useState<string>('6_months'); // 3_months, 6_months, 12_months
  
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');

  // Sample seed data for Admin Panel to look extremely professional initially
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([
    {
      id: "REQ-4029",
      date: "۱۴۰۴/۱۲/۰۵",
      clientName: "علیرضا عباسی",
      clientPhone: "09123456789",
      brandName: "کریستال پارس",
      activityType: "واردکننده ظروف کریستال چک و بلورجات لوکس",
      hasCurrentSite: false,
      currentSiteUrl: "",
      primaryGoals: ["online_sale", "seo_ranking", "wholesale"],
      productCount: "200_1000",
      hasVariations: true,
      productDataStatus: "images_only",
      productUploader: "mutual",
      competitorUrl: "https://diakogallery.com",
      designStyle: "luxury",
      hasLogo: false,
      needPaymentGateway: true,
      shippingMethods: ["tipax", "post", "peyk"],
      autoShippingCalculation: true,
      couponSystem: true,
      extraFeatures: ["wishlist", "otp"],
      seoLevel: "vip",
      seoKeywords: "خرید ظروف کریستال اصل، ست پارچ و لیوان لوکس، ظروف پذیرایی عید",
      blogContentNeeded: "yes",
      hostingStatus: "both_needed",
      extraPages: true,
      clientBudget: "mid",
      supportDuration: "6_months",
      clientMessage: "ما می‌خواهیم حتماً در کلمه 'خرید ظروف کریستال لوکس' در صفحه اول گوگل باشیم و رقابت بالایی با بقیه همکاران شوش داریم.",
      estimatedPrice: 38700000,
      recommendedPackageName: "پکیج اول گوگل و فروش بی‌نهایت (VIP Platinum)"
    },
    {
      id: "REQ-3820",
      date: "۱۴۰۴/۱۲/۰۲",
      clientName: "زهرا موسوی",
      clientPhone: "09198765432",
      brandName: "گالری سرامیک آنیتا",
      activityType: "تولیدکننده ظروف سرامیکی دست‌ساز و فانتزی",
      hasCurrentSite: true,
      currentSiteUrl: "anitaceramics.ir (قالب آماده خسته‌کننده)",
      primaryGoals: ["online_sale", "branding"],
      productCount: "less_50",
      hasVariations: true,
      productDataStatus: "ready",
      productUploader: "client",
      competitorUrl: "",
      designStyle: "minimal",
      hasLogo: true,
      needPaymentGateway: true,
      shippingMethods: ["post", "peyk"],
      autoShippingCalculation: false,
      couponSystem: true,
      extraFeatures: ["wishlist"],
      seoLevel: "pro",
      seoKeywords: "ظروف سرامیکی دست‌ساز، ماگ سرامیکی فانتزی، بشقاب مینیاتوری",
      blogContentNeeded: "no",
      hostingStatus: "both_ready",
      extraPages: false,
      clientBudget: "low",
      supportDuration: "3_months",
      clientMessage: "یک قالب ساده و مینیمال با سرعت عالی می‌خواهیم که هنر دست ما را به خوبی نشان دهد.",
      estimatedPrice: 22800000,
      recommendedPackageName: "پکیج فروشگاه طلایی پیشرفته (Golden Pro)"
    }
  ]);

  // Pricing Parameters Configuration
  const pricingParams = {
    basePrice: 16000000, // Base e-commerce setup fee
    products: {
      less_50: 0,
      '50_200': 3000000,
      '200_1000': 7000000,
      more_1000: 13000000
    },
    variations: 2500000,
    logoDesignNeeded: 3500000,
    paymentGateway: 1500000,
    autoShipping: 1200000,
    extraFeatures: {
      wishlist: 1000000,
      comparison: 1500000,
      otp: 3000000, // Mobile SMS login is essential and costly
      multivendor: 14000000 // Large marketplace
    },
    seo: {
      basic: 0,
      pro: 5000000,
      vip: 14500000 // Huge boost for 1st page ranking including keyword research, technical SEO, structured data & Torob link
    },
    blogArticles: 4000000, // content writing setup & seed articles
    hosting: 3800000, // Cloud High Speed Hosting
    extraPagesPrice: 2000000,
    extendedSupport: {
      '3_months': 0,
      '6_months': 4000000,
      '12_months': 8500000
    }
  };

  // Real-time Estimated Price Calculation
  const estimatedPrice = useMemo(() => {
    let total = pricingParams.basePrice;
    
    // 1. Product count
    const pKey = productCount as keyof typeof pricingParams.products;
    total += pricingParams.products[pKey] || 0;
    
    // 2. Variations
    if (hasVariations) total += pricingParams.variations;
    
    // 3. Logo
    if (!hasLogo) total += pricingParams.logoDesignNeeded;
    
    // 4. Payment Gateway
    if (needPaymentGateway) total += pricingParams.paymentGateway;
    
    // 5. Auto Shipping Calculate
    if (autoShippingCalculation) total += pricingParams.autoShipping;
    
    // 6. Extra Tech Features
    extraFeatures.forEach(feature => {
      const fKey = feature as keyof typeof pricingParams.extraFeatures;
      if (pricingParams.extraFeatures[fKey]) {
        total += pricingParams.extraFeatures[fKey];
      }
    });
    
    // 7. SEO Package
    const sKey = seoLevel as keyof typeof pricingParams.seo;
    total += pricingParams.seo[sKey] || 0;
    
    // 8. Blog Content
    if (blogContentNeeded === 'yes') {
      total += pricingParams.blogArticles;
    }
    
    // 9. Hosting & Infrastructure
    if (hostingStatus === 'both_needed' || hostingStatus === 'need_host') {
      total += pricingParams.hosting;
    }
    
    // 10. Extra Pages
    if (extraPages) {
      total += pricingParams.extraPagesPrice;
    }
    
    // 11. Extended Support
    const supKey = supportDuration as keyof typeof pricingParams.extendedSupport;
    total += pricingParams.extendedSupport[supKey] || 0;
    
    return total;
  }, [
    productCount,
    hasVariations,
    hasLogo,
    needPaymentGateway,
    autoShippingCalculation,
    extraFeatures,
    seoLevel,
    blogContentNeeded,
    hostingStatus,
    extraPages,
    supportDuration
  ]);

  // Dynamic Nearest Package Determination
  const recommendedPackage = useMemo(() => {
    const isVipSeo = seoLevel === 'vip';
    const isMultiVendor = extraFeatures.includes('multivendor');
    const isLargeShop = productCount === 'more_1000' || productCount === '200_1000';

    if (isVipSeo || isMultiVendor || isLargeShop || estimatedPrice >= 36000000) {
      return {
        name: "پکیج اول گوگل و فروش بی‌نهایت (VIP Platinum)",
        level: "platinum",
        color: "from-amber-600 to-amber-400 text-amber-950",
        badge: "پکیج پیشنهادی اول گوگل 🚀",
        icon: Sparkles,
        description: "ویژه صنف ظروف برای تصاحب صدر رتبه‌های گوگل، ورود پرقدرت به ترب و جذب خریداران عمده و تکی تشنه‌ی خرید.",
        features: [
          "طراحی اختصاصی با برترین کدهای سئو فرندلی",
          "سئوی محتوایی و تکنیکال پیشرفته با تضمین کلمات کلیدی هدف صنف ظروف",
          "اتصال خودکار به موتور جستجوی ترب (Torob) و ایمالز برای فروش از روز اول",
          "ثبت‌نام و ورود فوق‌سریع پیامکی (کد OTP) برای افزایش شدید تجربه کاربری",
          "طراحی رایگان لوگو، پالت رنگی لوکس و بنرهای جذاب اسلایدر",
          "سیستم پیشرفته قیمت‌گذاری چندگانه (تکی و عمده‌فروشی ظروف)",
          "۱۲ ماه پشتیبانی طلایی VIP با مانیتورینگ آنلاین امنیت و سرعت"
        ]
      };
    } else if (estimatedPrice >= 22000000 || extraFeatures.includes('otp') || productCount === '50_200') {
      return {
        name: "پکیج فروشگاه طلایی پیشرفته (Golden Pro)",
        level: "gold",
        color: "from-blue-600 to-indigo-600 text-white",
        badge: "محبوب‌ترین و بهینه‌ترین گزینه 🌟",
        icon: Award,
        description: "مناسب برای فروشگاه‌های ظروف شیک و مدرن با تعداد محصولات متوسط که می‌خواهند برند قوی و سرعت بالا داشته باشند.",
        features: [
          "طراحی قالب نیمه اختصاصی فوق‌العاده شیک و مینیمال",
          "سیستم متغیر محصولات پیشرفته (انتخاب رنگ، طرح، تعداد پارچ ظروف)",
          "سئوی ساختاری و اتصال کامل به سرچ کنسول و گوگل آنالیتیکس",
          "بهینه‌سازی خیره‌کننده تصاویر برای سرچ عکس گوگل (بسیار مهم در صنف ظروف)",
          "محاسبه هزینه پست به صورت اتوماتیک بر اساس وزن و استان",
          "سیستم تخفیف‌های زمان‌دار و گردونه‌های شانس خرید",
          "۶ ماه پشتیبانی فنی و امنیتی رایگان"
        ]
      };
    } else {
      return {
        name: "پکیج فروشگاه نقره‌ای استاندارد (Standard Silver)",
        level: "silver",
        color: "from-slate-700 to-slate-900 text-slate-100",
        badge: "شروع سریع با هزینه اقتصادی 💡",
        icon: Layers,
        description: "بهترین انتخاب برای مغازه‌داران و تولیدکنندگان نوپایی که می‌خواهند با هزینه‌ای مناسب، کاتالوگ آنلاین و درگاه پرداخت داشته باشند.",
        features: [
          "طراحی فروشگاه استاندارد با سرعت لود بهینه‌سازی شده",
          "ثبت سفارش و اتصال به درگاه پرداخت مستقیم بانکی",
          "آموزش کامل و آسان ویدیویی برای افزودن و مدیریت ظروف",
          "سیستم کوپن تخفیف و گالری تصاویر محصولات",
          "رابط کاربری کاملاً ریسپانسیو و عالی در گوشی موبایل",
          "۳ ماه پشتیبانی فنی رایگان"
        ]
      };
    }
  }, [estimatedPrice, seoLevel, extraFeatures, productCount]);

  // Form Field Validation for Current Step
  const isStepValid = () => {
    if (currentStep === 0) {
      return brandName.trim().length >= 2;
    }
    if (currentStep === 6) {
      return clientName.trim().length >= 2 && clientPhone.trim().length >= 10;
    }
    return true;
  };

  // Step Switch Handler
  const handleNextStep = () => {
    if (isStepValid()) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
        // Scroll form area into view
        const formEl = document.getElementById('wizard-container');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      const formEl = document.getElementById('wizard-container');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Submission Process
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    // Create a new request object
    const newRequest: AssessmentSubmission = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('fa-IR'),
      clientName,
      clientPhone,
      brandName,
      activityType,
      hasCurrentSite,
      currentSiteUrl: hasCurrentSite ? currentSiteUrl : '',
      primaryGoals,
      productCount,
      hasVariations,
      productDataStatus,
      productUploader,
      competitorUrl,
      designStyle,
      hasLogo,
      needPaymentGateway,
      shippingMethods,
      autoShippingCalculation,
      couponSystem,
      extraFeatures,
      seoLevel,
      seoKeywords,
      blogContentNeeded,
      hostingStatus,
      extraPages,
      clientBudget,
      supportDuration,
      clientMessage,
      estimatedPrice,
      recommendedPackageName: recommendedPackage.name
    };

    // Save and Update
    setSubmissions(prev => [newRequest, ...prev]);
    setLastSubmission(newRequest);
    setFormSubmitted(true);
    
    // Auto-scroll to top of results
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Reset form to start a new assessment
  const handleResetForm = () => {
    setBrandName('');
    setActivityType('ظروف لوکس پذیرایی و دکوری');
    setHasCurrentSite(false);
    setCurrentSiteUrl('');
    setPrimaryGoals(['online_sale', 'seo_ranking']);
    setProductCount('50_200');
    setHasVariations(true);
    setProductDataStatus('images_only');
    setProductUploader('mutual');
    setCompetitorUrl('');
    setDesignStyle('luxury');
    setHasLogo(false);
    setNeedPaymentGateway(true);
    setShippingMethods(['post', 'tipax', 'peyk']);
    setAutoShippingCalculation(true);
    setCouponSystem(true);
    setExtraFeatures(['wishlist', 'otp']);
    setSeoLevel('vip');
    setSeoKeywords('خرید ظروف پذیرایی شیک، سرویس آرکوپال جدید، ظروف سرامیکی مدرن');
    setBlogContentNeeded('yes');
    setHostingStatus('both_needed');
    setExtraPages(false);
    setClientBudget('mid');
    setSupportDuration('6_months');
    setClientName('');
    setClientPhone('');
    setClientMessage('');
    setCurrentStep(0);
    setFormSubmitted(false);
    setLastSubmission(null);
  };

  // Helper translations for admin panel
  const getProductCountLabel = (key: string) => {
    const labels: Record<string, string> = {
      less_50: 'کمتر از ۵۰ محصول',
      '50_200': '۵۰ تا ۲۰۰ محصول',
      '200_1000': '۲۰۰ تا ۱۰۰۰ محصول',
      more_1000: 'بیش از ۱۰۰۰ محصول'
    };
    return labels[key] || key;
  };

  const getSeoLevelLabel = (key: string) => {
    const labels: Record<string, string> = {
      basic: 'سئوی پایه و ساختاری (رایگان)',
      pro: 'سئوی حرفه‌ای مقدماتی (+۵ میلیون ت)',
      vip: 'سئوی VIP اول گوگل (+۱۴.۵ میلیون ت)'
    };
    return labels[key] || key;
  };

  const getUploaderLabel = (key: string) => {
    const labels: Record<string, string> = {
      client: 'خود کارفرما',
      designer: 'طراح سایت (امیرحسین)',
      mutual: 'به صورت مشترک'
    };
    return labels[key] || key;
  };

  const getStyleLabel = (key: string) => {
    const labels: Record<string, string> = {
      luxury: 'لوکس و اشرافی (تیره، طلایی، پر زرق و برق)',
      minimal: 'ساده و مینیمال مدرن (سرامیک، سفید، آرامش‌بخش)',
      traditional: 'سنتی و اصیل ایرانی (فیروزه‌ای، مسی، فیروزه‌کوبی)',
      creative: 'فانتزی و رنگارنگ کادویی'
    };
    return labels[key] || key;
  };

  // Dynamic advice of Amirhossein based on selected state!
  const getAmirhosseinAdvice = () => {
    switch(currentStep) {
      case 0:
        return {
          title: "خوش آمدید! بیایید شروع کنیم",
          text: "سلام! من امیرحسین سعادتی هستم. طراحی هویت بصری و فروشگاه آنلاین ظروف و لوازم خانه یکی از تخصص‌های من است. نام برند و هدفتان را برایم بگویید تا پایه کار را قوی بچینیم.",
          tip: "اگر هنوز برند ثبت شده ندارید، نگران نباشید؛ نام موقتی که در ذهن دارید را بنویسید."
        };
      case 1:
        if (productCount === 'more_1000') {
          return {
            title: "مدیریت بیش از ۱۰۰۰ ظرف و کالای آشپزخانه",
            text: "تعداد بالای کالا یعنی نیاز مبرم به دیتابیس پرقدرت و هاست ابری مجهز! نگران نباشید، من سیستم را طوری بهینه‌سازی می‌کنم که سرعت باز شدن صفحات با وجود هزاران محصول، زیر ۲ ثانیه باشد.",
            tip: "پیشنهاد می‌کنم برای شروع، ۵۰ محصول پرفروش را طراح وارد کند و مابقی را خودتان با آموزش‌های ویدیویی من وارد کنید تا در هزینه‌ها صرفه‌جویی شود."
          };
        }
        return {
          title: "جلوه و تنوع محصولات ظروف",
          text: "محصولات ظروف اغلب تنوع رنگی (طلاکوب، سیلور، رزگلد) یا تنوع پارچ (۶ نفره، ۱۲ نفره، ۱۸ نفره) دارند. داشتن سیستم متغیر محصول بسیار برای مشتری جذاب است.",
          tip: "اگر عکس‌های آماده ندارید، عکاسی صنعتی از ظروف با زمینه سفید یا دکوراتیو به‌شدت فروش شما را منفجر خواهد کرد."
        };
      case 2:
        if (designStyle === 'luxury') {
          return {
            title: "سبک لوکس؛ شایسته ظروف گران‌بها",
            text: "استفاده از رنگ‌های تیره، جزئیات ظریف طلایی و فونت‌های بسیار کلاسیک و پریمیوم، ارزش ظروف کریستال یا دکوری شما را در نگاه مشتری دوچندان می‌کند.",
            tip: "نداشتن لوگوی حرفه‌ای یک نقطه ضعف بزرگ است؛ من می‌توانم یک لوگوی لوکس و مینیمال برای صنف ظروف برایتان خلق کنم."
          };
        }
        return {
          title: "سبک مینیمال؛ ترند جدید دکوراسیون و سفال",
          text: "ظروف سرامیکی دست‌ساز، ماگ‌های فانتزی و مینی‌مال با یک طراحی تمیز، خلوت و مدرن با پس‌زمینه نود (Nude) فوق‌العاده زیبا دیده می‌شوند.",
          tip: "یک رقیب خوب معرفی کنید تا بررسی کنم آنها چه کارهایی کرده‌اند و ما یک لول بالاتر از آنها طراحی کنیم!"
        };
      case 3:
        return {
          title: "امکانات طلایی و تسهیل خرید",
          text: "ثبت‌نام سریع پیامکی (OTP) نرخ رها شدن سبد خرید را تا ۴۰٪ کاهش می‌دهد! مشتری حوصله نوشتن ایمیل و پسورد را ندارد. همینطور محاسبه خودکار هزینه ارسال مانع از سردرگمی مشتری در مرحله پرداخت می‌شود.",
          tip: "فعال‌سازی درگاه مستقیم بانکی به همراه نماد اعتماد الکترونیکی (اینماد) از الزامات کارفرما است که تمام کارهای اداری‌اش را خودم برایتان انجام می‌دهم."
        };
      case 4:
        return {
          title: "💡 راز مهم: چطور در صفحه اول گوگل باشیم؟",
          text: "درخواست شما برای رتبه اول گوگل عالی است! صنف ظروف یکی از بهترین صنف‌ها برای سئوی تصاویر است چون خانم‌ها معمولاً مدل ظروف را در Google Images جستجو می‌کنند. با سئوی VIP، ساختار تصاویر را برای گوگل کدگذاری می‌کنیم.",
          tip: "پیشنهاد طلایی من اتصال سایت به موتور جستجوی ترب (Torob) است. با این کار، دقیقاً خریدارانی که قصد خرید نهایی ظرف را دارند از ترب مستقیم وارد سایت شما می‌شوند."
        };
      case 5:
        return {
          title: "امنیت، سرعت و صفحات اصلی",
          text: "انتخاب یک هاست ابری پرسرعت، از نان شب برای فروشگاه اینترنتی واجب‌تر است! اگر هاست ضعیف باشد، گوگل به سایت رتبه خوبی نمی‌دهد و کاربر هم خسته شده و خارج می‌شود.",
          tip: "من برای تمامی مشتریانم گواهینامه امنیتی SSL و بهینه‌سازی فشرده‌سازی تصاویر را به صورت کاملاً رایگان انجام می‌دهم."
        };
      case 6:
        return {
          title: "گام آخر: محاسبه هوشمند و تماس با شما",
          text: "عالی بود! اطلاعات شما تحلیل شد. حالا کافیست نام و شماره تماستان را بگذارید تا فاکتور تخمینی شخصی‌سازی شده شما را تولید کنم و بلافاصله برای هماهنگی با شما تماس بگیرم.",
          tip: "شماره تماستان را دقیق وارد کنید تا بتوانم در واتس‌اپ یا تلگرام هم پروپوزال کامل متنی را برایتان بفرستم."
        };
      default:
        return {
          title: "فرم نیازسنجی هوشمند",
          text: "من در تمامی مراحل کنار شما هستم تا یک سایت ظروف بی‌نقص، پرفروش و مدعی در رتبه‌های اول گوگل داشته باشید.",
          tip: "برای جلو رفتن روی دکمه بعدی کلیک کنید."
        };
    }
  };

  const advice = getAmirhosseinAdvice();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-900 font-sans">
      
      {/* PROFESSIONAL NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Right side: Brand & Portrait */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/16900959/pexels-photo-16900959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120" 
                  alt="امیرحسین سعادتی" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-lg shadow-amber-500/20"
                />
                <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white flex items-center gap-1.5">
                  امیرحسین سعادتی
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] font-normal px-2 py-0.5 rounded-full border border-amber-500/25">طراح ارشد وب</span>
                </h1>
                <p className="text-xs text-slate-400">سیستم آنلاین نیازسنجی و برآورد هوشمند پروژه</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              <button 
                onClick={() => { setActiveTab('form'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'form' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' : 'text-slate-300 hover:text-white'}`}
              >
                📝 فرم هوشمند نیازسنجی
              </button>
              <button 
                onClick={() => { setActiveTab('packages'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'packages' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' : 'text-slate-300 hover:text-white'}`}
              >
                💎 پکیج‌های طراحی و سئو
              </button>
              <button 
                onClick={() => { setActiveTab('about'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'about' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' : 'text-slate-300 hover:text-white'}`}
              >
                👨‍💼 درباره امیرحسین
              </button>
              <button 
                onClick={() => { setActiveTab('admin'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25' : 'text-slate-400 hover:text-white'}`}
              >
                ⚙️ پنل مدیریت (شبیه‌ساز)
              </button>
            </nav>

            {/* Left side: Quick contact CTA */}
            <div className="flex items-center gap-2">
              <a 
                href="tel:09120000000" 
                className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>مشاوره تلفنی: ۰۹۱۲۰۰۰۰۰۰۰</span>
              </a>
              <button 
                onClick={() => { setActiveTab('admin'); }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/15"
              >
                سفارش مستقیم تلفنی
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION BAR */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-2 flex justify-around items-center sticky top-20 z-40">
        <button 
          onClick={() => { setActiveTab('form'); }}
          className={`flex-1 py-2 text-[11px] font-medium text-center rounded-lg transition-all ${activeTab === 'form' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
        >
          📝 فرم هوشمند
        </button>
        <button 
          onClick={() => { setActiveTab('packages'); }}
          className={`flex-1 py-2 text-[11px] font-medium text-center rounded-lg transition-all ${activeTab === 'packages' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
        >
          💎 پکیج‌ها
        </button>
        <button 
          onClick={() => { setActiveTab('about'); }}
          className={`flex-1 py-2 text-[11px] font-medium text-center rounded-lg transition-all ${activeTab === 'about' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
        >
          👨‍💼 درباره من
        </button>
        <button 
          onClick={() => { setActiveTab('admin'); }}
          className={`flex-1 py-2 text-[11px] font-medium text-center rounded-lg transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          ⚙️ پنل ادمین
        </button>
      </div>

      {/* HERO HERO COMPONENT - DISH FOCUS */}
      <div className="relative overflow-hidden bg-slate-950 pt-12 pb-16 border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 mix-blend-color-dodge">
          <img 
            src="https://images.pexels.com/photos/19316550/pexels-photo-19316550.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" 
            alt="Ceramics background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent"></div>
        </div>

        {/* Decorative ambient blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-6 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              سئوی تضمینی و صعود به رتبه ۱ گوگل با متد اختصاصی ظروف
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              طراحی فروشگاه اینترنتی <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">ظروف و لوازم خانگی</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              دیگر نگران ورود به بازار آنلاین یا گم شدن در صفحات عقب گوگل نباشید. با فرم نیازسنجی هوشمند زیر، دقیقا امکانات، زمان‌بندی، قیمت منصفانه و پکیج مناسب برند خود را در چند کلیک کشف کنید!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-sm">
                <SearchCheck className="w-4.5 h-4.5 text-amber-500" />
                <span className="text-slate-300 font-medium">سئو تخصصی تصاویر ظروف</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-sm">
                <Zap className="w-4.5 h-4.5 text-amber-500" />
                <span className="text-slate-300 font-medium">اتصال خودکار به ترب و ایمالز</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-sm">
                <CreditCard className="w-4.5 h-4.5 text-amber-500" />
                <span className="text-slate-300 font-medium">درگاه مستقیم و نماد اعتماد سریع</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* TAB 1: SMART ASSESSMENT FORM */}
        {activeTab === 'form' && (
          <div>
            {!formSubmitted ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="wizard-container">
                
                {/* WIZARD QUESTION CARDS (8 COLS) */}
                <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  
                  {/* Step Progress Header */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">گام {currentStep + 1} از ۷</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                          {currentStep === 0 && "📌 مشخصات کلی و اهداف برند"}
                          {currentStep === 1 && "🏺 کاتالوگ محصولات و انبار ظروف"}
                          {currentStep === 2 && "🎨 سبک طراحی و هویت بصری"}
                          {currentStep === 3 && "🛒 امکانات فروشگاه و فرآیند خرید"}
                          {currentStep === 4 && "🚀 استراتژی سئو و رتبه اول گوگل"}
                          {currentStep === 5 && "🌐 زیرساخت فنی و دامنه‌/هاست"}
                          {currentStep === 6 && "📞 زمان‌بندی، بودجه و ثبت نهایی"}
                        </h3>
                      </div>
                      <span className="text-sm font-semibold bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                        {Math.round(((currentStep + 1) / 7) * 100)}٪ تکمیل شده
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800/80">
                      <div 
                        className="bg-gradient-to-l from-amber-500 to-amber-300 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* FORM BODY */}
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    
                    {/* STEP 0: GENERAL & BRAND INFO */}
                    {currentStep === 0 && (
                      <div className="space-y-5 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-2">
                            ۱. نام برند یا فروشگاه ظروف شما چیست؟ <span className="text-rose-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            required
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="مثال: گالری ظروف مینیاتور، کریستال شوش، چینی لوکس آریا"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          />
                          {brandName.trim().length === 1 && (
                            <p className="text-xs text-rose-400 mt-1">لطفاً نام کامل‌تری وارد کنید (حداقل ۲ کاراکتر)</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-2">
                            ۲. حوزه فعالیت دقیق شما چیست؟
                          </label>
                          <select 
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                          >
                            <option value="ظروف لوکس پذیرایی و دکوری">ظروف لوکس پذیرایی و دکوری (کریستال، نقره، طلاکوب)</option>
                            <option value="ظروف آشپزخانه روزمره و قابلمه">ظروف آشپزخانه روزمره و طبخ غذا (چدن، گرانیت، استیل)</option>
                            <option value="ظروف سرامیکی دست‌ساز و گالری">ظروف سرامیکی دست‌ساز، میناکاری، صنایع دستی و فانتزی</option>
                            <option value="ظروف پذیرایی چینی، آرکوپال و ملامین">ظروف پذیرایی چینی، آرکوپال، بلورجات و ملامین</option>
                            <option value="واردات عمده ظروف و فروشگاه شوش">واردات عمده، توزیع بنکداری و نمایندگی‌های بزرگ ظروف</option>
                          </select>
                        </div>

                        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۳. آیا در حال حاضر وب‌سایت فعال دارید؟
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setHasCurrentSite(true)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${hasCurrentSite ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${hasCurrentSite ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              بله، سایت دارم
                            </button>
                            <button
                              type="button"
                              onClick={() => { setHasCurrentSite(false); setCurrentSiteUrl(''); }}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${!hasCurrentSite ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${!hasCurrentSite ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              خیر، اولین سایت من است
                            </button>
                          </div>

                          {hasCurrentSite && (
                            <div className="mt-4 animate-slideDown">
                              <label className="block text-xs font-medium text-slate-400 mb-1.5">آدرس سایت فعلی را بنویسید:</label>
                              <input 
                                type="text" 
                                value={currentSiteUrl}
                                onChange={(e) => setCurrentSiteUrl(e.target.value)}
                                placeholder="مثال: mydishshop.com"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-amber-400 focus:outline-none"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۴. هدف اصلی شما از راه‌اندازی این سایت چیست؟ <span className="text-slate-400">(انتخاب چندگانه)</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                              { id: 'online_sale', label: '🛒 فروش مستقیم آنلاین و پرداخت آنی' },
                              { id: 'seo_ranking', label: '🚀 کسب رتبه اول گوگل و جذب مشتریان ارگانیک' },
                              { id: 'wholesale', label: '📦 جذب سفارش عمده و همکاری با همکاران شهرستان' },
                              { id: 'branding', label: '💎 ایجاد حس اعتماد، لوکس بودن و پرستیژ برند' },
                              { id: 'catalog', label: '📖 کاتالوگ دیجیتال بدون قیمت جهت معرفی به مشتری حضوری' }
                            ].map(goal => {
                              const isSelected = primaryGoals.includes(goal.id);
                              return (
                                <button
                                  type="button"
                                  key={goal.id}
                                  onClick={() => {
                                    if (isSelected) {
                                      setPrimaryGoals(primaryGoals.filter(g => g !== goal.id));
                                    } else {
                                      setPrimaryGoals([...primaryGoals, goal.id]);
                                    }
                                  }}
                                  className={`p-3 text-right rounded-xl border text-xs font-semibold transition flex items-center justify-between ${isSelected ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'}`}
                                >
                                  <span>{goal.label}</span>
                                  <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${isSelected ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold' : 'border-slate-700 text-transparent'}`}>✓</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 1: PRODUCTS INFO */}
                    {currentStep === 1 && (
                      <div className="space-y-6 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۵. حدوداً چند کالا یا تنوع محصول برای فروش در سایت دارید؟
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { id: 'less_50', label: 'کمتر از ۵۰', extra: 'فروشگاه نقلی' },
                              { id: '50_200', label: '۵۰ تا ۲۰۰', extra: 'فروشگاه متوسط' },
                              { id: '200_1000', label: '۲۰۰ تا ۱۰۰۰', extra: 'فروشگاه بزرگ' },
                              { id: 'more_1000', label: 'بیش از ۱۰۰۰', extra: 'هایپر مارکت ظروف' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setProductCount(opt.id)}
                                className={`p-4.5 rounded-2xl border text-center transition flex flex-col justify-center items-center gap-1.5 ${productCount === opt.id ? 'bg-amber-500/15 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'}`}
                              >
                                <span className="text-sm font-bold">{opt.label}</span>
                                <span className="text-[10px] opacity-80">{opt.extra}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <label className="block text-sm font-semibold text-slate-200">
                                ۶. آیا ظروف شما دارای متغیرهای متعدد هستند؟
                              </label>
                              <p className="text-xs text-slate-400 mt-1">مثل انتخاب رنگ دسته، چندپارچه بودن (۶ نفره، ۱۲ نفره)، سایز قابلمه و طرح گل بوته</p>
                            </div>
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">بسیار پرکاربرد</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setHasVariations(true)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${hasVariations ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${hasVariations ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              بله، متغیرهای متعددی دارند
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasVariations(false)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${!hasVariations ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${!hasVariations ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              خیر، هر محصول کاملاً ساده است
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۷. در حال حاضر اطلاعات و محتوای محصولات شما چقدر آماده است؟
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { id: 'ready', label: '📸 عکاسی، قیمت و توضیحات کاملاً آماده', desc: 'آماده ورود سریع به سایت' },
                              { id: 'images_only', label: '🖼️ فقط عکس‌ها را دارم', desc: 'نیاز به قیمت‌گذاری و نگارش توضیحات' },
                              { id: 'none', label: '❌ هیچ‌چیز آماده نیست', desc: 'نیاز به خدمات عکاسی دکوراتیو ظروف و تولید محتوا' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setProductDataStatus(opt.id)}
                                className={`p-4 rounded-xl border text-right transition flex flex-col gap-1 ${productDataStatus === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold">{opt.label}</span>
                                <span className="text-[10px] opacity-75">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-900/40 p-4.5 rounded-xl border border-slate-800">
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۸. مایلید چه کسی اطلاعات اولیه کالاها را در سایت درج کند؟
                          </label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {[
                              { id: 'client', label: 'خودم با آموزش شما' },
                              { id: 'designer', label: 'کاملاً طراح سایت' },
                              { id: 'mutual', label: 'به صورت مشترک' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setProductUploader(opt.id)}
                                className={`p-3 rounded-lg border text-xs font-semibold text-center transition ${productUploader === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-300'}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DESIGN STYLE */}
                    {currentStep === 2 && (
                      <div className="space-y-6 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-2">
                            ۹. آیا نمونه سایت رقیب یا همکار با طراحی دلخواهی دارید؟
                          </label>
                          <input 
                            type="text" 
                            value={competitorUrl}
                            onChange={(e) => setCompetitorUrl(e.target.value)}
                            placeholder="لینک سایت رقیب مثلاً: diakogallery.com یا نام رقیب"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                          />
                          <p className="text-xs text-slate-500 mt-1">این کار به من کمک می‌کند سلیقه بصری شما را فوراً درک کنم.</p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۰. سبک طراحی بصری و حس‌و‌حال مورد پسند شما برای فروشگاه ظروف:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { id: 'luxury', label: '💎 لوکس، باشکوه و اشرافی', desc: 'ترکیب رنگ مشکی/سرمه‌ای و طلایی؛ عالی برای کریستال‌های گران‌قیمت، ظروف لوکس و پذیرایی مارک‌دار.' },
                              { id: 'minimal', label: '🌿 ساده، مینیمال و ارگانیک', desc: 'طراحی خلوت و مدرن با پس‌زمینه‌های روشن و نود؛ عالی برای ظروف سرامیکی دست‌ساز و کارگاه‌های هنری.' },
                              { id: 'traditional', label: '🎨 سنتی و اصیل ایرانی', desc: 'به کارگیری المان‌های اسلیمی، رنگ‌های فیروزه‌ای و کاشی‌کاری؛ بهترین انتخاب برای ظروف سفالی، فیروزه‌کوبی و ظروف مسی.' },
                              { id: 'creative', label: '🎈 فانتزی، صمیمی و رنگارنگ', desc: 'شاد و پرانرژی با افکت‌های فانتزی؛ مناسب پلاسکو، ظروف سیلیکونی آشپزخانه، ماگ‌ها و دکوری‌های کادویی.' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setDesignStyle(opt.id)}
                                className={`p-4 text-right rounded-2xl border transition flex flex-col gap-1.5 ${designStyle === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold">{opt.label}</span>
                                <span className="text-[10px] opacity-80 leading-relaxed">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۱. وضعیت لوگو و هویت بصری شما:
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setHasLogo(true)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${hasLogo ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${hasLogo ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              لوگوی باکیفیت و آماده دارم
                            </button>
                            <button
                              type="button"
                              onClick={() => setHasLogo(false)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${!hasLogo ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${!hasLogo ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              لوگو ندارم (نیاز به طراحی دارم)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: SHOPPING FEATURES */}
                    {currentStep === 3 && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-slate-900/60 p-4.5 rounded-xl border border-slate-800">
                            <label className="block text-xs font-semibold text-slate-300 mb-2">درگاه پرداخت مستقیم بانکی و اینماد:</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setNeedPaymentGateway(true)}
                                className={`py-2 text-xs rounded-lg border font-bold ${needPaymentGateway ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                              >
                                بله، حتماً نیاز دارم
                              </button>
                              <button
                                type="button"
                                onClick={() => setNeedPaymentGateway(false)}
                                className={`py-2 text-xs rounded-lg border font-bold ${!needPaymentGateway ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                              >
                                خیر، بعداً نصب می‌کنیم
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-900/60 p-4.5 rounded-xl border border-slate-800">
                            <label className="block text-xs font-semibold text-slate-300 mb-2">محاسبه خودکار هزینه ارسال پستی:</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setAutoShippingCalculation(true)}
                                className={`py-2 text-xs rounded-lg border font-bold ${autoShippingCalculation ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                              >
                                بله، اتوماتیک بر اساس وزن
                              </button>
                              <button
                                type="button"
                                onClick={() => setAutoShippingCalculation(false)}
                                className={`py-2 text-xs rounded-lg border font-bold ${!autoShippingCalculation ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                              >
                                خیر، هزینه ثابت یا پس‌کرایه
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-2.5">
                            ۱۲. روش‌های ارسالی که برای ظروف استفاده خواهید کرد: <span className="text-slate-400">(انتخاب چندگانه)</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'post', label: '📦 پست سفارشی و پیشتاز' },
                              { id: 'tipax', label: '🚚 تیپاکس (پس‌کرایه)' },
                              { id: 'peyk', label: '🛵 پیک موتوری شهری' },
                              { id: 'barbari', label: '🚛 باربری برای سفارشات عمده' }
                            ].map(method => {
                              const isSelected = shippingMethods.includes(method.id);
                              return (
                                <button
                                  type="button"
                                  key={method.id}
                                  onClick={() => {
                                    if (isSelected) {
                                      setShippingMethods(shippingMethods.filter(m => m !== method.id));
                                    } else {
                                      setShippingMethods([...shippingMethods, method.id]);
                                    }
                                  }}
                                  className={`p-3 text-right rounded-lg border text-xs font-semibold transition ${isSelected ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                                >
                                  {method.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-slate-900/60 p-4.5 rounded-xl border border-slate-800">
                          <label className="block text-xs font-semibold text-slate-300 mb-2">سیستم تخفیف‌های پیشرفته (کدهای کپن، تولد مشتری، تخفیفات فوق‌العاده صنف ظروف):</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setCouponSystem(true)}
                              className={`py-2 text-xs rounded-lg border font-bold ${couponSystem ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                            >
                              بله، سیستم کپن تخفیف می‌خواهم
                            </button>
                            <button
                              type="button"
                              onClick={() => setCouponSystem(false)}
                              className={`py-2 text-xs rounded-lg border font-bold ${!couponSystem ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                            >
                              خیر، نیازی نیست
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۳. امکانات فنی فوق پیشرفته فروشگاهی <span className="text-slate-400">(انتخاب موارد دلخواه)</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { id: 'wishlist', label: '❤️ لیست علاقه‌مندی‌ها (Wishlist)', desc: 'برای اینکه مشتری ظروف مورد پسندش را بعداً راحت پیدا کند.' },
                              { id: 'comparison', label: '⚖️ مقایسه فنی و ظاهری محصولات', desc: 'عالی برای مقایسه سرویس‌های چینی و آرکوپال از نظر تعداد پارچه و قیمت.' },
                              { id: 'otp', label: '📱 ورود و عضویت سریع با شماره موبایل (کد یکبار مصرف SMS)', desc: 'بسیار ضروری! خرید را بدون نیاز به ایمیل فوق‌العاده راحت می‌کند.' },
                              { id: 'multivendor', label: '👥 سیستم چندفروشندگی (مارکت‌پلیس ظروف)', desc: 'به بقیه تولیدکنندگان هم اجازه دهید در سایت شما مغازه داشته باشند و درصد پورسانت بگیرید.' }
                            ].map(feature => {
                              const isSelected = extraFeatures.includes(feature.id);
                              return (
                                <button
                                  type="button"
                                  key={feature.id}
                                  onClick={() => {
                                    if (isSelected) {
                                      setExtraFeatures(extraFeatures.filter(f => f !== feature.id));
                                    } else {
                                      setExtraFeatures([...extraFeatures, feature.id]);
                                    }
                                  }}
                                  className={`p-4 text-right rounded-2xl border transition flex flex-col gap-1 ${isSelected ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                                >
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-xs font-bold text-white">{feature.label}</span>
                                    <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border text-xs ${isSelected ? 'bg-indigo-500 border-indigo-500 text-white font-bold' : 'border-slate-700 text-transparent'}`}>✓</span>
                                  </div>
                                  <span className="text-[10px] opacity-75 mt-1 leading-relaxed">{feature.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: SEO & FIRST PAGE GOOGLE (HIGHLIGHTED!) */}
                    {currentStep === 4 && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="bg-gradient-to-r from-amber-500/15 to-indigo-500/15 p-5 rounded-2xl border border-amber-500/30 text-right">
                          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            چرا رتبه اول گوگل برای صنف ظروف آشپزخانه و کادویی معجزه می‌کند؟
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                            روزانه ده ها هزار نفر عباراتی مثل <strong>«خرید سرویس ملامین جدید»</strong>، <strong>«ظروف مسی پذیرایی شیک»</strong> یا <strong>«بشقاب سرامیکی دست‌ساز»</strong> را در گوگل سرچ می‌کنند. قرارگیری در لینک اول تا سوم گوگل، یعنی جذب تضمینی ترافیک آماده خریدی که بدون واسطه با شما تماس می‌گیرند یا آنلاین خرید می‌کنند.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۴. چه سطحی از بهینه‌سازی سئو (SEO) را مدنظر دارید؟
                          </label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { 
                                id: 'basic', 
                                label: '🥇 سئوی پایه و کدنویسی بهینه (رایگان روی تمامی پکیج‌ها)', 
                                desc: 'سایت بهینه‌سازی شده برای موبایل با سرعت بارگذاری فوق‌العاده بالا، به همراه تگ‌های استاندارد ساختاری که گوگل دوست دارد.' 
                              },
                              { 
                                id: 'pro', 
                                label: '🔥 سئوی حرفه‌ای مقدماتی (+۵,۰۰۰,۰۰۰ تومان)', 
                                desc: 'اتصال کامل سایت به ابزارهای رسمی گوگل (سرچ کنسول و آنالیتیکس)، تنظیم نقشه‌های سایت، کدگذاری تصاویر ظروف جهت رتبه گرفتن سریع در نتایج تصویری (Google Images).' 
                              },
                              { 
                                id: 'vip', 
                                label: '🏆 پکیج سئوی VIP و تصاحب صفحه اول گوگل (+۱۴,۵۰۰,۰۰۰ تومان) - شدیداً پیشنهادی برای فروش بالا', 
                                desc: 'تحقیق عمیق کلمات کلیدی پرسرچ ظروف، آنالیز کامل سئو و بکلینک‌های ۳ رقیب اصلی شما، تدوین استراتژی محتوای اختصاصی، به همراه اتصال سایت به سیستم ترب و ایمالز برای ورود خریداران تشنه از همان هفته اول!' 
                              }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setSeoLevel(opt.id)}
                                className={`p-4 text-right rounded-2xl border transition flex flex-col gap-2 ${seoLevel === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold text-white">{opt.label}</span>
                                <span className="text-[11px] opacity-80 leading-relaxed">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-2">
                            ۱۵. چه کلمات کلیدی طلایی برای شما مهم است؟ (مثال: خرید ظروف سرامیکی، سرویس قابلمه تفلون)
                          </label>
                          <input 
                            type="text" 
                            value={seoKeywords}
                            onChange={(e) => setSeoKeywords(e.target.value)}
                            placeholder="کلماتی که مشتری با سرچ آنها در گوگل، باید سایت شما را در رتبه ۱ ببیند..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                          />
                        </div>

                        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۶. نیاز به تولید محتوا و وبلاگ‌نویسی سئوشده توسط کارشناسان ما دارید؟
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setBlogContentNeeded('yes')}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${blogContentNeeded === 'yes' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${blogContentNeeded === 'yes' ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              بله، خدمات نگارش مقالات تخصصی ظروف می‌خواهم
                            </button>
                            <button
                              type="button"
                              onClick={() => setBlogContentNeeded('no')}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${blogContentNeeded === 'no' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${blogContentNeeded === 'no' ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              خیر، خودم یا کارمندم می‌نویسیم
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: INFRASTRUCTURE */}
                    {currentStep === 5 && (
                      <div className="space-y-6 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۷. وضعیت تهیه دامنه و هاست شما چگونه است؟
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { 
                                id: 'both_ready', 
                                label: '🌐 هر دو را قبلاً خریده‌ام', 
                                desc: 'نیازی به پرداخت هزینه خرید هاست ندارید.' 
                              },
                              { 
                                id: 'need_host', 
                                label: '💾 دامنه دارم ولی هاست ندارم', 
                                desc: 'بهترین هاست پرسرعت ابری مخصوص ووکامرس برای شما تهیه می‌شود.' 
                              },
                              { 
                                id: 'both_needed', 
                                label: '🔑 هیچ‌کدام را ندارم و نیاز به خرید دارم', 
                                desc: 'بهترین آدرس با دامنه .ir و .com به همراه هاست VIP امن تهیه می‌شود.' 
                              }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setHostingStatus(opt.id)}
                                className={`p-4 text-right rounded-xl border transition flex flex-col gap-1.5 ${hostingStatus === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold text-white">{opt.label}</span>
                                <span className="text-[10px] opacity-80 leading-relaxed">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۱۸. آیا نیاز به صفحات جانبی دلخواه و پرشمار علاوه بر ۵ صفحه استاندارد دارید؟
                          </label>
                          <p className="text-xs text-slate-400 mb-3">پنج صفحه استاندارد شامل: صفحه اصلی، فروشگاه ظروف، درباره ما، تماس با ما، و قوانین است.</p>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setExtraPages(true)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${extraPages ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${extraPages ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              بله، چند صفحه اختصاصی دیگر نیاز دارم
                            </button>
                            <button
                              type="button"
                              onClick={() => setExtraPages(false)}
                              className={`p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${!extraPages ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                            >
                              <span className={`w-3 h-3 rounded-full ${!extraPages ? 'bg-amber-500' : 'bg-slate-700'}`}></span>
                              خیر، ۵ صفحه اصلی کاملاً کافیست
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                          <h5 className="text-xs font-bold text-slate-200 mb-2">🎁 خدمات رایگان زیرساختی که روی تمامی وب‌سایت‌های من دریافت می‌کنید:</h5>
                          <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc list-inside">
                            <li>نصب گواهینامه امنیتی SSL رایگان و مادام‌العمر</li>
                            <li>اتصال به درگاه امن واسط زرین‌پال یا درگاه‌های مستقیم بانکی ملی/ملت</li>
                            <li>سازگاری ۱۰۰٪ با نمایشگر موبایل و تبلت (Responsive Design)</li>
                            <li>بهینه‌سازی فشرده تصاویر ظروف برای افزایش لود صفحه</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: CONTACT & BUDGET & TIMELINE */}
                    {currentStep === 6 && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                              ۱۹. نام و نام خانوادگی شما <span className="text-rose-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              required
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              placeholder="مثال: امیررضا سعیدی"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                              ۲۰. شماره تلفن همراه جهت تماس و هماهنگی <span className="text-rose-500">*</span>
                            </label>
                            <input 
                              type="tel" 
                              required
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              placeholder="مثال: 09121234567"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-left placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                            {clientPhone.trim().length > 0 && clientPhone.trim().length < 10 && (
                              <p className="text-xs text-rose-400 mt-1">شماره تلفن نامعتبر است (حداقل ۱۰ رقم بدون صفر اول)</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۲۱. بودجه تقریبی در نظر گرفته شده برای این پروژه چقدر است؟
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                            {[
                              { id: 'low', label: '۱۵ تا ۲۵ میلیون تومان', range: 'بودجه استارتاپی' },
                              { id: 'mid', label: '۲۵ تا ۴۵ میلیون تومان', range: 'بودجه متوسط و استاندارد' },
                              { id: 'high', label: '۴۵ تا ۸۰ میلیون تومان', range: 'بودجه عالی برای رقابت قوی' },
                              { id: 'very_high', label: 'بالای ۸۰ میلیون تومان', range: 'بودجه پروژه ابعاد بزرگ' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setClientBudget(opt.id)}
                                className={`p-3 text-center rounded-xl border transition flex flex-col items-center justify-center ${clientBudget === opt.id ? 'bg-amber-500/15 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold">{opt.label}</span>
                                <span className="text-[10px] opacity-75 mt-0.5">{opt.range}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-3">
                            ۲۲. مدت زمان پشتیبانی فنی و مانیتورینگ مورد نیاز شما بعد از تحویل سایت:
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: '3_months', label: '۳ ماهه رایگان', detail: 'شامل تمامی پکیج‌ها' },
                              { id: '6_months', label: '۶ ماهه اختصاصی', detail: '+۴ میلیون تومان' },
                              { id: '12_months', label: '۱۲ ماهه VIP طلایی', detail: '+۸.۵ میلیون تومان' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setSupportDuration(opt.id)}
                                className={`p-3 text-center rounded-xl border transition flex flex-col items-center justify-center ${supportDuration === opt.id ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-850 text-slate-400'}`}
                              >
                                <span className="text-xs font-bold">{opt.label}</span>
                                <span className="text-[9px] opacity-75 mt-1">{opt.detail}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                            ۲۳. توضیحات یا درخواست خاصی دارید؟ (اختیاری)
                          </label>
                          <textarea 
                            value={clientMessage}
                            onChange={(e) => setClientMessage(e.target.value)}
                            rows={3}
                            placeholder="مثلاً: من می‌خواهم حتماً سایت به حسابداری شایگان یا هلو متصل شود و یا طرح خاصی مدنظرم است..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                          />
                        </div>

                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                          <p className="text-xs text-amber-300 leading-relaxed text-center font-semibold">
                            ⚠️ پس از کلیک بر روی دکمه ثبت نهایی، تحلیل پاسخ‌های شما تکمیل شده، تخمین قیمت دقیق به همراه پکیج پیشنهادی صنف ظروف برایتان نمایش داده خواهد شد و فاکتور برای امیرحسین سعادتی ارسال می‌گردد.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="pt-6 border-t border-slate-900 flex justify-between items-center gap-4">
                      {currentStep > 0 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-slate-800"
                        >
                          <ChevronRight className="w-4 h-4" />
                          گام قبلی
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {currentStep < 6 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!isStepValid()}
                          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg ${isStepValid() ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                        >
                          گام بعدی
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={handleSubmitForm}
                          disabled={!isStepValid()}
                          className={`px-8 py-4.5 rounded-xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-2xl ${isStepValid() ? 'bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-950/20 scale-102 cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                          تایید نهایی و ارسال سفارش آنلاین
                        </button>
                      )}
                    </div>

                  </form>
                </div>

                {/* ADVISOR AMIRHOSSEIN SIDEBAR (4 COLS) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Digital Assistant Bubble */}
                  <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl"></div>
                    
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="relative">
                        <img 
                          src="https://images.pexels.com/photos/16900959/pexels-photo-16900959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120" 
                          alt="امیرحسین سعادتی" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-amber-500"
                        />
                        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">مشاور شما: امیرحسین</h4>
                        <p className="text-[10px] text-emerald-400 font-medium">پاسخگوی آنلاین صنف ظروف</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 relative">
                      {/* Triangle speak pointer */}
                      <div className="absolute top-4 -right-2 w-3 h-3 bg-slate-900 border-r border-t border-slate-800 rotate-45 hidden sm:block"></div>
                      
                      <h5 className="text-xs font-bold text-amber-400 mb-1">{advice.title}</h5>
                      <p className="text-xs text-slate-200 leading-relaxed">{advice.text}</p>
                      
                      {advice.tip && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex gap-1.5 items-start">
                          <span className="text-amber-400 text-xs">💡</span>
                          <p className="text-[10px] text-amber-300 leading-relaxed font-semibold">{advice.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* REAL-TIME DYNAMIC ESTIMATE BAR */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-lg">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">💰 برآورد آنلاین و زنده هزینه کل</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-end">
                          <span className="text-xs text-slate-400">قیمت تخمینی پروژه:</span>
                          <span className="text-2xl font-black text-emerald-400">
                            {estimatedPrice.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-300">تومان</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 text-left mt-1">تومان بر اساس پارامترهای تا این لحظه</p>
                      </div>

                      <div className="border-t border-slate-900 pt-3">
                        <span className="text-[10px] text-slate-400 block mb-2">💎 نزدیک‌ترین پکیج شناسایی شده:</span>
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                          <div className="bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20 text-amber-400 shrink-0">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-white">{recommendedPackage.name}</h5>
                            <p className="text-[10px] text-amber-300 font-semibold mt-1">{recommendedPackage.badge}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-950/20 p-3 rounded-xl border border-indigo-900/30">
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">🎯 تضمین صفحه اول گوگل</span>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          با انتخاب پکیج سئوی VIP کلمات کلیدی، سایت شما بر اساس کدهای سریع و استراتژی محتوای من به سرعت به رتبه‌های برتر گوگل می‌رسد.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MINI TESTIMONIAL / TRUST PORTFOLIO */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-right">
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-[10px] text-slate-400 mr-1">(۴۵ پروژه موفق)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      "پروژه سئوی گالری کریستال ما با کلمه 'ظروف بلور اصل' توسط مهندس سعادتی در عرض ۴ ماه به خط ۳ گوگل رسید. فروشمان دگرگون شد!"
                    </p>
                    <span className="text-[10px] font-bold text-white block mt-2 text-left">— ابراهیمی، واردکننده بلورجات شوش</span>
                  </div>

                </div>

              </div>
            ) : (
              /* SUCCESS SCREEN WITH RESULTS, DETAILED PROPOSAL & ACTIONS */
              <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl animate-scaleUp max-w-4xl mx-auto">
                
                <div className="text-center pb-8 border-b border-slate-800">
                  <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">فرم نیازسنجی با موفقیت ارسال شد!</h3>
                  <p className="text-sm text-emerald-400 mt-2 font-semibold">بزودی با شما تماس خواهم گرفت و پروپوزال مکتوب را ارسال می‌کنم.</p>
                  
                  <div className="mt-5 inline-flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">کد رهگیری درخواست شما:</span>
                    <strong className="text-xs text-amber-400 font-mono">{lastSubmission?.id}</strong>
                  </div>
                </div>

                {/* CALCULATED ESTIMATE & RECOMMENDED PACKAGE PRESENTATION */}
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Package Recommendation Box */}
                  <div className="md:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-black px-3 py-1 rounded-full">
                        {recommendedPackage.badge}
                      </span>
                      <h4 className="text-xl font-black text-white mt-3 flex items-center gap-2">
                        {React.createElement(recommendedPackage.icon, { className: "w-6 h-6 text-amber-400" })}
                        {recommendedPackage.name}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                        {recommendedPackage.description}
                      </p>

                      <div className="mt-5 space-y-2">
                        <span className="text-xs text-amber-400 font-semibold block">💎 ویژگی‌های کلیدی این پکیج برای فروشگاه شما:</span>
                        {recommendedPackage.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <p className="text-[11px] text-slate-400">
                        * این تخمین اولیه است و جزئیات نهایی در تماس تلفنی قابل شخصی‌سازی است.
                      </p>
                    </div>
                  </div>

                  {/* Price breakdown & customer specs */}
                  <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">💳 فاکتور برآورد پروژه شما</h4>
                      
                      <div className="space-y-3.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">نام تجاری:</span>
                          <span className="text-white font-bold">{lastSubmission?.brandName}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">حوزه فعالیت:</span>
                          <span className="text-white font-bold text-ellipsis overflow-hidden max-w-[150px] whitespace-nowrap">{lastSubmission?.activityType}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">انبار کالا:</span>
                          <span className="text-white font-bold">{getProductCountLabel(lastSubmission?.productCount || '')}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">سیستم سئو:</span>
                          <span className="text-amber-400 font-bold">{seoLevel === 'vip' ? 'VIP اول گوگل 🚀' : 'پایه'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">هاست و دامنه:</span>
                          <span className="text-white font-bold">{hostingStatus === 'both_needed' ? 'بله (خرید کامل)' : 'دارید'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">پشتیبانی درخواستی:</span>
                          <span className="text-white font-bold">{supportDuration === '12_months' ? '۱۲ ماهه طلایی' : supportDuration === '6_months' ? '۶ ماهه اختصاصی' : '۳ ماهه رایگان'}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-800 my-5 pt-4">
                        <span className="text-[10px] text-slate-400 block mb-1">تخمین هزینه کل پروژه:</span>
                        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                          <span className="text-2xl font-black text-emerald-400">
                            {lastSubmission?.estimatedPrice.toLocaleString('fa-IR') || '۰'}
                          </span>
                          <span className="text-xs text-slate-300 mr-1.5">تومان</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-300">
                          👤 کارفرما: <strong className="text-white">{lastSubmission?.clientName}</strong> | تلفن: <strong className="text-white">{lastSubmission?.clientPhone}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* PERSONAL NOTE FROM AMIRHOSSEIN & RE-FORM TRIGGERS */}
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                    <img 
                      src="https://images.pexels.com/photos/16900959/pexels-photo-16900959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120" 
                      alt="امیرحسین سعادتی" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                    />
                    <div className="text-right">
                      <h5 className="text-sm font-bold text-white">پیام شخصی امیرحسین سعادتی به شما:</h5>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        دوست عزیز، ممنون از اعتمادتان. اطلاعات ارزشمند شما دریافت شد. در اولین فرصت (کمتر از ۲ ساعت کاری) مستقیماً با شما تماس می‌گیرم تا سناریوی دقیق سئو و تصاحب صفحه اول گوگل برای حوزه ظروف را با هم بررسی کنیم. در صورت تمایل می‌توانید کلمه "همکاری ظروف" را به واتس‌اپ من نیز ارسال کنید.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a 
                      href={`https://wa.me/989120000000?text=سلام%20آقای%20سعادتی.%20من%20فرم%20نیازسنجی%20ظروف%20را%20با%20کد%20${lastSubmission?.id}%20ارسال%20کردم.`}
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      ارسال پیام مستقیم در واتس‌اپ
                    </a>
                    <button 
                      onClick={handleResetForm}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-xs transition-all border border-slate-700"
                    >
                      🔄 ثبت یک فرم نیازسنجی جدید
                    </button>
                    <button 
                      onClick={() => setActiveTab('packages')}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
                    >
                      💎 مشاهده و مقایسه پکیج‌ها
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: PACKAGES COMPARISON TABLE */}
        {activeTab === 'packages' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black text-white">لیست پکیج‌های طراحی سایت و سئو ظروف</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                سه پکیج استاندارد متناسب با بزرگی انبار ظروف، اهداف برندینگ و برنامه تصاحب رتبه اول در موتورهای جستجوی گوگل و ترب
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              
              {/* Silver Package */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-slate-700 relative">
                <div>
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">مخصوص استارت کار کاتالوگی</span>
                  <h4 className="text-xl font-bold text-white mt-4">پکیج فروشگاه نقره‌ای (اقتصادی)</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">بهترین سناریو برای فروشگاه‌های نوپا و گالری‌های ظروف محلی با کمتر از ۵۰ محصول.</p>
                  
                  <div className="my-6 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                    <span className="text-[10px] text-slate-400 block">شروع هزینه حدودی از:</span>
                    <strong className="text-xl font-black text-emerald-400">۱۶,۰۰۰,۰۰۰</strong> <span className="text-xs text-slate-300">تومان</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-200 block mb-1">📦 ویژگی‌های فنی پکیج:</span>
                    {[
                      "سیستم مدیریت محتوای وردپرس فارسی + المنتور پرو",
                      "درگاه پرداخت مستقیم بانکی متصل به شتاب",
                      "طراحی کاملاً واکنش‌گرا مخصوص گوشی‌های موبایل",
                      "سبد خرید شیک و آسان با ثبت نام استاندارد",
                      "۳ ماه پشتیبانی فنی و مانیتورینگ امنیتی رایگان",
                      "سئوی ساختاری استاندارد کدها برای موتورهای جستجو"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-900">
                  <button 
                    onClick={() => {
                      setProductCount('less_50');
                      setSeoLevel('basic');
                      setExtraFeatures([]);
                      setHasLogo(true);
                      setActiveTab('form');
                      setCurrentStep(0);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all"
                  >
                    🚀 انتخاب و پر کردن فرم این پکیج
                  </button>
                </div>
              </div>

              {/* Gold Package - Popular */}
              <div className="bg-slate-950 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-amber-500/5 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  محبوب‌ترین و بهینه‌ترین گزینه 🌟
                </span>
                
                <div>
                  <h4 className="text-xl font-bold text-white mt-4">پکیج فروشگاه طلایی پیشرفته</h4>
                  <p className="text-xs text-amber-100/80 mt-2 leading-relaxed">طراحی فوق‌العاده شیک با سیستم متغیر پیشرفته ظروف (تعداد پارچه، رنگ، ابعاد) و سئوی ساختاری قوی.</p>
                  
                  <div className="my-6 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <span className="text-[10px] text-amber-300 block">شروع هزینه حدودی از:</span>
                    <strong className="text-2xl font-black text-amber-400">۲۵,۰۰۰,۰۰۰</strong> <span className="text-xs text-slate-300">تومان</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-white block mb-1">📦 ویژگی‌های فنی پکیج:</span>
                    {[
                      "تمام امکانات پکیج نقره‌ای به همراه قالب نیمه اختصاصی لوکس",
                      "سیستم متغیر محصولات پیشرفته (رنگ‌بندی دکمه، تعداد پارچه ظروف)",
                      "سیستم عضویت سریع با شماره موبایل (کد OTP بی دردسر)",
                      "محاسبه اتوماتیک هزینه پست بر اساس شهر و وزن مرسوله ظروف",
                      "بهینه‌سازی خیره‌کننده تصاویر ظروف برای سرچ عکس گوگل (Google Images)",
                      "۶ ماه پشتیبانی اختصاصی و ماهیانه ۲ مرتبه بک‌آپ کامل سرور"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                        <span className="font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-900">
                  <button 
                    onClick={() => {
                      setProductCount('50_200');
                      setSeoLevel('pro');
                      setExtraFeatures(['wishlist', 'otp']);
                      setHasLogo(false);
                      setActiveTab('form');
                      setCurrentStep(0);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/15"
                  >
                    🎯 انتخاب و پر کردن فرم این پکیج
                  </button>
                </div>
              </div>

              {/* Platinum / First Google Page Package */}
              <div className="bg-gradient-to-br from-slate-950 to-indigo-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-indigo-500/60 relative">
                <span className="absolute top-4 left-4 bg-indigo-500/20 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/30">VIP ویژه رتبه ۱ گوگل</span>
                
                <div>
                  <span className="bg-indigo-500/10 text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-500/20">مدعی بلامنازع بازار آنلاین ظروف</span>
                  <h4 className="text-xl font-bold text-white mt-4">پکیج اول گوگل و فروش بی‌نهایت (Platinum)</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">استراتژی تهاجمی سئو، تسخیر کلمات کلیدی رقابتی صنف ظروف و اتصال فوری به شبکه ترب/ایمالز.</p>
                  
                  <div className="my-6 p-4 bg-indigo-900/20 rounded-2xl border border-indigo-800/30">
                    <span className="text-[10px] text-indigo-300 block">شروع هزینه حدودی از:</span>
                    <strong className="text-xl font-black text-indigo-300">۳۸,۰۰۰,۰۰۰</strong> <span className="text-xs text-slate-300">تومان</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-indigo-300 block mb-1">📦 ویژگی‌های فنی و کمپین سئو:</span>
                    {[
                      "تحقیق کلمات کلیدی تخصصی صنف ظروف (مثلا خرید ظرف پذیرایی لوکس)",
                      "آنالیز کامل سئو و بکلینک‌های ۳ رقیب بزرگ شما در گوگل",
                      "بهینه‌سازی سرعت فوق‌العاده سریع با لایت اسپید (کسب رتبه عالی در Lighthouse)",
                      "اتصال و همگام‌سازی اتوماتیک با موتور جستجوی ترب و ایمالز",
                      "۱۲ ماه پشتیبانی طلایی VIP با مانیتورینگ آنلاین ۲۴ ساعته",
                      "طراحی اختصاصی لوگو و بنرهای فانتزی یا لوکس متناسب با برند ظروف شما",
                      "نگارش و سئوی ۵ مقاله تخصصی و معرفی دسته‌ها در وبلاگ سایت"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-indigo-400 shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-900">
                  <button 
                    onClick={() => {
                      setProductCount('200_1000');
                      setSeoLevel('vip');
                      setExtraFeatures(['wishlist', 'comparison', 'otp']);
                      setHasLogo(false);
                      setActiveTab('form');
                      setCurrentStep(0);
                    }}
                    className="w-full bg-gradient-to-l from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-lg"
                  >
                    🏆 انتخاب پکیج VIP صفحه اول گوگل
                  </button>
                </div>
              </div>

            </div>

            {/* SEO FAQ PANEL */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 mt-12">
              <h4 className="text-lg font-bold text-white mb-6 text-center">💡 پاسخ به سوالات متداول کارفرمایان صنف ظروف درباره سئو و گوگل</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-850">
                  <h5 className="text-xs sm:text-sm font-bold text-amber-400">آیا رتبه اول شدن در کلماتی مثل «خرید ظروف آشپزخانه» تضمینی است؟</h5>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    هیچ سئوکار حرفه‌ای و صادقی رتبه اول گوگل را به طور ۱۰۰٪ کتبی تضمین نمی‌کند چون الگوریتم‌های گوگل دائماً در حال آپدیت هستند. اما ما با تمرکز روی **سئوی محلی**، **سئوی تصاویر ظروف** و قرارگیری در موتورهای جستجوی مکمل مثل **ترب**، قطعاً ترافیک باکیفیت و زنگ‌خورهای خرید شما را در ماه‌های اول چند برابر می‌کنیم.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-850">
                  <h5 className="text-xs sm:text-sm font-bold text-amber-400">چقدر زمان نیاز است تا فروشگاه اینترنتی ظروف من به درآمد برسد؟</h5>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    اگر به ترب متصل شوید، از همان هفته اول پس از بارگذاری محصولات فروش نقدی شما شروع می‌شود! برای سئوی ارگانیک گوگل نیز کلمات با رقابت متوسط معمولاً بین ۳ تا ۶ ماه زمان نیاز دارند تا به صفحه اول صعود کنند.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-850">
                  <h5 className="text-xs sm:text-sm font-bold text-amber-400">عکاسی از ظروف کریستال یا سرامیکی چقدر در فروش سایت تاثیر دارد؟</h5>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    بیش از ۸۰ درصد خرید آنلاین ظروف بر اساس **ظاهر و عکس باکیفیت** انجام می‌شود! اگر عکس‌ها تیره، کدر یا از اینترنت کپی شده باشند، اعتماد مشتری سلب می‌شود. در فرم نیازسنجی می‌توانید درخواست خدمات عکاسی دکوراتیو را هم بدهید.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-850">
                  <h5 className="text-xs sm:text-sm font-bold text-amber-400">آیا خودم هم می‌توانم بعد از طراحی، محصول جدید به سایت اضافه کنم؟</h5>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    بله کاملاً! من پس از اتمام کار، یک ویدیوی اختصاصی و بسیار ساده فارسی ضبط می‌کنم که در آن قدم به قدم نحوه وارد کردن محصول جدید، تغییر قیمت‌ها، بررسی سبد خرید مشتریان و اعمال کدهای تخفیف را به شما آموزش می‌دهم.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ABOUT AMIRHOSSEIN SAADATI */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-2xl"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-right">
                <img 
                  src="https://images.pexels.com/photos/16900959/pexels-photo-16900959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500" 
                  alt="امیرحسین سعادتی" 
                  className="w-48 h-48 rounded-3xl object-cover border-4 border-amber-500 shadow-xl shadow-amber-500/10 shrink-0"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">امیرحسین سعادتی</h3>
                  <p className="text-amber-400 text-sm font-semibold">طراح، توسعه‌دهنده وب و متخصص سئو تخصصی فروشگاه‌های اینترنتی</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    با بیش از ۷ سال سابقه حرفه‌ای در کدنویسی، بهینه‌سازی سرعت و ارتقای رتبه سایت‌های تجارت الکترونیکی در گوگل. تخصص ویژه من طراحی فروشگاه‌های شیک، سریع و با نرخ تبدیل بالا برای صنف لوازم خانگی، بلورجات شوش، ظروف لوکس سرامیکی و نقره است. هدف من، ساختن فرم‌ها و فرآیندهای خرید جذابی است که کاربر نهایی با لذت خرید کند و در رتبه اول موتورهای جستجو قرار گیرد.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-amber-400 font-bold block text-lg">۴۵+</span>
                      <span className="text-[10px] text-slate-400">پروژه موفق فروشگاهی و شرکتی</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-amber-400 font-bold block text-lg">۱۰۰٪</span>
                      <span className="text-[10px] text-slate-400">تضمین کدنویسی تمیز و بهینه</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Designer skills */}
              <div className="mt-10 pt-8 border-t border-slate-900">
                <h4 className="text-sm font-bold text-white mb-4">🛠️ مهارت‌ها و خدماتی که روی سایت شما پیاده‌سازی می‌کنم:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">💻 کدنویسی بهینه و پرسرعت</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">رعایت استانداردهای موتورهای جستجو و باز شدن موشکی سایت.</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">📈 سئو تصاویر ظروف (Google Images)</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">بهینه‌سازی تگ‌های alt و متاداده برای رتبه گرفتن عکس‌های کالا.</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">🚀 همگام‌سازی با ترب و ایمالز</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">اتصال خودکار کاتالوگ شما به ترب جهت جذب خریدار مستقیم تشنه.</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">📱 تجربه کاربری فوق موبایلی</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">بیش از ۸۰ درصد خریدها با گوشی است؛ ما سایت را بهینه می‌کنیم.</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">🛡️ امنیت فوق‌پیشرفته و ضد هک</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">تنظیم فایروال‌های امنیتی وردپرس و پشتیبان‌گیری خودکار هفتگی.</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-right">
                    <span className="text-xs font-bold text-white block">📞 پشتیبانی فنی مسئولانه</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">همیشه آنلاین و در دسترس برای رفع ارورها و تغییرات مورد نظر شما.</span>
                  </div>
                </div>
              </div>

              {/* Work Process steps */}
              <div className="mt-10 pt-8 border-t border-slate-900">
                <h4 className="text-sm font-bold text-white mb-6 text-center">🔄 مراحل فرآیند کاری من پس از ارسال فرم نیازسنجی</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-900/40 p-4 rounded-xl text-center relative">
                    <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">۱</span>
                    <span className="text-xs font-bold text-white block mt-2">تماس و مشاوره تلفنی</span>
                    <p className="text-[10px] text-slate-400 mt-1">تحلیل کامل پاسخ‌های شما و تفاهم بر سر دقیق‌ترین امکانات.</p>
                  </div>
                  <div className="bg-slate-900/40 p-4 rounded-xl text-center relative">
                    <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">۲</span>
                    <span className="text-xs font-bold text-white block mt-2">پیش‌نویس قرارداد و زمان‌بندی</span>
                    <p className="text-[10px] text-slate-400 mt-1">امضای قرارداد و ارائه نقشه راه پروژه.</p>
                  </div>
                  <div className="bg-slate-900/40 p-4 rounded-xl text-center relative">
                    <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">۳</span>
                    <span className="text-xs font-bold text-white block mt-2">کدنویسی، طراحی و تست سرعت</span>
                    <p className="text-[10px] text-slate-400 mt-1">طراحی گرافیکی و بهینه‌سازی سرعت و کدهای سئوی سایت.</p>
                  </div>
                  <div className="bg-slate-900/40 p-4 rounded-xl text-center relative">
                    <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">۴</span>
                    <span className="text-xs font-bold text-white block mt-2">آموزش، تحویل و پشتیبانی</span>
                    <p className="text-[10px] text-slate-400 mt-1">ارائه ویدیوهای آموزشی فارسی و شروع بلافاصله سئو و معرفی به ترب.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: SIMULATED ADMIN DASHBOARD FOR AMIRHOSSEIN SAADATI */}
        {activeTab === 'admin' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-900">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Settings className="w-5.5 h-5.5 text-indigo-400" />
                    پنل مدیریت امیرحسین سعادتی (شبیه‌ساز کارفرما)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    در این پنل شبیه‌سازی شده، می‌توانید پیام‌های ثبت شده از طریق فرم آنلاین نیازسنجی ظروف را مشاهده، مدیریت و فیلتر کنید.
                  </p>
                </div>
                <div className="bg-indigo-500/10 text-indigo-300 text-xs px-3 py-1.5 rounded-lg border border-indigo-500/20 font-mono">
                  تعداد کل درخواست‌ها: {submissions.length} مورد
                </div>
              </div>

              {/* SEARCH BAR & QUICK FILTERS */}
              <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
                <div className="relative w-full sm:flex-1">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="جستجو در بین نام مشتری، برند یا کلمات کلیدی..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button 
                  onClick={() => {
                    const testPhone = `0912${Math.floor(1000000 + Math.random() * 9000000)}`;
                    const testReq: AssessmentSubmission = {
                      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
                      date: "امروز",
                      clientName: "امید رضایی (تست خودکار)",
                      clientPhone: testPhone,
                      brandName: "ظروف مسی نقش جهان",
                      activityType: "ظروف سرامیکی دست‌ساز و گالری",
                      hasCurrentSite: false,
                      currentSiteUrl: "",
                      primaryGoals: ["online_sale", "seo_ranking"],
                      productCount: "50_200",
                      hasVariations: true,
                      productDataStatus: "none",
                      productUploader: "mutual",
                      competitorUrl: "mesiran.co",
                      designStyle: "traditional",
                      hasLogo: false,
                      needPaymentGateway: true,
                      shippingMethods: ["post", "tipax"],
                      autoShippingCalculation: true,
                      couponSystem: true,
                      extraFeatures: ["wishlist", "otp"],
                      seoLevel: "vip",
                      seoKeywords: "خرید ظروف مسی زنجان، قابلمه مسی اصل، پارچ مسی دست‌ساز",
                      blogContentNeeded: "yes",
                      hostingStatus: "both_needed",
                      extraPages: false,
                      clientBudget: "mid",
                      supportDuration: "6_months",
                      clientMessage: "ما کارگاه تولید ظروف مسی در زنجان داریم و می‌خواهیم مستقیماً تکی و عمده بفروشیم.",
                      estimatedPrice: 31200000,
                      recommendedPackageName: "پکیج فروشگاه طلایی پیشرفته (Golden Pro)"
                    };
                    setSubmissions(prev => [testReq, ...prev]);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  ایجاد درخواست تستی جدید
                </button>
              </div>

              {/* REQUESTS LIST TABLE */}
              <div className="overflow-x-auto border border-slate-900 rounded-2xl">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4 text-center">شناسه</th>
                      <th className="p-4">تاریخ ثبت</th>
                      <th className="p-4">نام کارفرما</th>
                      <th className="p-4">تلفن تماس</th>
                      <th className="p-4">نام برند ظروف</th>
                      <th className="p-4">سطح سئوی درخواستی</th>
                      <th className="p-4 text-left">هزینه کل برآورد شده</th>
                      <th className="p-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {submissions
                      .filter(sub => {
                        const s = adminSearch.toLowerCase();
                        return (
                          sub.clientName.toLowerCase().includes(s) ||
                          sub.brandName.toLowerCase().includes(s) ||
                          sub.clientPhone.toLowerCase().includes(s) ||
                          sub.seoKeywords.toLowerCase().includes(s)
                        );
                      })
                      .map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-4 text-center font-mono font-bold text-amber-400">{sub.id}</td>
                          <td className="p-4 text-slate-400">{sub.date}</td>
                          <td className="p-4 text-white font-bold">{sub.clientName}</td>
                          <td className="p-4 font-mono text-slate-300">{sub.clientPhone}</td>
                          <td className="p-4 text-slate-200">{sub.brandName}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${sub.seoLevel === 'vip' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : sub.seoLevel === 'pro' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-slate-800 text-slate-400'}`}>
                              {sub.seoLevel === 'vip' ? 'VIP اول گوگل' : sub.seoLevel === 'pro' ? 'سئو مقدماتی' : 'سئو ساختاری'}
                            </span>
                          </td>
                          <td className="p-4 text-left font-bold text-emerald-400 font-mono">
                            {sub.estimatedPrice.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button 
                                onClick={() => setSelectedAdminRow(sub)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                بررسی جزئیات
                              </button>
                              <button 
                                onClick={() => {
                                  if(confirm('آیا مایل به حذف این درخواست شبیه‌سازی شده هستید؟')) {
                                    setSubmissions(submissions.filter(item => item.id !== sub.id));
                                    if (selectedAdminRow?.id === sub.id) {
                                      setSelectedAdminRow(null);
                                    }
                                  }
                                }}
                                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-1 rounded transition-all"
                                title="حذف درخواست"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {submissions.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          هیچ درخواستی یافت نشد. می‌توانید با پر کردن فرم نیازسنجی، یک درخواست ارسال کنید.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ROW DETAILS MODAL DIALOG */}
              {selectedAdminRow && (
                <div className="mt-8 bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative animate-slideDown">
                  <button 
                    onClick={() => setSelectedAdminRow(null)}
                    className="absolute top-4 left-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-full transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                    <Database className="w-4.5 h-4.5 text-amber-400" />
                    جزئیات فنی و فاکتور درخواست شماره {selectedAdminRow.id} ({selectedAdminRow.clientName})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
                    
                    <div className="space-y-2">
                      <p>👤 <strong>نام کارفرما:</strong> <span className="text-white">{selectedAdminRow.clientName}</span></p>
                      <p>📞 <strong>تلفن همراه:</strong> <span className="text-white font-mono">{selectedAdminRow.clientPhone}</span></p>
                      <p>🏬 <strong>نام برند تجاری:</strong> <span className="text-white">{selectedAdminRow.brandName}</span></p>
                      <p>🏺 <strong>حوزه فعالیت دقیق:</strong> <span className="text-white">{selectedAdminRow.activityType}</span></p>
                      <p>🔗 <strong>آدرس سایت فعلی:</strong> <span className="text-white font-mono">{selectedAdminRow.hasCurrentSite ? selectedAdminRow.currentSiteUrl : 'ندارد'}</span></p>
                    </div>

                    <div className="space-y-2">
                      <p>🏺 <strong>تعداد محصولات:</strong> <span className="text-white">{getProductCountLabel(selectedAdminRow.productCount)}</span></p>
                      <p>👥 <strong>درج محتوا توسط:</strong> <span className="text-white">{getUploaderLabel(selectedAdminRow.productUploader)}</span></p>
                      <p>🌿 <strong>سبک طراحی بصری:</strong> <span className="text-white">{getStyleLabel(selectedAdminRow.designStyle)}</span></p>
                      <p>💡 <strong>نمونه رقیب معرفی شده:</strong> <span className="text-amber-400 font-mono">{selectedAdminRow.competitorUrl || 'ذکر نشده'}</span></p>
                      <p>📱 <strong>امکانات انتخابی اضافی:</strong> <span className="text-white font-bold">{selectedAdminRow.extraFeatures.join('، ') || 'ندارد'}</span></p>
                    </div>

                    <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <p className="text-amber-400 font-bold">🎯 استراتژی سئو و رتبه اول گوگل:</p>
                      <p><strong>نوع سئو:</strong> <span className="text-white font-semibold">{getSeoLevelLabel(selectedAdminRow.seoLevel)}</span></p>
                      <p><strong>کلمات کلیدی صید گوگل:</strong> <span className="text-emerald-400 leading-relaxed font-semibold block mt-1">{selectedAdminRow.seoKeywords}</span></p>
                      <p className="border-t border-slate-800 pt-1.5 mt-1.5"><strong>پشتیبانی پس از تحویل:</strong> <span className="text-white">{selectedAdminRow.supportDuration === '12_months' ? '۱۲ ماهه' : 'کوتاه مدت'}</span></p>
                    </div>

                  </div>

                  <div className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs">💬 <strong>توضیحات اختصاصی کارفرما:</strong></p>
                    <p className="text-xs text-slate-300 mt-1.5 italic bg-slate-900 p-2.5 rounded border border-slate-850">
                      "{selectedAdminRow.clientMessage || 'هیچ توضیحات خاصی ارسال نشده است.'}"
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-between items-center gap-4 bg-slate-950 p-4 rounded-xl border border-indigo-500/20">
                    <div>
                      <span className="text-[10px] text-slate-400 block">پکیج پیشنهادی اتوماتیک:</span>
                      <strong className="text-xs text-amber-400">{selectedAdminRow.recommendedPackageName}</strong>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block">برآورد نهایی قیمت پروژه:</span>
                      <strong className="text-base font-black text-emerald-400">{selectedAdminRow.estimatedPrice.toLocaleString('fa-IR')} تومان</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <a 
                      href={`https://wa.me/${selectedAdminRow.clientPhone.replace(/^0/, '98')}?text=سلام%20جناب%20${selectedAdminRow.clientName}%20عزیز.%20من%20امیرحسین%20سعادتی%20هستم.%20فرم%20نیازسنجی%20طراحی%20سایت%20ظروف%20شما%20را%20بررسی%20کردم...`}
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 transition-all"
                    >
                      💬 تماس مستقیم در واتس‌اپ کارفرما
                    </a>
                    <button 
                      onClick={() => {
                        alert(`شبیه‌ساز: پروپوزال متنی کامل حاوی هزینه ${selectedAdminRow.estimatedPrice.toLocaleString('fa-IR')} تومان کپی شد.`);
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded text-xs font-bold transition-all"
                    >
                      📋 کپی خلاصه درخواست جهت پروپوزال
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* WHY US / VALUES FOR DISHES STORES */}
      <section className="bg-slate-950 py-16 border-t border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">چرا امیرحسین سعادتی؟</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">تخصص ویژه در بازار بزرگ ظروف و کادویی</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              صنف ظروف و لوازم آشپزخانه یکی از پردرآمدترین صنف‌های حال حاضر ایران در بستر آنلاین است به شرطی که اصول جلب اعتماد، سرعت لود بالا و سئوی تصاویر رعایت شود.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-850 text-right">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 mb-4">
                <SearchCheck className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">سئوی تخصصی تصاویر (Google Images)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                خانم‌ها بیشتر ظروف پذیرایی و بلور را از طریق نتایج عکس گوگل می‌بینند و می‌پسندند. ما تمام تصاویر شما را با کدهای پیشرفته متادیتا برای گوگل ترجمه و بهینه‌سازی می‌کنیم.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-850 text-right">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 mb-4">
                <Zap className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">سرعت بارگذاری موشکی (زیر ۲ ثانیه)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                مشتری ظروف زمان زیادی را صرف ورق زدن گالری و تماشای عکس قابلمه‌ها و بشقاب‌ها می‌کند. سرعت سایت باید چنان روان باشد که هرگز از خرید خسته نشود.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-850 text-right">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 mb-4">
                <Truck className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">فرمول محاسبه پست شکستنی‌ها</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                محاسبه خودکار هزینه ارسال پستی، تیپاکس و بیمه اجناس شکستنی ظروف بر اساس وزن و ابعاد، خیالتان را از ارسال امن باربری و پیک شهری آسوده می‌کند.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-850 text-right">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 mb-4">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">امنیت پرداخت مستقیم بانکی</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                اتصال مستقیم به درگاه‌های پرداخت امن بانک‌های عضو شتاب (ملت، ملی، پاسارگاد) به همراه راه‌اندازی گواهینامه امنیتی SSL برای حفاظت همه‌جانبه از خریداران.
              </p>
            </div>

          </div>

          {/* REALTIME VISUAL PREVIEW GENERATION SECTION */}
          <div className="mt-12 bg-gradient-to-l from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 border border-slate-850 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-right max-w-xl space-y-3">
              <span className="bg-indigo-500/15 text-indigo-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-indigo-500/20">همکاری برتر و بدون واسطه</span>
              <h4 className="text-xl sm:text-2xl font-black text-white">آماده‌اید فروشگاه ظروف خود را در رتبه‌های اول گوگل ببینید؟</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                با ارسال فرم نیازسنجی هوشمند، امیرحسین سعادتی در کمترین زمان ممکن اطلاعات شما را آنالیز کرده و به همراه کلماتی که رقبای بزرگتان دارند سئو می‌کنند، یک جلسه مشاوره رایگان تلفنی با شما خواهد داشت.
              </p>
            </div>
            <button 
              onClick={() => {
                setActiveTab('form');
                setCurrentStep(0);
                const formEl = document.getElementById('wizard-container');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-xs sm:text-sm shrink-0 transition-all shadow-lg shadow-amber-500/15"
            >
              ✍️ شروع پر کردن فرم نیازسنجی ظروف
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-right">
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">امیرحسین سعادتی</h4>
              <p className="text-[11px] leading-relaxed">
                طراح و توسعه‌دهنده وب با سابقه ساخت فروشگاه‌های تراز اول و دارای تخصص عمیق در افزایش نرخ فروش آنلاین و بهینه‌سازی رتبه گوگل صنف ظروف و دکوری منزل.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-semibold">بخش‌های سایت</h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => { setActiveTab('form'); }} className="hover:text-amber-400 transition">📝 فرم هوشمند نیازسنجی</button></li>
                <li><button onClick={() => { setActiveTab('packages'); }} className="hover:text-amber-400 transition">💎 پکیج‌های طراحی و سئو</button></li>
                <li><button onClick={() => { setActiveTab('about'); }} className="hover:text-amber-400 transition">👨‍💼 درباره امیرحسین سعادتی</button></li>
                <li><button onClick={() => { setActiveTab('admin'); }} className="hover:text-indigo-400 transition">⚙️ پنل مدیریت (شبیه‌ساز)</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">خدمات فرعی ما برای صنف ظروف</h4>
              <ul className="space-y-2 text-[11px] text-slate-300">
                <li>• خدمات عکاسی دکوراتیو و صنعتی از ظروف</li>
                <li>• نویسندگی حرفه‌ای و توصیف مشخصات فنی</li>
                <li>• بهینه‌سازی سرعت و انتقال قالب‌های قدیمی</li>
                <li>• کمپین‌های تخصصی ادز گوگل (Google Ads)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">راه‌های تماس مستقیم</h4>
              <p className="text-[11px]">📍 تهران، خیابان شوش، مجتمع تجاری بلور، طبقه ۴، واحد ۴۰۵</p>
              <p className="text-[11px]">📞 تلفن تماس مستقیم: ۰۹۱۲۰۰۰۰۰۰۰</p>
              <p className="text-[11px]">✉️ ایمیل: info@amirhossein-saadati.com</p>
              <div className="flex gap-2.5 pt-1.5 justify-start">
                <a href="#instagram" className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-800 transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#telegram" className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-800 transition-colors" aria-label="Telegram">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().toLocaleDateString('fa-IR')} طراحی شده با ❤️ و خلاقیت توسط امیرحسین سعادتی برای صنف محترم تولید و فروش ظروف کشور.</p>
            <div className="flex gap-3 text-slate-400">
              <span className="hover:text-amber-400 cursor-pointer">قوانین و مقررات</span>
              <span>•</span>
              <span className="hover:text-amber-400 cursor-pointer">حریم خصوصی کارفرمایان</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
