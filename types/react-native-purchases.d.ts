declare module 'react-native-purchases' {
  export enum LOG_LEVEL {
    VERBOSE = 'VERBOSE',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
  }

  export enum PURCHASE_TYPE {
    INAPP = 'INAPP',
    SUBS = 'SUBS'
  }

  export interface CustomerInfo {
    entitlements: {
      active: Record<string, Entitlement>;
      all: Record<string, Entitlement>;
    };
    activeSubscriptions: string[];
    allPurchasedProductIdentifiers: string[];
    latestExpirationDate: string | null;
    firstSeen: string;
    originalAppUserId: string;
    requestDate: string;
    allExpirationDates: Record<string, string | null>;
    allPurchaseDates: Record<string, string>;
    originalApplicationVersion: string | null;
    originalPurchaseDate: string | null;
    managementURL: string | null;
    nonSubscriptionTransactions: any[];
  }

  export interface Entitlement {
    identifier: string;
    isActive: boolean;
    willRenew: boolean;
    periodType: string;
    latestPurchaseDate: string;
    latestPurchaseId: string;
    productIdentifier: string;
    isSandbox: boolean;
    unsubscribeDetectedAt: string | null;
    billingIssueDetectedAt: string | null;
    ownershipType: 'PURCHASED' | 'FAMILY_SHARED' | 'UNKNOWN';
    store: 'APP_STORE' | 'PLAY_STORE' | 'AMAZON' | 'MAC_APP_STORE' | 'STRIPE';
    expirationDate: string | null;
    productPlanIdentifier: string | null;
  }

  export interface PurchasesConfiguration {
    apiKey: string;
    appUserID?: string;
    observerMode?: boolean;
    userDefaultsSuiteName?: string;
    useAmazon?: boolean;
    usesStoreKit2IfAvailable?: boolean;
    shouldShowInAppMessaging?: boolean;
  }

  export interface ProductsResponse {
    products: Product[];
  }

  export interface IntroPrice {
    price: number;
    priceString: string;
    cycles: number;
    period: string;
    periodUnit: string;
    periodNumberOfUnits: number;
  }

  export interface SubscriptionPeriod {
    unit: string;
    value: number;
  }

  export interface Product {
    identifier: string;
    description: string;
    title: string;
    price: number;
    priceString: string;
    currencyCode: string;
    currencySymbol?: string;
    introPrice?: IntroPrice;
    discounts?: any[];
    subscriptionPeriod?: SubscriptionPeriod;
    productCategory?: string;
    productType: 'CONSUMABLE' | 'NON_CONSUMABLE' | 'AUTO_RENEWABLE_SUBSCRIPTION' | 'NON_RENEWABLE_SUBSCRIPTION';
    presentedOfferingIdentifier?: string;
  }

  export interface PurchasesOffering {
    productIdentifier: string;
    product: Product;
    packageType: string;
  }

  export interface PurchasesPackage {
    identifier: string;
    packageType: string;
    product: Product;
    presentedOfferingContext: any;
  }

  export interface OfferingsResponse {
    current?: {
      identifier: string;
      availablePackages: PurchasesOffering[];
    };
    all: Record<string, {
      identifier: string;
      availablePackages: PurchasesOffering[];
    }>;
  }

  export interface PurchaseResult {
    customerInfo: CustomerInfo;
    productIdentifier: string;
  }

  export default class Purchases {
    static configure(configuration: PurchasesConfiguration): Promise<void>;
    static getPurchaserInfo(): Promise<CustomerInfo>;
    static getCustomerInfo(): Promise<CustomerInfo>;
    static getOfferings(): Promise<OfferingsResponse>;
    static purchasePackage(aPackage: PurchasesPackage): Promise<PurchaseResult>;
    static purchaseProduct(productIdentifier: string, upgradeInfo?: any, type?: PURCHASE_TYPE): Promise<PurchaseResult>;
    static restorePurchases(): Promise<CustomerInfo>;
    static logIn(appUserID: string): Promise<{ customerInfo: CustomerInfo; created: boolean }>;
    static logOut(): Promise<void>;
    static setLogLevel(level: LOG_LEVEL): void;
    static setDebugLogsEnabled(enabled: boolean): void;
    static addCustomerInfoUpdateListener(listener: (customerInfo: CustomerInfo) => void): () => void;
    static removeCustomerInfoUpdateListener(listener: (customerInfo: CustomerInfo) => void): void;
  }
} 