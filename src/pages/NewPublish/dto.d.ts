export interface PublishDto {
  category: string;
  price: number;
  description?: string;
  scheduling?: boolean;
  priority?: boolean;
}

export interface PublicationDto {
  id?: string;
  category?: string;
  price?: number;
  description?: string;
  scheduling?: boolean;
  priority?: boolean;
}
