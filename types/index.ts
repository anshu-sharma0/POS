export type User = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  gender?: string;
  employeeId?: string;
  password?: string;
  stewardNo?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  department?: string | null;
  profile?: string | null;
};

export type Category = {
  id: string;
  name: string;
  tax?: string;
  products?: Product[];
  subcategory?: Subcategory[];
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
};

export type Subcategory = {
  id: string;
  name: string;
  category?: Category;
  categoryId: string;
  products?: Product[];
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name?: string | null;
  measuredIn?: string;
  price: string;
  code: string;
  category?: Category;
  categoryId: string;
  subcategory?: Subcategory;
  subcategoryId: string;
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
  OrderItem?: OrderItem[];
  tax?: string;
  taxType?: string;
  modifier?: string;
};

export type Billing = {
  id: string;
  name: string;
  phone: string;
  products: Product[];
  subTotal: number;
  discount: number;
  tax: number;
  netAmount: number;
  status: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  foodDiscount: number;
  billNo: string;
  barDiscount: number;
  discountReason: string | null;
  billReason: string | null;
  billClosedBy: string | null;
  kotList: KotListItem[];
  table: Table;
  lastVoidBillAt?: string;
  payment?: payment;
  balance?: number; // for summary wise case
  isBillPrinted: boolean;
  gst?: string;
  vat?: string;
  dayCloseDate?: string;
};

export type CancelKotType = {
  selectTable: string;
  itemCode: string;
  qty: string;
  typeReason: string;
  cancelledBy: string;
};

export type Table = {
  id: string;
  code: string;
  status?: string;
  billing?: Billing[];
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  productId: string;
  product?: Product;
  billingId: string;
  Billing?: Billing;
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
};

export type kotData = {
  amount: string;
  canceledBy: string;
  canceledReason: string;
  isCanceled: boolean;
  modifier: string;
}[];

export interface SelectedProductFormInfoType {
  name: string;
  search: string;
  mobileNo: string;
  tableNo: string;
  stewardNo: string;
  itemCode: string;
  quantity: string;
  modifier: string;
}
export interface PayloadData {
  canceledBy: string;
  canceledReason: string;
  kotData: {
    id: string;
    productId: string;
    quantity: number;
  }[];
}
[];

export interface selectedProductFormRefType {
  id: string;
  name: string;
  tax: string;
  type?: string;
  percentage?: string;
  subcategory?: Subcategory[];
  category?: Category;
  isDeleted: Boolean;
  createdAt: string;
  updatedAt: string;
}

export type TableData = {
  [key: string]: string[];
};

export interface taxType {
  percentage: string | number | null;
  type: string | null;
  taxType?: string | null;
}

export interface TaxTypeProps {
  percentage: number | null;
  taxType: string | null;
}

export interface foundKotItemIndexType {
  id: string;
  productId: string;
  quantity: number;
}
[];

export interface KotItemType {
  amount: number;
  id: string;
  canceledBy: string;
  canceledReason: string;
  quantity: number;
  modifier: string;
  isCanceled: boolean;
  product?: Product;
  productId: string;
}

export interface complimentryBillFormDataType {
  tableNo: string;
  billNo: string;
  reason: string;
  reference: string;
}

export interface complimentaryBillType {
  amount: number;
  canceledBy: string;
  canceledReason: string;
  isCanceled: boolean;
  modifier: string;
  product: Product;
  productId: string;
  quantity: number;
}

export interface KotsForTable extends OrderItem {
  kotData: kotData;
  stewardNo: string;
  kotNo: string;
  status: string;
  modifier: string;
  tableId: string;
  table?: Table;
}
[];

export interface stockMasterPayloadType {
  values: string;
  categoryId: string | undefined;
  subcategoryId: string | undefined;
  tax: string | number | undefined;
  taxType: string;
  productId: string | undefined;
}

export interface SelectedProduct extends Product {
  quantity: number;
  orderedBy?: string;
  isEditable?: boolean;
  modifier?: string;
}

export type CreateProduct = {
  name: string;
  measuredIn?: string;
  price: string;
  code: string;
  categoryId: string;
  subcategoryId: string;
};

export type KotItem = {
  id?: string;
  quantity: number;
  productId: string;
};

export interface createBillingType {
  name: string;
  phone: string;
  tableId: string;
}
export type host = {
  id: string;
  phone: string;
  name: string;
  amount: string;
  tableCode: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
};

export interface createKotType {
  kotData: KotItem[];
  billingId: string;
  tableId: string;
}

export interface billForTableCodeType extends Billing {
  products: Product[];
}

export interface CancelKotCodeType extends CancelKotType {
  products: JSON[];
}

export interface cancelKotPayloadData {
  payloadData: CancelKotType;
  kotData: {
    id: string;
    productId: string;
    quantity: number;
  }[];
}
[];

export interface UpdatedPayloadType {
  canceledBy?: string;
  canceledReason?: string;
  id?: string;
  productId?: string;
  quantity?: number;
  kotData: {
    id: string;
    productId: string;
    quantity: number;
  }[];
}

export interface Bill {
  id: string;
  name: string;
  phone: string;
  products: Product[];
  subTotal: number;
  discount: number;
  tax: number;
  netAmount: number;
  status: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  foodDiscount: number;
  barDiscount: number;
  discountReason: string | null;
  billReason: string | null;
  billClosedBy: string | null;
  billNo?: string | number;
  kotList: KotListItem[];
  table: Table;
  payment: payment;
  isBillPrinted: boolean;
}

interface KotListItem {
  id: string;
  status: string;
  kotData: KotData[];
  modifier: string;
  billingId: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface KotData {
  productId: string;
  quantity: number;
  modifier: string | null;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
}

export interface kotDiscription {
  productId: string;
  quantity: number;
  modifier: string | null;
  product?: Product;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
  dayCloseDate: string;
}

export interface TableCodeProps {
  id: string;
  name: string;
  phone: string;
  products: Product[];
  subTotal: number;
  discount: number;
  tax: number;
  amount: number;
  netAmount: number;
  status: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  foodDiscount: number;
  barDiscount: number;
  discountReason: string | null;
  billReason: string | null;
  billClosedBy: string | null;
}

export type OptionProps = {
  value: any;
  label: any;
}[];

export interface Card {
  amount: number;
  bank: string;
  number: string;
}

export interface payment {
  balance: number;
  cards: Card[];
  cashAmount: number;
  chequeAmount: number | null;
  creditCardAmount: number;
  status: string;
  pendingAmount: number | null;
}

export interface employeeMasterPayload {
  department?: string;
  email?: string;
  id: string;
  name?: string;
  password?: string;
  profile?: string;
  role?: string;
  phone?: string;
  gender?: string;
  employeeId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OptionType {
  value: string;
  label: string;
}
[];

export interface OptionHandle {
  code: string;
  createdAt: string;
  id: string;
  isBillPrinted: string;
  isDeleted: string;
  status: string;
}
[];
export type TaxTypes = {
  userId?: string;
  type: string;
  percentage: string | number | null;
};

export type Restaurant = {
  id?: string;
  firmName?: string;
  outletName?: string;
  phone?: string;
  address?: string;
  taxId?: string | null;
  taxIdType?: string | null;
  discountPassword?: string;
  users?: User[];
  taxes?: TaxTypes[];
  restaurantSetting?: string | null;
  userId?: string;
};

export interface restaurantSettingFormType {
  firmName: string;
  outletName: string;
  address: string;
  taxId: string | null;
  taxIdType: string | null;
}
interface KotListItem {
  id: string;
  status: string;
  kotData: KotData[];
  modifier: string;
  billingId: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface KotData {
  productId: string;
  quantity: number;
  modifier: string | null;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
}

export interface updatePasswordPayloadType {
  currentPassword: string;
  newPassword: string;
  id?: string;
  userId?: string | null;
}
export interface kotDataType {
  productId: string;
  quantity: number;
  modifier: string | null;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
  table: Table;
}
export interface kotList {
  id: string;
  status: string;
  kotData: kotDiscription[];
  kotNo: string;
  stewardNo: string;
  billing?: Billing;
  modifier: string;
  billingId: string;
  table: Table;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  dayCloseDate?: string;
}

export interface cancelKotReportType {
  id: string;
  status: string;
  kotData: kotDiscription[];
  kotNo: string;
  stewardNo: string;
  modifier: string;
  billingId: string;
  table: Table;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  billing: Billing;
}

export interface cancelKotReportType {
  id: string;
  status: string;
  kotData: kotDiscription[];
  kotNo: string;
  stewardNo: string;
  modifier: string;
  billingId: string;
  table: Table;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  billing: Billing;
}

export interface TableCodeProps {
  id: string;
  name: string;
  phone: string;
  products: Product[];
  subTotal: number;
  discount: number;
  tax: number;
  amount: number;
  netAmount: number;
  status: string;
  tableId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  foodDiscount: number;
  barDiscount: number;
  discountReason: string | null;
  billReason: string | null;
  billClosedBy: string | null;
}

export interface CsvTypeEmployeeMaster {
  Name: string;
  Email: string;
  PhoneNumber: string | null;
  Department: string;
  Profile: string;
}

export interface TableCodeState {
  tableData: string[];
  hideTableData: string[];
  unhideTableData: string[];
}
export interface Order {
  productId: string;
  quantity: number;
  modifier: string;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
  product: Product;
  amount: number;
  id: string;
  kotData: KotData[];
}

export interface KotDataWithProduct {
  amount: number;
  canceledBy: string;
  canceledReason: string;
  isCanceled: string;
  modifier: string;
  product: Product[];
  productId: string;
  quantity: string;
}

export interface kotType {
  id: string;
  status: string;
  kotData?: KotDataWithProduct[] | null | undefined;
  kotNo: string;
  modifier: string;
  stewardNo?: string | null;
  billingId?: string | null;
  billing?: Billing | null;
  tableId?: string | null;
  table?: Table | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
[];

export interface elementWithKotData {
  kotData?: KotData[];
}
export interface idType {
  id?: string;
}

export interface BillPrintPayloadType {
  id: string;
  subTotal?: number;
  payment?: {
    balance?: number | string;
    cards?: {
      number?: number | null;
      amount?: number;
      bank?: string;
    }[];
    cashAmount?: number;
    chequeAmount?: number;
    creditCardAmount?: number;
  };
  status?: string;
}

export interface payloadType {
  restaurantSetting: Restaurant | undefined;
  id?: string | undefined;
  userId?: string | undefined;
}

export interface TableCodeState {
  tableData: string[];
  hideTableData: string[];
  unhideTableData: string[];
}

// export interface  BillPrintPayloadType {
//   discount?: number;
//   id?: string;
//   netAmount?: number | null;
//   tax?: number;
//   taxAmount?: number;
//   subTotal: number;
//   discountReason?: string | null;
//   foodDiscount?: number | null;
//   barDiscount?: number | null;
// };

export type FilterProps = {
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
};

export type PrintContentProps = {
  data: any;
  title: string;
  headers: Array<string>;
  keys: Array<string>;
  view?: string;
  productData?: any;
};

export type ItemSummaryWiseProps = {
  category: string;
  itemCode: string;
  itemName: string;
  quantity: string;
  amount: string;
};

type CategoryOption = {
  id: string;
  name: string;
};

type SubCategoryOption = {
  id: string;
  name: string;
};

type ProductOption = {
  id: string;
  name: string;
};

export type DataStructure = {
  category?: CategoryOption[];
  products?: ProductOption[];
  subCategory?: SubCategoryOption[];
};

export type OrderIteGroupWise = {
  productId: string;
  quantity: number;
  modifier: string;
  isCanceled: boolean;
  canceledBy: string;
  canceledReason: string;
  product: Product;
  amount: number;
  table: Table;
};
