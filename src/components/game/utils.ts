export function formatYear(year: number, CE = false) {
  return Math.abs(year).toString() + (year < 0 ? " BCE" : CE ? " CE" : "");
}
