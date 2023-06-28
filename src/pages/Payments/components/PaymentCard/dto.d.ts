export interface PaymentDto {
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

export interface BarCodeDto {
  barCode: string;
}

export interface DepositDto {
  value: number;
  typePayment: string;
}
