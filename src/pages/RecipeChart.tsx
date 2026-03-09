import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { RECIPES } from "../data/recipes";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import NumberInput from "../components/NumberInput";

type SortField = "name" | "gh" | "kh" | "hardnessGrams" | "bufferGrams";

export default function RecipeChart() {
  const { unit, setUnit } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(10.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");
  const [sortField, setSortField] = useState<SortField>("gh");
  const [sortAsc, setSortAsc] = useState(true);

  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;

  const rows = useMemo(() => {
    const waterLiters = toliters(waterAmount, unit);
    const data = RECIPES.map((recipe) => ({
      name: recipe.name,
      waterLabel: `${waterAmount} ${unit === "liters" ? "Liters" : "Gallons"}`,
      gh: recipe.gh,
      kh: recipe.kh,
      hardnessGrams: calcGrams(hardnessSalt.calcAmount, recipe.gh, waterLiters),
      bufferGrams: calcGrams(bufferSalt.calcAmount, recipe.kh, waterLiters),
    }));

    data.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === "string" && typeof valB === "string") {
            return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (typeof valA === "number" && typeof valB === "number") {
            return sortAsc ? valA - valB : valB - valA;
        }
        return 0;
    });

    return data;
  }, [unit, waterAmount, hardnessSalt, bufferSalt, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
      if (sortField === field) {
          setSortAsc(!sortAsc);
      } else {
          setSortField(field);
          setSortAsc(true);
      }
  };

  const renderSortIcon = (field: SortField) => {
      if (sortField !== field) return <span className="text-gray-500 opacity-50 ml-1">↕</span>;
      return <span className="text-sky-400 ml-1">{sortAsc ? "↑" : "↓"}</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Easy Direct Dosing Recipe Chart</h1>
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
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white dark:bg-slate-800">
              <th className="px-3 py-2 text-left font-semibold cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => handleSort("name")}>
                Recipe {renderSortIcon("name")}
              </th>
              <th className="px-3 py-2 text-right font-semibold">Water</th>
              <th className="px-3 py-2 text-right font-semibold cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => handleSort("gh")}>
                GH {renderSortIcon("gh")}
              </th>
              <th className="px-3 py-2 text-right font-semibold cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => handleSort("kh")}>
                KH {renderSortIcon("kh")}
              </th>
              <th className="px-3 py-2 text-right font-semibold cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => handleSort("hardnessGrams")}>
                {hardnessSalt.commonName} (g) {renderSortIcon("hardnessGrams")}
              </th>
              <th className="px-3 py-2 text-right font-semibold cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => handleSort("bufferGrams")}>
                {bufferSalt.commonName} (g) {renderSortIcon("bufferGrams")}
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
