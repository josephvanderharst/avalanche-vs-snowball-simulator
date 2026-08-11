export function extractInputNumber(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): number | null {
  const value = e.target.value;

  if (value === '' || value == null) return null;
  else return Number(value);
}
