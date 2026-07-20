import { Debt } from "./debt";
import { $money } from "./money";

export function FirstDraftMethod(debts: Debt[], initialMargin: number): void {
	debts = [...debts]
		.sort((d1,d2) => d1.amount - d2.amount)
		.map(debt => {
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

	let margin = initialMargin;
	let totalPaid = 0;
	let numMonths = 1;
	const initialTotalOwed = debts
		.map(d => d.amount)
		.reduce((accum, val) => accum + val, 0);

	for(; numMonths < 200 && debts.length > 0; numMonths++) {
		console.log(`Month ${numMonths}: ${$money(margin)} of margin to use.`);

		let thisMonthsMargin = margin;
		while (thisMonthsMargin > 0 && debts.length > 0) {
			const debt = debts[0];
			const paidOff = Math.min(thisMonthsMargin, debt.amount);

			debt.amount -= paidOff;
			thisMonthsMargin -= paidOff;
			totalPaid += paidOff;
			totalPaid += debts
				.map(d => d.minPayment ?? 0)
				.reduce((accum, val) => accum + val, 0);

			if (Math.abs(debt.amount) < 0.01) {
				console.log(`  Paid off ${debt.name} with ${$money(paidOff)}! Added ${$money(debt.minPayment ?? 0)} of margin to the snowball.`);
				margin += debt.minPayment ?? 0;
				debts.shift();
			}
			else {
				console.log(`  Paid down ${debt.name}: ${$money(debt.amount)} remains.`);
			}
		}
	}

	if (debts.length > 0) {
		console.log(`Could not pay off all debts in ${numMonths} months, starting with ${$money(initialMargin)} of initial margin.`);
	}
	else {
		console.log(`Paid off ${$money(initialTotalOwed)} in ${numMonths} months!`);
		console.log(`Paid a total of ${$money(totalPaid)}.`);
		console.log(`Ended with a snowball of ${$money(margin)}`);
	}
};
