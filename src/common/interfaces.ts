export type IReviewType = {
    name: string;
    avatar: string;
    description: string;
    punctuation: number;
  }
  
  export type ProductType = {
    id: string;
    name: string;
    thumb: string;
    price: string;
    count: number;
    color: string;
    size: string;
    images: string[];
    discount?: string;
    currentPrice: number;
    reviews: IReviewType[];
  }
  
  export type IProductTypeList = {
    id: string;
    name: string;
    price: string;
    color: string;
    images: string[];
    discount?: string;
    currentPrice?: number;
  }
  
  export type IProductStoreType = {
    id: string;
    name: string;
    thumb: string;
    price: number;
    count: number;
    color: string;
    size: string;
  }