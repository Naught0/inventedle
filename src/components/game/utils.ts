export function formatYear(year: number) {
  return Math.abs(year).toString() + (year < 0 ? " BCE" : "");
}
