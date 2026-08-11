import { useState } from "react";
import { type Debt } from "../types/debt.d";

type DebtListProps = {
  debts: Debt[];
  setDebts: (d: Debt[]) => void;
};

export default function DebtList({ debts, setDebts }: DebtListProps) {
  // const [debts, setDebts] = useState(initDebts ?? []);

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
                <input type="text" value={d.name} onChange={e => updateDebt(index, { name: e.target.value })} />
              </td>
              <td>
                $&nbsp;<input type="number"
                  value={d.amount}
                  onChange={e => updateDebt(index, { amount: e.target.value === '' ? null! : Number(e.target.value) })}
                />
              </td>
              <td>
                $&nbsp;<input type="number"
                  value={d.minPayment}
                  onChange={e => updateDebt(index, { minPayment: e.target.value === '' ? null! : Number(e.target.value) })}
                  placeholder={d.amount && d.interestRate ? (d.amount * d.interestRate / 100 / 12).toFixed(2) : undefined}
                />
              </td>
              <td>/</td>
              <td>
                <input type="number"
                  value={d.interestRate}
                  onChange={e => updateDebt(index, { interestRate: e.target.value === '' ? null! : Number(e.target.value) })}
                  placeholder={d.amount && d.minPayment ? (d.minPayment / d.amount * 1200).toFixed(2) : undefined}
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
