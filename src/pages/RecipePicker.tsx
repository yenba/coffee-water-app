import { useState, useMemo } from "react";
import { EASY_HARDNESS_SALTS, EASY_BUFFER_SALTS, getSaltById } from "../data/salts";
import { RECIPES } from "../data/recipes";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";
import ResultCard from "../components/ResultCard";

export default function RecipePicker() {
  const { unit, setUnit } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(1.0);
  const [recipeIndex, setRecipeIndex] = useState(2); // Fams 20/80
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");

  const recipe = RECIPES[recipeIndex];
  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const results = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return {
      hardnessGrams: calcGrams(hardnessSalt.calcAmount, recipe.gh, waterLiters),
      bufferGrams: calcGrams(bufferSalt.calcAmount, recipe.kh, waterLiters),
      gh: recipe.gh,
      kh: recipe.kh,
    };
  }, [unit, waterAmount, recipe, hardnessSalt, bufferSalt]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Easy Direct Dosing Recipe Picker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Take 0 or Low TDS water, add minerals, shake!
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

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Select a Recipe
          </label>
          <select
            value={recipeIndex}
            onChange={(e) => setRecipeIndex(parseInt(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            {RECIPES.map((r, i) => (
              <option key={r.name} value={i}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <SolutionSelect
          label="Hardness Solution"
          salts={EASY_HARDNESS_SALTS}
          value={hardnessSaltId}
          onChange={setHardnessSaltId}
        />

        <SolutionSelect
          label="Buffer Solution"
          salts={EASY_BUFFER_SALTS}
          value={bufferSaltId}
          onChange={setBufferSaltId}
        />
      </div>

      <ResultCard title="Hardness">
        <p className="text-center text-lg">
          Add{" "}
          <span className="font-bold text-sky-500 dark:text-sky-400">
            {formatNumber(results.hardnessGrams)}
          </span>{" "}
          grams of{" "}
          <span className="font-semibold text-sky-500 dark:text-sky-400">
            {hardnessSalt.commonName}
          </span>
        </p>
      </ResultCard>

      <ResultCard title="Buffer">
        <p className="text-center text-lg">
          Add{" "}
          <span className="font-bold text-sky-500 dark:text-sky-400">
            {formatNumber(results.bufferGrams)}
          </span>{" "}
          grams of{" "}
          <span className="font-semibold text-sky-500 dark:text-sky-400">
            {bufferSalt.commonName}
          </span>
        </p>
      </ResultCard>

      <ResultCard title="Water Stats">
        <div className="space-y-1 text-center">
          <p>
            This water has a GH of{" "}
            <span className="font-bold text-sky-500 dark:text-sky-400">
              {formatNumber(results.gh, 1)}
            </span>
          </p>
          <p>
            This water has a KH of{" "}
            <span className="font-bold text-sky-500 dark:text-sky-400">
              {formatNumber(results.kh, 1)}
            </span>
          </p>
        </div>
      </ResultCard>
    </div>
  );
}
