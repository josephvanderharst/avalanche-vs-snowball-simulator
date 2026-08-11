import { useState } from "react";
import DebtList from "../components/DebtList";
import { computeMinPayment, isDebtFilledOut, type Debt } from "../types/debt";
import { extractInputNumber } from "../shared/input-number-funcs";
import { $money } from "../shared/money-format";
import { performSimulation, type SimulationType, type SimulationDetails } from "../shared/snowball-simulation";
import SimulationDisplay from "../components/SimulationDisplay";

export type SimulatorProps = {
  initDebts?: Debt[];
};

export default function Simulator({ initDebts }: SimulatorProps) {
  const [debts, setDebts] = useState<Debt[]>(initDebts ?? []);

  const [initMargin, setInitMargin] = useState<number>(null!);

  const sumOfBalance = () => debts.reduce((accum, d) => accum + d.amount!, 0);
  const sumOfMinPayment = () => debts.reduce((accum, d) => accum + computeMinPayment(d), 0);

  const areDebtsReadyToSimulate = () => {
    const areNumbersFilledOut = debts.every(d => isDebtFilledOut(d));
    const areNamesFilledOut = debts.every(d => (d.name ?? '').trim() !== '');
    const areNamesUnique = [...new Set(debts.map(d => d.name))].length === debts.length;
    const isInitMarginPresent = initMargin != null && initMargin > 0;

    return areNumbersFilledOut && areNamesFilledOut && areNamesUnique && isInitMarginPresent;
  };

  const [simType, setSimType] = useState<SimulationType>('snowball');

  const [simulation, setSimulation] = useState<SimulationDetails>(null!);

  return (
    <>
      <div className="d-flex flex-column gap-4">
        <DebtList debts={debts} setDebts={setDebts} />

        <div>
          <span>Paying off <b>{$money(sumOfBalance())}</b></span>
          <br/>
          <i>With an initial sum of minimum payments of</i> <b>{$money(sumOfMinPayment())}</b>
        </div>

        {/* <code>{JSON.stringify(debts)}</code> */}

        <div>
          <b>Additional initial margin?</b>
          <div>
            $&nbsp;<input type="number" value={initMargin} onChange={e => setInitMargin(extractInputNumber(e)!)} />
          </div>
        </div>

        <div className="d-flex align-self-center gap-3">
          <label>
            <input type="radio"
              value="snowball"
              checked={ simType === 'snowball' }
              onChange={ () => setSimType('snowball') }
            />
            <span className="mx-1">Snowball</span>
          </label>
          <label>
            <input type="radio"
              className="pr-2"
              value="avalanche"
              checked={ simType === 'avalanche' }
              onChange={ () => setSimType('avalanche') }
            />
            <span className="mx-1">Avalanche</span>
          </label>
        </div>

        <div>
          <button className="btn btn-primary"
            disabled={!areDebtsReadyToSimulate()}
            onClick={() => setSimulation(performSimulation(debts, initMargin, simType))}
          >Simulate!</button>
        </div>

        { simulation && <SimulationDisplay simulation={simulation} /> }
      </div>
    </>
  );
};
