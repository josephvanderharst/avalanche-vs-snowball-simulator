export type Debt = {
  name: string | null;
  amount: number | null;
  interestRate: number | null;
  minPayment: number | null;
};

export function computeMinPayment(d: Debt): number {
  if (d.minPayment != null) return d.minPayment;
  else if (d.amount != null && d.interestRate != null) {
    return d.amount * (d.interestRate / 100) / 12;
  }
  else return 0;
};

export function computeInterestRate(d: Debt): number {
  if (d.interestRate != null) return d.interestRate;
  else if (d.amount != null && d.minPayment != null) {
    return d.minPayment / d.amount * 100 * 12;
  }
  else return 0;
};

export function isDebtFilledOut(d: Debt): boolean {
  return d.amount != null && (d.minPayment != null || d.interestRate != null);
};
