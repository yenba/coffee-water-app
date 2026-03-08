import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";
import ResultCard from "../components/ResultCard";

export default function CustomRecipe() {
  const { unit, setUnit } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(1.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");
  const [desiredGH, setDesiredGH] = useState(30.0);
  const [desiredKH, setDesiredKH] = useState(70.0);

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const results = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return {
      hardnessGrams: calcGrams(hardnessSalt.calcAmount, desiredGH, waterLiters),
      bufferGrams: calcGrams(bufferSalt.calcAmount, desiredKH, waterLiters),
    };
  }, [unit, waterAmount, hardnessSalt, bufferSalt, desiredGH, desiredKH]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Custom Direct Dosing Recipe Creator</h1>
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

        <NumberInput
          label="Desired GH (General Hardness)"
          value={desiredGH}
          onChange={setDesiredGH}
          step={1}
        />

        <NumberInput
          label="Desired KH (Buffer)"
          value={desiredKH}
          onChange={setDesiredKH}
          step={1}
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
    </div>
  );
}
