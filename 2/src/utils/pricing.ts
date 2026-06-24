import { FormData, Package } from '../types';

export const packages: Package[] = [
  {
    name: 'پکیج برنزی',
    emoji: '🥉',
    priceMin: 8000000,
    priceMax: 15000000,
    color: 'from-amber-600 to-amber-400',
    description: 'مناسب کسب‌وکارهای کوچک با نیازهای پایه',
    features: [
      'تا ۵۰ محصول',
      'درگاه پرداخت آنلاین',
      'ثبت سفارش آنلاین',
      'پنل مدیریت ساده',
      'ریسپانسیو (موبایل‌فرندلی)',
      'سئو پایه',
      '۱ ماه پشتیبانی',
    ],
  },
  {
    name: 'پکیج نقره‌ای',
    emoji: '🥈',
    priceMin: 15000000,
    priceMax: 28000000,
    color: 'from-slate-500 to-slate-300',
    description: 'مناسب فروشگاه‌های متوسط با امکانات کامل',
    features: [
      'تا ۵۰۰ محصول',
      'درگاه پرداخت آنلاین',
      'کد تخفیف',
      'سیستم کاربری کامل',
      'وبلاگ',
      'اتصال به شبکه‌های اجتماعی',
      'پیامک اطلاع‌رسانی',
      'سئو حرفه‌ای',
      'گوگل آنالیتیکس',
      '۳ ماه پشتیبانی',
    ],
  },
  {
    name: 'پکیج طلایی',
    emoji: '🥇',
    priceMin: 28000000,
    priceMax: 55000000,
    color: 'from-yellow-500 to-amber-300',
    description: 'مناسب فروشگاه‌های بزرگ با امکانات پیشرفته',
    features: [
      'محصولات نامحدود',
      'طراحی اختصاصی (UI/UX)',
      'همه امکانات نقره‌ای',
      'مقایسه محصولات',
      'علاقه‌مندی‌ها (Wishlist)',
      'چت آنلاین',
      'محاسبه هزینه ارسال خودکار',
      'ایمیل سازمانی',
      'آموزش کامل',
      '۶ ماه پشتیبانی',
    ],
  },
  {
    name: 'پکیج الماس',
    emoji: '💎',
    priceMin: 55000000,
    priceMax: 120000000,
    color: 'from-indigo-600 to-purple-400',
    description: 'سیستم چند فروشنده، پروژه‌های سازمانی و خاص',
    features: [
      'همه امکانات طلایی',
      'سیستم چند فروشنده (Multi-Vendor)',
      'طراحی لوکس اختصاصی',
      'اپلیکیشن موبایل (اختیاری)',
      'سیستم مدیریت انبار',
      'گزارش‌گیری پیشرفته',
      'سرور اختصاصی',
      '۱۲ ماه پشتیبانی',
    ],
  },
];

export function calculateScore(data: FormData): number {
  let score = 0;

  // Product count
  if (data.productCount === 'lt50') score += 1;
  else if (data.productCount === '50-200') score += 2;
  else if (data.productCount === '200-1000') score += 3;
  else if (data.productCount === 'gt1000') score += 4;

  // Features
  if (data.paymentGateway === 'yes') score += 1;
  if (data.autoShippingCalc === 'yes') score += 1;
  if (data.discountCode === 'yes') score += 1;
  if (data.userAuth === 'yes') score += 1;
  if (data.wishlist === 'yes') score += 1;
  if (data.compareProducts === 'yes') score += 1;
  if (data.liveChat === 'yes') score += 2;
  if (data.multiVendor === 'yes') score += 5;

  // Design
  if (data.designStyle === 'luxury') score += 2;
  if (data.hasBranding === 'no') score += 1;

  // Pages
  if (data.neededPages.includes('blog')) score += 1;
  if (data.neededPages.includes('faq')) score += 0.5;

  // SEO & Marketing
  if (data.basicSeo === 'yes') score += 1;
  if (data.googleAnalytics === 'yes') score += 0.5;
  if (data.socialMediaConnect === 'yes') score += 0.5;
  if (data.smsNotification === 'yes') score += 1;

  // Infrastructure
  if (data.orgEmail === 'yes') score += 0.5;

  // Support
  if (data.trainingNeeded === 'yes') score += 0.5;
  if (data.supportDuration === '6months') score += 1;
  else if (data.supportDuration === '12months') score += 2;

  return score;
}

export function getRecommendedPackage(score: number): Package {
  if (score >= 20) return packages[3]; // Diamond
  if (score >= 12) return packages[2]; // Gold
  if (score >= 6) return packages[1];  // Silver
  return packages[0];                  // Bronze
}

export function estimatePrice(data: FormData): { min: number; max: number } {
  const score = calculateScore(data);
  const pkg = getRecommendedPackage(score);
  return { min: pkg.priceMin, max: pkg.priceMax };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}
