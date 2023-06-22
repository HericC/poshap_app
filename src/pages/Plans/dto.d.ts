export interface PlansDto {
  key: string;
  name: string;
  description: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  semesterPrice: number;
}

export interface updatePlanDto {
  key: string;
  typePlan: string;
  typePayment: string;
}
