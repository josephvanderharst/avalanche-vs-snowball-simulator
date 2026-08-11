import { computeInterestRate, computeMinPayment, type Debt } from "../types/debt";
import { extractInputNumber } from "../shared/input-number-funcs";
import './DebtList.css';

type DebtListProps = {
  debts: Debt[];
  setDebts: (d: Debt[]) => void;
};

export default function DebtList({ debts, setDebts }: DebtListProps) {
  const removeDebt = (index: number) => {
    const newDebts = [...debts];
    newDebts.splice(index, 1);
    setDebts(newDebts);
  };

  const addDebt = () => {
    const newDebts = [...debts];
    newDebts.push({ name: null!, amount: null!, minPayment: null!, interestRate: null! });
    setDebts(newDebts);
  };

  const updateDebt = (index: number, values: Partial<Debt>) => {
    const newDebts = [...debts];
    const existingDebt = debts[index];
    const updatedDebt: Debt = {...existingDebt, ...values};
    newDebts[index] = updatedDebt;
    setDebts(newDebts);
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <th>Balance:</th>
            <th>Min payment:</th>
            <th>/</th>
            <th>Interest Rate (APY):</th>
            <th></th>
          </tr>

          {debts.map((d, index) => (
            <tr key={index}>
              <td>
                <input type="text" value={d.name!} onChange={e => updateDebt(index, { name: e.target.value })} />
              </td>
              <td>
                $&nbsp;<input type="number"
                  value={d.amount!}
                  onChange={e => updateDebt(index, { amount: extractInputNumber(e) })}
                />
              </td>
              <td>
                $&nbsp;<input type="number"
                  value={d.minPayment!}
                  onChange={e => updateDebt(index, { minPayment: extractInputNumber(e) })}
                  placeholder={computeMinPayment(d).toFixed(2) ?? undefined}
                />
              </td>
              <td>/</td>
              <td>
                <input type="number" className="text-end"
                  value={d.interestRate!}
                  onChange={e => updateDebt(index, { interestRate: extractInputNumber(e) })}
                  placeholder={computeInterestRate(d).toFixed(0) ?? undefined}
                />&nbsp;%
              </td>
              <td>
                <button className="btn btn-danger"
                  onClick={() => removeDebt(index)}
                ><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={6}>
              <button className="btn btn-info"
                onClick={() => addDebt()}
              ><i className="bi bi-plus-circle"></i></button>
            </th>
          </tr>
        </tfoot>
      </table>

      {/* <code>{JSON.stringify(debts)}</code> */}
    </>
  )
};
