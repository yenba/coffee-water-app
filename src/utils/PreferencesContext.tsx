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
    customRecipes: Recipe[];
    addCustomRecipe: (recipe: Recipe) => void;
    removeCustomRecipe: (recipeName: string) => void;
    exportData: () => string;
    importData: (dataString: string) => boolean;
    resetToDefaults: () => void;
}

const DEFAULT_UNIT: Unit = "liters";
const DEFAULT_THEME: Theme = "dark";

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

    const [customRecipes, setCustomRecipesState] = useState<Recipe[]>(() => {
        const saved = localStorage.getItem("coffee_water_recipes");
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
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
            customRecipes,
        };
        return btoa(JSON.stringify(data));
    };

    const importData = (dataString: string) => {
        try {
            const data = JSON.parse(atob(dataString));
            if (data.unit) setUnit(data.unit);
            if (data.theme) setTheme(data.theme);
            if (data.customRecipes && Array.isArray(data.customRecipes)) {
                setCustomRecipesState(data.customRecipes);
                localStorage.setItem("coffee_water_recipes", JSON.stringify(data.customRecipes));
            }
            return true;
        } catch (e) {
            console.error("Failed to import data", e);
            return false;
        }
    };

    const resetToDefaults = () => {
        setUnit(DEFAULT_UNIT);
        setTheme(DEFAULT_THEME);
        setCustomRecipesState([]);
        localStorage.setItem("coffee_water_recipes", JSON.stringify([]));
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
            if (e.key === "coffee_water_recipes") {
                try {
                    setCustomRecipesState(e.newValue ? JSON.parse(e.newValue) : []);
                } catch (err) {
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
            customRecipes, addCustomRecipe, removeCustomRecipe,
            exportData, importData,
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
