export class Permission {
  shouldAdd: boolean;
  shouldEdit: boolean;
  shouldView: boolean;
  shouldDelete: boolean;
  shouldStatusChange: boolean;
  shouldToggle: boolean;
  shouldShowBasicTab: false;
  shouldShowDocumentTab: false;
  shouldShowTransactionTab: false;
}

export class MenuItem {
  path: string;
  title: string;
  // isMaster: boolean;
  groupName: string;
  icon: string;
  children: MenuItem[] = [];
}

export const MenuIcons = {
  MASTER: "content_paste",
  BRAND: "content_paste",
  MODEL: "layers",
  VARIANT: "content_paste",
  PRICE_FACTOR_CONVERSION: "attach_money",
  VARIANT_PRICE_MASTER: "attach_money",
  VEHICLE: "directions_car",
  PRICE_CONVERSION: "money",
  DASHBOARD: "dashboard",
  SUBSCRIPTION: "money",
};


export const MasterMenuItems = {
  BRAND: "brand",
  MODEL: "model",
  VARIANT: "variant",
  PRICE_CONVERSION_FACTOR: "price-conversion-factor",
  VARIANT_PRICE_MASTER: "variant-price-master",
  GST: "gst",
  EMAIL_TEMPLATE: "email-template",
};