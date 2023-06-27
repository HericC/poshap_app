export interface OngoingDto {
  id: string;
  category: string;
  price: number;
  description: string;
  finishedDate: string | null;
  canceledDate: string | null;
  providerId: string;
  clientId: string;
  canceledUserId: string | null;
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
  canceledUser: {
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
  } | null;
}
