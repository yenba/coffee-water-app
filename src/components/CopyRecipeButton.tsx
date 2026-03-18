import { useState } from "react";
import type { Recipe } from "../data/recipes";
import type { Salt } from "../data/salts";
import type { Unit } from "../utils/PreferencesContext";
import { formatNumber } from "../utils/calculations";

interface CopyRecipeButtonProps {
    recipe: Recipe;
    waterAmount: number;
    unit: Unit;
    hardnessSalt: Salt;
    bufferSalt: Salt;
    hGrams: number;
    bGrams: number;
}

export default function CopyRecipeButton({
    recipe,
    waterAmount,
    unit,
    hardnessSalt,
    bufferSalt,
    hGrams,
    bGrams,
}: CopyRecipeButtonProps) {
    const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

    const handleCopy = async () => {
        const text = `💧 ${recipe.name}
GH: ${formatNumber(recipe.gh, 1)} | KH: ${formatNumber(recipe.kh, 1)}

To ${waterAmount} ${unit === "liters" ? "L" : "gal"} of distilled/RO water, add:
• ${formatNumber(hGrams)}g ${hardnessSalt.commonName}
• ${formatNumber(bGrams)}g ${bufferSalt.commonName}`;

        try {
            await navigator.clipboard.writeText(text);
            setStatus("copied");
        } catch {
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${status === "copied"
                    ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : status === "error"
                    ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
                }`}
            title="Copy Recipe"
        >
            {status === "copied" ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Copied!</span>
                </>
            ) : status === "error" ? (
                <span>Failed</span>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy</span>
                </>
            )}
        </button>
    );
}
