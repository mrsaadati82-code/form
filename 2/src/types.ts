export interface FormData {
  // Step 1: Business Info
  brandName: string;
  activityField: string;
  hasSite: string;
  currentSiteUrl: string;
  mainGoals: string[];

  // Step 2: Products
  productCount: string;
  hasVariants: string;
  contentReady: string[];
  contentUploader: string;

  // Step 3: Design
  designStyle: string;
  competitorLinks: string;
  hasBranding: string;

  // Step 4: Features
  onlineOrder: string;
  paymentGateway: string;
  shippingMethod: string[];
  autoShippingCalc: string;
  discountCode: string;
  userAuth: string;
  wishlist: string;
  compareProducts: string;
  liveChat: string;
  multiVendor: string;

  // Step 5: Pages & Content
  neededPages: string[];
  contentProvider: string;

  // Step 6: SEO & Marketing
  basicSeo: string;
  googleAnalytics: string;
  socialMediaConnect: string;
  smsNotification: string;

  // Step 7: Infrastructure & Support
  hasDomain: string;
  hasHosting: string;
  orgEmail: string;
  trainingNeeded: string;
  supportNeeded: string;
  supportDuration: string;

  // Step 8: Timeline & Budget
  deliveryTime: string;
  budget: string;
}

export interface Package {
  name: string;
  emoji: string;
  priceMin: number;
  priceMax: number;
  color: string;
  features: string[];
  description: string;
}
