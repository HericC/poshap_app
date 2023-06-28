export interface FilterDto {
  search: string;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  rating: number;
}

export interface MinAndMaxPricesDto {
  minPrice: number;
  maxPrice: number;
}
