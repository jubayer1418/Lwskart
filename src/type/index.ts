
export type Product = {
    id: string;
    name: string;
    price: number;
    img: string;
    thumbnail: string[];
    brand: string;
    sku: string;
    reviews: string;
    rating: number;
    description: string;
    availability: string;
    discountPrice?: number;
    categoryId: string;
    createdAt: string;
    releaseDate: string;
  };
  export interface SearchParams {
    searchTerm?: string;
    category?: string | string[];
    min_price?: string;
    max_price?: string;
    size?: string;
  }