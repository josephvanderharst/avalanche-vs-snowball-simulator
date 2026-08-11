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
          <span>Ended with { simulation.type === 'snowball' ? 'a snowball' : 'an avalanche'} of <b>{$money(simulation.summary.endingSnowball)}</b>!</span><br/>
          <span>Paid a total of <b>{$money(simulation.summary.totalPaid)}</b>!</span>
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
            <th>{ simulation.type === 'snowball' ? 'Snowball' : 'Avalanche'}</th>
            <th>Month</th>
            {simulation.debtNames.map(name => <th>{name}</th>)}
            <th className="left-align">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr key={0}>
            <th className="align-text-top">{$money(simulation.months[0].beforeSnowball)}</th>
            <th className="align-text-top">Before</th>
            {simulation.debtNames.map((_, dIndex) =>
              <td className="align-text-top">{
                simulation.months[0].beforeDebtBalances[dIndex] <= 0
                  ? <i className="gray">{$money(simulation.months[0].beforeDebtBalances[dIndex])}</i>
                  : <span>{$money(simulation.months[0].beforeDebtBalances[dIndex])}</span>
              }</td>)
            }
            <td className="left-align align-text-top">
              {simulation.months[0].notes.map((n, nIndex, nArr) => <>
                <i>{n}</i>
                {nIndex != nArr.length - 1 && <br />}
              </>)}
            </td>
          </tr>
          {simulation.months.map((month, index) => <>
            <tr key={index + 1}>
              <th className="align-text-top">{$money(month.beforeSnowball)}</th>
              <th className="align-text-top">{ index + 1 }</th>
              {simulation.debtNames.map((_, dIndex) =>
                <td className="align-text-top">{
                  month.afterDebtBalances[dIndex] <= 0
                    ? <i className="gray">{$money(month.afterDebtBalances[dIndex])}</i>
                    : <span>{$money(month.afterDebtBalances[dIndex])}</span>
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
