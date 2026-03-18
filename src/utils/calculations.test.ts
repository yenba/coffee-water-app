import { describe, it, expect } from "vitest";
import {
  GALLONS_TO_LITERS,
  toliters,
  calcGrams,
  calcGHKH,
  formatNumber,
  formatWaterLabel,
} from "./calculations";

describe("toliters", () => {
  it("returns liters unchanged when unit is liters", () => {
    expect(toliters(1, "liters")).toBe(1);
    expect(toliters(2.5, "liters")).toBe(2.5);
  });

  it("converts gallons to liters", () => {
    expect(toliters(1, "gallons")).toBeCloseTo(GALLONS_TO_LITERS);
    expect(toliters(2, "gallons")).toBeCloseTo(2 * GALLONS_TO_LITERS);
  });

  it("handles zero", () => {
    expect(toliters(0, "liters")).toBe(0);
    expect(toliters(0, "gallons")).toBe(0);
  });
});

describe("calcGrams", () => {
  it("calculates grams for a known recipe", () => {
    // Epsom Salt (calcAmount: 2.4627), GH 80, 1 liter
    const grams = calcGrams(2.4627, 80, 1);
    expect(grams).toBeCloseTo(0.197, 3);
  });

  it("scales linearly with water volume", () => {
    const grams1L = calcGrams(2.4627, 80, 1);
    const grams2L = calcGrams(2.4627, 80, 2);
    expect(grams2L).toBeCloseTo(grams1L * 2);
  });

  it("returns zero when target is zero", () => {
    expect(calcGrams(2.4627, 0, 1)).toBe(0);
  });

  it("returns zero when water volume is zero", () => {
    expect(calcGrams(2.4627, 80, 0)).toBe(0);
  });
});

describe("calcGHKH", () => {
  it("is the inverse of calcGrams", () => {
    const calcAmount = 2.4627;
    const targetGH = 80;
    const waterLiters = 1;
    const grams = calcGrams(calcAmount, targetGH, waterLiters);
    const result = calcGHKH(grams, calcAmount, waterLiters);
    expect(result).toBeCloseTo(targetGH, 5);
  });

  it("returns zero when water volume is zero", () => {
    expect(calcGHKH(1, 2.4627, 0)).toBe(0);
  });

  it("returns zero when calcAmount is zero", () => {
    expect(calcGHKH(1, 0, 1)).toBe(0);
  });

  it("scales inversely with water volume", () => {
    const gh1L = calcGHKH(0.197, 2.4627, 1);
    const gh2L = calcGHKH(0.197, 2.4627, 2);
    expect(gh2L).toBeCloseTo(gh1L / 2);
  });
});

describe("formatNumber", () => {
  it("formats to 3 decimal places by default", () => {
    expect(formatNumber(1.23456)).toBe("1.235");
  });

  it("formats to specified decimal places", () => {
    expect(formatNumber(1.23456, 1)).toBe("1.2");
    expect(formatNumber(1.23456, 0)).toBe("1");
  });

  it("pads with zeros", () => {
    expect(formatNumber(1, 3)).toBe("1.000");
  });
});

describe("formatWaterLabel", () => {
  it("formats singular liters", () => {
    expect(formatWaterLabel(1, "liters")).toBe("1 Liter");
  });

  it("formats plural liters", () => {
    expect(formatWaterLabel(2.5, "liters")).toBe("2.5 Liters");
  });

  it("formats singular gallons", () => {
    expect(formatWaterLabel(1, "gallons")).toBe("1 Gallon");
  });

  it("formats plural gallons", () => {
    expect(formatWaterLabel(2, "gallons")).toBe("2 Gallons");
  });
});
