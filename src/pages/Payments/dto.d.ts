export interface PaymentsDto {
  id: string;
  value: number;
  status: string;
  action: string;
  type: string;
  url: string;
  dueDate: string;
  planKey: string;
  planTime: number;
  userId: string;
  createdAt: string;
}
