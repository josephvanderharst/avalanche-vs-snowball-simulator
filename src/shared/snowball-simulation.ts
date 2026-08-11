import type { Debt } from "../types/debt";
import { $money } from "./money-format";

type SimulationMonth = {
  beforeDebtBalances: number[];
  afterDebtBalances: number[];
  beforeAccumPayments: number;
  afterAccumPayments: number;
  beforeSnowball: number;
  afterSnowball: number;
  notes: string[];
};

type SimulationSummary = {
  totalPaid: number;
  numMonthsToComplete: number;
  endingSnowball: number;
};

export type SimulationDetails = {
  allPaidOff: boolean;
  debtNames: string[];
  months: SimulationMonth[];
  summary: SimulationSummary;
};

function fillOutDebts(debts: Debt[]): Debt[] {
  return debts
    .map(d => ({...d}))
    .sort((d1,d2) => d1.amount! - d2.amount!) // Sort by ascending balance
    .map(debt => {
      if (debt.interestRate == null && debt.minPayment != null) {
        debt.interestRate = debt.minPayment / 1200 / debt.amount!;
      }
      else if (debt.minPayment == null && debt.interestRate != null) {
        debt.minPayment = debt.amount! * debt.interestRate / 1200;
        // Should be recalculated every month...
      }
      else if (debt.interestRate == null && debt.minPayment == null) {
        throw new Error('Debt cannot have null interest rate and min payment');
      }

      return debt;
    });
}

export function performSnowball(debts: Debt[], initialMargin: number): SimulationDetails {
  debts = fillOutDebts(debts);

  const simulationMonths: SimulationMonth[] = [];

  let margin = initialMargin;
  let totalPaid = 0;
  let numMonths = 1;
  let currDebtIndex = 0;
  const initialTotalOwed = debts
    .map(d => d.amount)
    .reduce((accum, val) => accum! + val!, 0);

  for(; numMonths <= 200 && currDebtIndex < debts.length; numMonths++) {
    const month: SimulationMonth = {
      beforeDebtBalances: debts.map(d => d.amount!),
      afterDebtBalances: [],
      beforeAccumPayments: totalPaid,
      afterAccumPayments: null!,
      beforeSnowball: margin,
      afterSnowball: null!,
      notes: [],
    };

    console.log(`Month ${numMonths}: ${$money(margin)} of margin to use.`);

    let thisMonthsMargin = margin;
    while (thisMonthsMargin > 0 && currDebtIndex < debts.length) {
      const debt = debts[currDebtIndex];
      if (debt == null) {
        month.notes.push(`All debts paid off! ${$money(thisMonthsMargin)} margin left over.`);
        break;
      }

      const paidOff = Math.min(thisMonthsMargin, debt.amount!);

      debt.amount! -= paidOff;
      thisMonthsMargin -= paidOff;
      totalPaid += paidOff;
      totalPaid += debts
        .map(d => d.minPayment ?? 0)
        .reduce((accum, val) => accum + val, 0);

      if (Math.abs(debt.amount!) < 0.01) {
        month.notes.push(`Paid off ${debt.name} with ${$money(paidOff)}!`);
        month.notes.push(`Added ${$money(debt.minPayment ?? 0)} of margin to the snowball.`);
        margin += debt.minPayment ?? 0;
        // debts.shift();
        currDebtIndex++;
      }
      else {
        month.notes.push(`Paid down ${debt.name}: ${$money(debt.amount!)} remains.`);
      }
    }

    month.afterAccumPayments = totalPaid;
    month.afterSnowball = margin;
    month.afterDebtBalances = debts.map(d => d.amount!);

    simulationMonths.push(month);
  }

  const allPaidOff = currDebtIndex >= debts.length;
  if (!allPaidOff) {
    console.log(`Could not pay off all debts in ${numMonths} months, starting with ${$money(initialMargin)} of initial margin.`);
  }
  else {
    console.log(`Paid off ${$money(initialTotalOwed!)} in ${numMonths} months!`);
    console.log(`Paid a total of ${$money(totalPaid)}.`);
    console.log(`Ended with a snowball of ${$money(margin)}`);
  }

  return {
    allPaidOff: allPaidOff,
    debtNames: debts.map(d => d.name!),
    months: simulationMonths,
    summary: {
      totalPaid: totalPaid,
      endingSnowball: margin,
      numMonthsToComplete: simulationMonths.length,
    },
  };
}
