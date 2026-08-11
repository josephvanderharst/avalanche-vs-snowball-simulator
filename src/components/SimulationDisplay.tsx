import { $money } from "../shared/money-format";
import type { SimulationDetails } from "../shared/snowball-simulation"
import './SimulationDisplay.css';

type SimulationDisplayProps = {
  simulation: SimulationDetails;
};

export default function SimulationDisplay({ simulation }: SimulationDisplayProps) {
  return (
    <div className="align-self-center">
      { simulation.allPaidOff &&
        <>
          <span>Paid off all debts in <b>{simulation.summary.numMonthsToComplete}</b> months!</span><br/>
          <span>Ended with a snowball of <b>{$money(simulation.summary.endingSnowball)}</b>!</span>
        </>
      }
      { !simulation.allPaidOff &&
        <>
          <i>Failed to pay off all debts within {simulation.summary.numMonthsToComplete} months</i>
        </>
      }

      <table className="simulation-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Snowball</th>
            {simulation.debtNames.map(name => <th>{name}</th>)}
            <th className="left-align">Notes</th>
          </tr>
        </thead>
        <tbody>
          {simulation.months.map((month, index) => <>
            <tr>
              <th className="align-text-top">{ index + 1 }</th>
              <th className="align-text-top">{$money(month.beforeSnowball)}</th>
              {simulation.debtNames.map((_, dIndex) =>
                <td className="align-text-top">{
                  month.beforeDebtBalances[dIndex] <= 0
                    ? <i className="gray">{$money(month.beforeDebtBalances[dIndex])}</i>
                    : <span>{$money(month.beforeDebtBalances[dIndex])}</span>
                }</td>)
              }
              <td className="left-align align-text-top">
                {month.notes.map((n, nIndex, nArr) => <>
                  <i>{n}</i>
                  {nIndex != nArr.length - 1 && <br />}
                </>)}
              </td>
            </tr>
          </>)}
        </tbody>
      </table>
    </div>
  )
};
