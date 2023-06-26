export interface ServiceDto {
  id: string;
  category: string;
  price: number;
  description: string;
  scheduling: boolean;
  priority: boolean;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    blockDate: string | null;
    ratings: {
      providerRating: number | null;
      serviceRating: number | null;
      clientRating: number | null;
    };
  };
}

export interface OrderDto {
  serviceId: string;
  schedulingDate?: Date;
}
