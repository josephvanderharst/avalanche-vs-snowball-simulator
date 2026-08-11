import { useState } from "react";
import DebtList from "../components/DebtList";
import type { Debt } from "../types/debt";

export default function Simulator() {
  const [debts, setDebts] = useState<Debt[]>([]);

  return (
    <>
      <div className="d-flex flex-column g-2">
        <DebtList debts={debts} setDebts={setDebts} />

        {/* <code>{JSON.stringify(debts)}</code> */}
      </div>
    </>
  );
};
