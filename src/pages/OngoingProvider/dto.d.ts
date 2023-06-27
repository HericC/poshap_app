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
}
