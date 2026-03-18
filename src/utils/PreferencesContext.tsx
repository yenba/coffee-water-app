/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../data/recipes";

export type Unit = "liters" | "gallons";
export type Theme = "system" | "light" | "dark";

interface PreferencesContextType {
    unit: Unit;
    setUnit: (unit: Unit) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    waterAmount: number;
    setWaterAmount: (amount: number) => void;
    hardnessSaltId: string;
    setHardnessSaltId: (id: string) => void;
    bufferSaltId: string;
    setBufferSaltId: (id: string) => void;
    customRecipes: Recipe[];
    addCustomRecipe: (recipe: Recipe) => void;
    removeCustomRecipe: (recipeName: string) => void;
    exportData: () => string;
    exportJSON: () => string;
    importData: (dataString: string) => boolean;
    importJSON: (dataString: string) => boolean;
    resetToDefaults: () => void;
}

const DEFAULT_UNIT: Unit = "liters";
const DEFAULT_THEME: Theme = "dark";
const DEFAULT_WATER_AMOUNT = 1.0;
const DEFAULT_HARDNESS_SALT_ID = "epsom-salt";
const DEFAULT_BUFFER_SALT_ID = "baking-soda";

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
    const [unit, setUnitState] = useState<Unit>(() => {
        const saved = localStorage.getItem("coffee_water_unit");
        return (saved as Unit) || DEFAULT_UNIT;
    });

    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem("coffee_water_theme");
        return (saved as Theme) || DEFAULT_THEME;
    });

    const [waterAmount, setWaterAmountState] = useState<number>(() => {
        const saved = localStorage.getItem("coffee_water_water_amount");
        if (saved !== null) {
            const parsed = parseFloat(saved);
            return isNaN(parsed) ? DEFAULT_WATER_AMOUNT : parsed;
        }
        return DEFAULT_WATER_AMOUNT;
    });

    const [hardnessSaltId, setHardnessSaltIdState] = useState<string>(() => {
        return localStorage.getItem("coffee_water_hardness_salt") || DEFAULT_HARDNESS_SALT_ID;
    });

    const [bufferSaltId, setBufferSaltIdState] = useState<string>(() => {
        return localStorage.getItem("coffee_water_buffer_salt") || DEFAULT_BUFFER_SALT_ID;
    });

    const [customRecipes, setCustomRecipesState] = useState<Recipe[]>(() => {
        const saved = localStorage.getItem("coffee_water_recipes");
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const setUnit = (newUnit: Unit) => {
        setUnitState(newUnit);
        localStorage.setItem("coffee_water_unit", newUnit);
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("coffee_water_theme", newTheme);
    };

    const setWaterAmount = (amount: number) => {
        const clamped = isNaN(amount) || amount < 0 ? DEFAULT_WATER_AMOUNT : amount;
        setWaterAmountState(clamped);
        localStorage.setItem("coffee_water_water_amount", String(clamped));
    };

    const setHardnessSaltId = (id: string) => {
        setHardnessSaltIdState(id);
        localStorage.setItem("coffee_water_hardness_salt", id);
    };

    const setBufferSaltId = (id: string) => {
        setBufferSaltIdState(id);
        localStorage.setItem("coffee_water_buffer_salt", id);
    };

    const addCustomRecipe = (recipe: Recipe) => {
        const newRecipes = [...customRecipes.filter((r) => r.name !== recipe.name), recipe];
        setCustomRecipesState(newRecipes);
        localStorage.setItem("coffee_water_recipes", JSON.stringify(newRecipes));
    };

    const removeCustomRecipe = (recipeName: string) => {
        const newRecipes = customRecipes.filter((r) => r.name !== recipeName);
        setCustomRecipesState(newRecipes);
        localStorage.setItem("coffee_water_recipes", JSON.stringify(newRecipes));
    };

    const exportData = () => {
        const data = {
            unit,
            theme,
            waterAmount,
            hardnessSaltId,
            bufferSaltId,
            customRecipes,
        };
        return btoa(JSON.stringify(data));
    };

    const exportJSON = () => {
        const data = {
            unit,
            theme,
            waterAmount,
            hardnessSaltId,
            bufferSaltId,
            customRecipes,
        };
        return JSON.stringify(data, null, 2);
    };

    const isValidUnit = (v: unknown): v is Unit =>
        v === "liters" || v === "gallons";

    const isValidTheme = (v: unknown): v is Theme =>
        v === "system" || v === "light" || v === "dark";

    const isValidRecipe = (v: unknown): v is Recipe =>
        typeof v === "object" && v !== null &&
        typeof (v as Record<string, unknown>).name === "string" &&
        typeof (v as Record<string, unknown>).gh === "number" &&
        typeof (v as Record<string, unknown>).kh === "number";

    const importSharedFields = (data: Record<string, unknown>) => {
        if (isValidUnit(data.unit)) setUnit(data.unit);
        if (isValidTheme(data.theme)) setTheme(data.theme);
        if (typeof data.waterAmount === "number" && !isNaN(data.waterAmount) && data.waterAmount > 0) {
            setWaterAmount(data.waterAmount);
        }
        if (typeof data.hardnessSaltId === "string" && data.hardnessSaltId) {
            setHardnessSaltId(data.hardnessSaltId);
        }
        if (typeof data.bufferSaltId === "string" && data.bufferSaltId) {
            setBufferSaltId(data.bufferSaltId);
        }
        if (Array.isArray(data.customRecipes) && data.customRecipes.every(isValidRecipe)) {
            setCustomRecipesState(data.customRecipes);
            localStorage.setItem("coffee_water_recipes", JSON.stringify(data.customRecipes));
        }
    };

    const importData = (dataString: string) => {
        try {
            const data = JSON.parse(atob(dataString));
            importSharedFields(data);
            return true;
        } catch (e) {
            console.error("Failed to import data", e);
            return false;
        }
    };

    const importJSON = (dataString: string) => {
        try {
            const data = JSON.parse(dataString);
            importSharedFields(data);
            return true;
        } catch (e) {
            console.error("Failed to import JSON data", e);
            return false;
        }
    };

    const resetToDefaults = () => {
        setUnit(DEFAULT_UNIT);
        setTheme(DEFAULT_THEME);
        setWaterAmount(DEFAULT_WATER_AMOUNT);
        setHardnessSaltId(DEFAULT_HARDNESS_SALT_ID);
        setBufferSaltId(DEFAULT_BUFFER_SALT_ID);
        setCustomRecipesState([]);
        localStorage.setItem("coffee_water_recipes", JSON.stringify([]));
        // Clear page-specific persisted settings
        localStorage.removeItem("coffee_water_picker_sort");
        localStorage.removeItem("coffee_water_picker_custom_first");
        localStorage.removeItem("coffee_water_picker_max_gh");
        localStorage.removeItem("coffee_water_picker_max_kh");
        localStorage.removeItem("coffee_water_custom_gh");
        localStorage.removeItem("coffee_water_custom_kh");
        localStorage.removeItem("coffee_water_lookup_hardness_grams");
        localStorage.removeItem("coffee_water_lookup_buffer_grams");
    };

    // Handle Theme application
    useEffect(() => {
        const root = document.documentElement;
        // Clear previous theme classes
        root.classList.remove("dark");

        let effectiveTheme = theme;

        // Resolve system theme
        if (theme === "system") {
            effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        // Apply specific theme classes
        if (effectiveTheme === "dark") {
            root.classList.add("dark");
        }
    }, [theme]);

    // Listen for system theme changes if set to system
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const root = document.documentElement;
            root.classList.remove("dark");
            if (mediaQuery.matches) {
                root.classList.add("dark");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    // Handle cross-tab sync
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "coffee_water_unit") setUnitState((e.newValue as Unit) || DEFAULT_UNIT);
            if (e.key === "coffee_water_theme") setThemeState((e.newValue as Theme) || DEFAULT_THEME);
            if (e.key === "coffee_water_water_amount") {
                const parsed = parseFloat(e.newValue || "");
                setWaterAmountState(isNaN(parsed) || parsed < 0 ? DEFAULT_WATER_AMOUNT : parsed);
            }
            if (e.key === "coffee_water_hardness_salt") setHardnessSaltIdState(e.newValue || DEFAULT_HARDNESS_SALT_ID);
            if (e.key === "coffee_water_buffer_salt") setBufferSaltIdState(e.newValue || DEFAULT_BUFFER_SALT_ID);
            if (e.key === "coffee_water_recipes") {
                try {
                    setCustomRecipesState(e.newValue ? JSON.parse(e.newValue) : []);
                } catch {
                    setCustomRecipesState([]);
                }
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <PreferencesContext.Provider value={{
            unit, setUnit,
            theme, setTheme,
            waterAmount, setWaterAmount,
            hardnessSaltId, setHardnessSaltId,
            bufferSaltId, setBufferSaltId,
            customRecipes, addCustomRecipe, removeCustomRecipe,
            exportData, exportJSON, importData, importJSON,
            resetToDefaults
        }}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (context === undefined) {
        throw new Error("usePreferences must be used within a PreferencesProvider");
    }
    return context;
}
