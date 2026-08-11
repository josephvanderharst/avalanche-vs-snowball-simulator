import { computeInterestRate, computeMinPayment, type Debt } from "../types/debt";
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

export type SimulationType = 'snowball' | 'avalanche';

export type SimulationDetails = {
  allPaidOff: boolean;
  type: SimulationType;
  debtNames: string[];
  months: SimulationMonth[];
  summary: SimulationSummary;
};

function sortDebtsForSnowball(debts: Debt[]): Debt[] {
  return makeFilledOutDebtCopies(debts)
    .sort((d1,d2) => d1.amount! - d2.amount!); // Sort by ascending balance
}

function makeFilledOutDebtCopies(debts: Debt[]): Debt[] {
  const newDebts = debts
    .map(d => ({...d}))
    .map(debt => {
      if (debt.interestRate == null && debt.minPayment != null) {
        debt.interestRate = computeInterestRate(debt);
      }
      else if (debt.minPayment == null && debt.interestRate != null) {
        debt.minPayment = computeMinPayment(debt);
        // Should be recalculated every month...
      }
      else if (debt.interestRate == null && debt.minPayment == null) {
        throw new Error('Debt cannot have null interest rate and min payment');
      }

      return debt;
    });

  return newDebts;
}

function sortDebtsForAvalanche(debts: Debt[]): Debt[] {
  return makeFilledOutDebtCopies(debts)
    .sort((d1,d2) => d2.interestRate! - d1.interestRate!); // Sort by descending interest rate
}

export function performSimulation(debts: Debt[], initialMargin: number, type: SimulationType): SimulationDetails {
  debts = type === 'snowball'
    ? sortDebtsForSnowball(debts)
    : sortDebtsForAvalanche(debts);

  const simulationMonths: SimulationMonth[] = [];

  let margin = initialMargin;
  let totalPaid = 0;
  let numMonths = 1;
  let currDebtIndex = 0;

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

  return {
    allPaidOff: allPaidOff,
    type: type,
    debtNames: debts.map(d => d.name!),
    months: simulationMonths,
    summary: {
      totalPaid: totalPaid,
      endingSnowball: margin,
      numMonthsToComplete: simulationMonths.length,
    },
  };
}
