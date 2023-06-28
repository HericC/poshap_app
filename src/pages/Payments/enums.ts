export enum PaymentAction {
  'update-plan' = 'Atualizar plano',
  deposit = 'Deposito',
}

export enum PaymentStatus {
  PENDING = 'Pendente',
  RECEIVED = 'Pago',
  RECEIVED_IN_CASH = 'Pago',
  CONFIRMED = 'Precessando',
  OVERDUE = 'Vencido',
}

export enum PaymentType {
  bankSlip = 'Boleto',
}
