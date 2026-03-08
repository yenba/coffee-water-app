import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { calcGHKH, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";
import ResultCard from "../components/ResultCard";

export default function GHKHLookup() {
  const { unit, setUnit } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(10.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");
  const [hardnessGrams, setHardnessGrams] = useState(1.97);
  const [bufferGrams, setBufferGrams] = useState(0.671);

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const results = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    return {
      gh: calcGHKH(hardnessGrams, hardnessSalt.calcAmount, waterLiters),
      kh: calcGHKH(bufferGrams, bufferSalt.calcAmount, waterLiters),
    };
  }, [unit, waterAmount, hardnessSalt, bufferSalt, hardnessGrams, bufferGrams]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Custom Direct Dosing GH / KH Lookup</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Take Zero or Low TDS water, add minerals, shake!
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
          label={`${hardnessSalt.commonName} (g)`}
          value={hardnessGrams}
          onChange={setHardnessGrams}
          step={0.001}
        />

        <NumberInput
          label={`${bufferSalt.commonName} (g)`}
          value={bufferGrams}
          onChange={setBufferGrams}
          step={0.001}
        />
      </div>

      <ResultCard title="Water Stats">
        <div className="space-y-2 text-center text-lg">
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
