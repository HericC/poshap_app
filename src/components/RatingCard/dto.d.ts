export interface RatingProviderDto {
  providerRating: number;
  serviceRating: number;
  providerNote: string;
  serviceNote: string;
  userId: string;
}

export interface RatingClientDto {
  rating: number;
  note: string;
  userId: string;
}
