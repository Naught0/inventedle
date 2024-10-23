import { expect, it } from "@jest/globals";
import { getRulesByYear as getRulesByYear } from "../logic";
import { Hotness } from "../enum";

const YEARS = [-5000, -500, 1, 1001, 1701, 1801, 1901, 2001, 2020];

it("should have 3 rules for each year", () => {
  YEARS.forEach((year) => {
    const rules = getRulesByYear(year);
    expect(rules.length).toBe(3);
  });
});

it("should match the earliest rule", () => {
  const rules = getRulesByYear(-5000);
  expect(rules.find((r) => r.hotness === Hotness.CORRECT)?.maxDistance).toBe(
    100,
  );
});
