import { useState } from "react";
import DebtList from "../components/DebtList";
import { computeMinPayment, type Debt } from "../types/debt";
import { extractInputNumber } from "../shared/input-number-funcs";
import { $money } from "../shared/money-format";

export type SimulatorProps = {
  initDebts?: Debt[];
};

export default function Simulator({ initDebts }: SimulatorProps) {
  const [debts, setDebts] = useState<Debt[]>(initDebts ?? []);

  const [initMargin, setInitMargin] = useState<number>(null!);

  const sumOfBalance = () => debts.reduce((accum, d) => accum + d.amount!, 0);
  const sumOfMinPayment = () => debts.reduce((accum, d) => accum + computeMinPayment(d), 0);

  return (
    <>
      <div className="d-flex flex-column g-2">
        <DebtList debts={debts} setDebts={setDebts} />

        <div className="my-3">
          <span>Paying off <b>{$money(sumOfBalance())}</b></span>
          <br/>
          <i>With an initial sum of minimum payments of</i> <b>{$money(sumOfMinPayment())}</b>
        </div>

        {/* <code>{JSON.stringify(debts)}</code> */}

        <b>Additional initial margin?</b>
        <div>
          $&nbsp;<input type="number" value={initMargin} onChange={e => setInitMargin(extractInputNumber(e)!)} />
        </div>
      </div>
    </>
  );
};
