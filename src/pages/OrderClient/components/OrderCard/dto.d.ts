export interface OrderDto {
  id: string;
  category: string;
  price: number;
  description: string;
  scheduled: false;
  scheduledDate: string | null;
  clientFirstSchedulingConfirmation: string | null;
  clientSecondSchedulingConfirmation: string | null;
  providerFirstSchedulingConfirmation: string | null;
  providerSecondSchedulingConfirmation: string | null;
  providerId: string;
  clientId: string;
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
  client: {
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

export interface OngoingDto {
  orderId: string;
}
