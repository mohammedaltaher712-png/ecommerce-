// ================= AUTH =================

export type DataRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type Register = {
  user: {
    name: string;
    email: string;
  };
};

export type DataLogin = {
  email: string;
  password: string;
};

export type Login = {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  message: string;
};

// ================= BASIC ENTITIES =================

export interface BrandType {
  id: number;
  name: string;
}

export interface ReviewsType {
  id: number;
  product_id: string;
  rating: number;
  comment: string;
}

export interface CouponsType {
  id: number;
  code: string;
  discount: number;
  expires_at: string;
}

export interface ProductImageType {
  id: number;
  image: string;
}

// ================= PRODUCT =================

export interface ProductType {
  id: number;
  name: string;
  image: string;
  price: string;
  category_id: number;
  description: string;
  warranty: string;
  quantity: string;
  condition: string;

  brand: BrandType;
  reviews: ReviewsType[];
  coupons: CouponsType[];

  images?: ProductImageType[];
  category?: CategoryType;
}

// ================= CATEGORY =================

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  icon: string;

  products: ProductType[];
  brand: BrandType[];
  reviews: ReviewsType[];
  coupons: CouponsType[];
};

export type CategoryBySlugResponse = {
  data: CategoryType;
  products: ProductType[];
};

// ================= ORDER =================

export type OrderItemType = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: ProductType;
};

export type DataAddress = {
  user_id: string;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
};

export type OrderType = {
  id: number;
  user_id: number;
  total: string;
  status: string;
  created_at: string;
  updated_at: string;

  items: OrderItemType[];
  address: DataAddress;
};

// ================= ADDRESS =================

export type Address = {
  id: number;
  user_id: number;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
};

export type AddressResponse = {
  data: Address[];
};