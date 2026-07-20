import { Debt } from "./debt";

type GrossDetail = {
	month: number;
	before: MonthSummary;
	after: MonthSummary;
};

type MonthSummary = {
	debts: Debt[];
	margin: number;
};

function prepDebts(debts: Debt[]): Debt[] {
	return debts.map(debt => {
		if (debt.interestRate == null && debt.minPayment != null) {
			debt.interestRate = debt.minPayment / 12 / debt.amount;
		}
		else if (debt.minPayment == null && debt.interestRate != null) {
			debt.minPayment = debt.amount * debt.interestRate / 12;
			// Should be recalculated every month...
		}
		else if (debt.interestRate == null && debt.minPayment == null) {
			throw new Error('Debt cannot have null interest rate and min payment');
		}

		return debt;
	});
}

export function CorePayoffMethod(sortedDebts: Debt[], initialMargin: number, maxMonths: number = 200): void {
	let debts = prepDebts(sortedDebts);
	let grossDetails: GrossDetail[] = [];

	let margin = initialMargin;
	let totalPaid = 0;
	let month = 1;

	for(; month < maxMonths && debts.length > 0; month++) {
		let grossDetail: GrossDetail = {
			month: month,
			before: {
				debts: [...debts],
				margin: margin,
			},
			after: null,
		};
	}
}
