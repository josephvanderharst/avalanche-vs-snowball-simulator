// export type Debt = {
// 	name: NonNullable<string>;
// 	amount: NonNullable<number>;
// 	interestRate: number | null; // If null, use minPayment
// 	minPayment: number | null; // If null, use interestRate
// };

export type Debt = {
	name: NonNullable<string>;
	amount: NonNullable<number>;
} & (
	{ interestRate: NonNullable<number>; minPayment?: number }
	| { interestRate?: number; minPayment: NonNullable<number> }
);
