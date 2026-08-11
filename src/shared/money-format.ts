export function $money(amt: number): string {
  return `$${(amt ?? 0).toFixed(2)}`;
};
