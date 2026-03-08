export const GALLONS_TO_LITERS = 3.78541178;

export type Unit = "liters" | "gallons";

/** Convert water amount to liters based on selected unit */
export const toliters = (amount: number, unit: Unit): number =>
  unit === "gallons" ? amount * GALLONS_TO_LITERS : amount;

/** Forward calc: given target GH/KH, calculate grams of salt needed */
export const calcGrams = (
  calcAmount: number,
  targetValue: number,
  waterLiters: number,
): number => (calcAmount * targetValue * waterLiters) / 1000;

/** Reverse calc: given grams of salt, calculate resulting GH/KH */
export const calcGHKH = (
  grams: number,
  calcAmount: number,
  waterLiters: number,
): number => {
  if (waterLiters === 0 || calcAmount === 0) return 0;
  return (grams * 1000) / (calcAmount * waterLiters);
};

/** Format a number to N decimal places */
export const formatNumber = (value: number, decimals: number = 3): string =>
  value.toFixed(decimals);

/** Format water amount with unit label */
export const formatWaterLabel = (amount: number, unit: Unit): string =>
  `${amount} ${unit === "liters" ? "Liters" : "Gallons"}`;
