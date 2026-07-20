// export type Debt = {
// 	name: string;
// 	amount: number;
// 	interestRate: number | null; // If null, use minPayment
// 	minPayment: number | null; // If null, use interestRate
// };

export type Debt = {
	name: string;
	amount: number;
} & (
	{ interestRate: number; minPayment?: number | null }
	| { interestRate?: number; minPayment: number }
);
