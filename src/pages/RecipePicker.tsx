import { useState, useMemo } from "react";
import { HARDNESS_SALTS, BUFFER_SALTS, getSaltById } from "../data/salts";
import { RECIPES } from "../data/recipes";
import { calcGrams, toliters, formatNumber } from "../utils/calculations";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../utils/PreferencesContext";
import SolutionSelect from "../components/SolutionSelect";
import WaterAmountInput from "../components/WaterAmountInput";
import CopyRecipeButton from "../components/CopyRecipeButton";
import ShareLinkButton from "../components/ShareLinkButton";

export default function RecipePicker() {
  const navigate = useNavigate();
  const { unit, setUnit, customRecipes, removeCustomRecipe } = usePreferences();
  const [waterAmount, setWaterAmount] = useState(1.0);
  const [hardnessSaltId, setHardnessSaltId] = useState("epsom-salt");
  const [bufferSaltId, setBufferSaltId] = useState("baking-soda");

  // Sorting and Filtering State
  const [sortBy, setSortBy] = useState<"name" | "gh-asc" | "gh-desc" | "kh-asc" | "kh-desc">("gh-asc");
  const [showCustomFirst, setShowCustomFirst] = useState(true);
  const [maxGH, setMaxGH] = useState<number>(300);
  const [maxKH, setMaxKH] = useState<number>(300);

  const allRecipes = useMemo(() => [...RECIPES, ...customRecipes], [customRecipes]);
  const hardnessSalt = getSaltById(hardnessSaltId)!;
  const bufferSalt = getSaltById(bufferSaltId)!;
  const waterLiters = toliters(waterAmount, unit);

  const displayRecipes = useMemo(() => {
    // 1. Filter
    const filtered = allRecipes.filter(r => r.gh <= maxGH && r.kh <= maxKH);

    // 2. Sort
    filtered.sort((a, b) => {
      if (showCustomFirst) {
        const aIsCustom = !RECIPES.some(r => r.name === a.name);
        const bIsCustom = !RECIPES.some(r => r.name === b.name);
        if (aIsCustom && !bIsCustom) return -1;
        if (!aIsCustom && bIsCustom) return 1;
      }

      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "gh-asc": return a.gh - b.gh;
        case "gh-desc": return b.gh - a.gh;
        case "kh-asc": return a.kh - b.kh;
        case "kh-desc": return b.kh - a.kh;
        default: return 0;
      }
    });

    return filtered;
  }, [allRecipes, maxGH, maxKH, sortBy, showCustomFirst]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Coffee Water Recipe Picker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <a
            href="https://espressoaf.com/guides/water.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 hover:underline transition-colors"
          >
            Take zero or low TDS water, add minerals, shake!
          </a>
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Volume Unit: <strong className="capitalize text-sky-500 dark:text-sky-400">{unit}</strong>
          </span>
          <button
            type="button"
            onClick={() => setUnit(unit === "liters" ? "gallons" : "liters")}
            className="text-xs font-medium text-sky-500 hover:underline dark:text-sky-400 cursor-pointer"
          >
            Switch to {unit === "liters" ? "Gallons" : "Liters"}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <WaterAmountInput
            label={`Water Amount`}
            value={waterAmount}
            onChange={setWaterAmount}
            unit={unit}
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
      </div>

      {/* Sorting & Filters Bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "gh-asc" | "gh-desc" | "kh-asc" | "kh-desc")}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 w-40"
          >
            <option value="name">Name (A-Z)</option>
            <option value="gh-asc">GH (Low to High)</option>
            <option value="gh-desc">GH (High to Low)</option>
            <option value="kh-asc">KH (Low to High)</option>
            <option value="kh-desc">KH (High to Low)</option>
          </select>
          {customRecipes.length > 0 && (
            <label className="flex items-center gap-2 ml-4 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showCustomFirst}
                onChange={(e) => setShowCustomFirst(e.target.checked)}
                className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />
              Custom First
            </label>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center shrink-0">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Max GH: <span className="font-bold text-sky-500 w-8 inline-block text-right">{maxGH >= 300 ? 'Any' : maxGH}</span>
            </label>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={maxGH}
              onChange={(e) => setMaxGH(parseInt(e.target.value))}
              className="h-2 w-24 md:w-32 appearance-none rounded-lg bg-gray-200 dark:bg-slate-700 accent-sky-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Max KH: <span className="font-bold text-sky-500 w-8 inline-block text-right">{maxKH >= 300 ? 'Any' : maxKH}</span>
            </label>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={maxKH}
              onChange={(e) => setMaxKH(parseInt(e.target.value))}
              className="h-2 w-24 md:w-32 appearance-none rounded-lg bg-gray-200 dark:bg-slate-700 accent-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayRecipes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            <p>No recipes match your current filters.</p>
            <button
              onClick={() => { setMaxGH(300); setMaxKH(300); }}
              className="mt-2 text-sky-500 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : displayRecipes.map((recipe) => {
          const hGrams = calcGrams(hardnessSalt.calcAmount, recipe.gh, waterLiters);
          const bGrams = calcGrams(bufferSalt.calcAmount, recipe.kh, waterLiters);
          const isCustom = !RECIPES.some(r => r.name === recipe.name);

          return (
            <div key={recipe.name} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-900 focus-within:ring-2 focus-within:ring-sky-500">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-50"></div>

              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 pr-2" title={recipe.name}>
                  {recipe.name}
                </h2>
                {isCustom && (
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const searchParams = new URLSearchParams();
                        searchParams.set("name", recipe.name);
                        searchParams.set("gh", recipe.gh.toString());
                        searchParams.set("kh", recipe.kh.toString());
                        navigate(`/custom?${searchParams.toString()}`);
                      }}
                      className="text-sky-400 hover:text-sky-600 dark:text-sky-500 dark:hover:text-sky-400 transition-colors p-1 rounded-md hover:bg-sky-50 dark:hover:bg-sky-900/30"
                      title="Edit Custom Recipe"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCustomRecipe(recipe.name)}
                      className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
                      title="Delete Custom Recipe"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <span className="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-600 ring-1 ring-inset ring-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20">
                  GH {formatNumber(recipe.gh, 1)}
                </span>
                <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600 ring-1 ring-inset ring-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/20">
                  KH {formatNumber(recipe.kh, 1)}
                </span>
              </div>

              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex gap-1.5">
                    <CopyRecipeButton
                        recipe={recipe}
                        waterAmount={waterAmount}
                        unit={unit}
                        hardnessSalt={hardnessSalt}
                        bufferSalt={bufferSalt}
                        hGrams={hGrams}
                        bGrams={bGrams}
                    />
                    <ShareLinkButton recipe={recipe} />
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatNumber(waterAmount, 1)} {unit === "liters" ? "L" : "gal"}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{hardnessSalt.commonName} <span className="text-[10px]">(hardness)</span></span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-sky-500 dark:text-sky-400">{formatNumber(hGrams)}</span>
                    <span className="text-xs text-gray-400 ml-1">g</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{bufferSalt.commonName} <span className="text-[10px]">(buffer)</span></span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-violet-500 dark:text-violet-400">{formatNumber(bGrams)}</span>
                    <span className="text-xs text-gray-400 ml-1">g</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
