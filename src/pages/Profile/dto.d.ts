export interface ProfileDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  blockDate: string | null;
  plan: {
    key: string;
    name: string;
    description: string;
  };
  cpf: string;
  planKey: string;
  planDate: string;
  wallet: number;
  paymentClientId: string | null;
  ratings: {
    providerRating: number | null;
    serviceRating: number | null;
    clientRating: number | null;
  };
}

export interface CancellationScoreDto {
  score: number;
}
