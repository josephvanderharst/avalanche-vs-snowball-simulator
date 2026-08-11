import type { Debt } from "../types/debt"

export const EXAMPLE_LOAD_DEBTS: Debt[] = [
  {
    name: 'Student Loan',
    amount: 60000,
    interestRate: 10,
    minPayment: 200,
  },
  {
    name: 'Car Loan',
    amount: 20000,
    interestRate: 20,
    minPayment: 500,
  },
  {
    name: 'Credit Card',
    amount: 10000,
    interestRate: 25,
    minPayment: null,
  },
];
