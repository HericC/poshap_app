export interface PublishDto {
  category: string;
  price: number;
  description?: string;
  scheduling?: boolean;
  priority?: boolean;
}
