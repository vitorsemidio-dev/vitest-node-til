import { expect, test } from "vitest";
import { getPastDate } from "./get-past-date";

test("descrease date with one year", () => {
  const currentYear = new Date().getFullYear();
  expect(getPastDate(`${currentYear}-08-10`).getFullYear()).toEqual(
    currentYear - 1,
  );
});
