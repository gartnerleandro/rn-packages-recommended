declare module 'react-native-purchases-ui' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';
  import { CustomerInfo, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';

  export interface PaywallViewProps extends ViewProps {
    offering: string;
    customerInfo?: CustomerInfo | null;
    dismissRequest?: () => void;
    onDismiss?: () => void;
    onPurchaseStarted?: (packageType: string, package: PurchasesPackage) => void;
    onPurchaseCompleted?: (customerInfo: CustomerInfo) => void;
    onPurchaseCancelled?: () => void;
    onPurchaseError?: (error: Error) => void;
    onRestoreStarted?: () => void;
    onRestoreCompleted?: (customerInfo: CustomerInfo) => void;
    onRestoreError?: (error: Error) => void;
    fontFamily?: string;
  }

  export interface PaywallFooterContainerViewProps extends ViewProps {
    offering: string;
    customerInfo?: CustomerInfo | null;
    onPurchaseStarted?: (packageType: string, package: PurchasesPackage) => void;
    onPurchaseCompleted?: (customerInfo: CustomerInfo) => void;
    onPurchaseCancelled?: () => void;
    onPurchaseError?: (error: Error) => void;
    onRestoreStarted?: () => void;
    onRestoreCompleted?: (customerInfo: CustomerInfo) => void;
    onRestoreError?: (error: Error) => void;
    fontFamily?: string;
  }

  export const PaywallView: ComponentType<PaywallViewProps>;
  export const PaywallFooterContainerView: ComponentType<PaywallFooterContainerViewProps>;
} 