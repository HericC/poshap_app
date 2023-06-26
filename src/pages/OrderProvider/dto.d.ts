export interface OrdersDto {
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
}
