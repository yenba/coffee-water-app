import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { RECIPES } from "../data/recipes";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";

export default function RecipeChart() {
  const { unit, setUnit } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(10.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const rows = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return RECIPES.map((recipe) => ({
      name: recipe.name,
      waterLabel: `${waterAmount} ${unit === "liters" ? "Liters" : "Gallons"}`,
      gh: recipe.gh,
      kh: recipe.kh,
      hardnessGrams: calcGrams(hardnessSalt.calcAmount, recipe.gh, waterLiters),
      bufferGrams: calcGrams(bufferSalt.calcAmount, recipe.kh, waterLiters),
    }));
  }, [unit, waterAmount, hardnessSalt, bufferSalt]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Easy Direct Dosing Recipe Chart</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Using dry ingredients put directly into water
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Unit: <strong className="capitalize text-sky-500 dark:text-sky-400">{unit}</strong>
          </span>
          <button
            type="button"
            onClick={() => setUnit(unit === "liters" ? "gallons" : "liters")}
            className="text-xs text-sky-500 hover:underline dark:text-sky-400 cursor-pointer"
          >
            Change
          </button>
        </div>

        <NumberInput
          label={`Water Amount in ${unit === "liters" ? "Liters" : "Gallons"}`}
          value={waterAmount}
          onChange={setWaterAmount}
          step={0.5}
        />

        <SolutionSelect
          label="Hardness Solution"
          salts={HARDNESS_SALTS}
          value={hardnessSaltId}
          onChange={setHardnessSaltId}
        />

        <SolutionSelect
          label="Buffer Solution"
          salts={BUFFER_SALTS}
          value={bufferSaltId}
          onChange={setBufferSaltId}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white dark:bg-slate-800">
              <th className="px-3 py-2 text-left font-semibold">Recipe</th>
              <th className="px-3 py-2 text-right font-semibold">Water</th>
              <th className="px-3 py-2 text-right font-semibold">GH</th>
              <th className="px-3 py-2 text-right font-semibold">KH</th>
              <th className="px-3 py-2 text-right font-semibold">
                {hardnessSalt.commonName} (g)
              </th>
              <th className="px-3 py-2 text-right font-semibold">
                {bufferSalt.commonName} (g)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.name}
                className={
                  i % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-gray-50 dark:bg-slate-900/50"
                }
              >
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2 text-right">{row.waterLabel}</td>
                <td className="px-3 py-2 text-right">{formatNumber(row.gh, 1)}</td>
                <td className="px-3 py-2 text-right">{formatNumber(row.kh, 1)}</td>
                <td className="px-3 py-2 text-right">
                  {formatNumber(row.hardnessGrams)}
                </td>
                <td className="px-3 py-2 text-right">
                  {formatNumber(row.bufferGrams)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
