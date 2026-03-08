/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Unit = "liters" | "gallons";
export type Theme = "system" | "light" | "dark";

interface PreferencesContextType {
    unit: Unit;
    setUnit: (unit: Unit) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resetToDefaults: () => void;
}

const DEFAULT_UNIT: Unit = "liters";
const DEFAULT_THEME: Theme = "system";

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

    const setUnit = (newUnit: Unit) => {
        setUnitState(newUnit);
        localStorage.setItem("coffee_water_unit", newUnit);
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("coffee_water_theme", newTheme);
    };

    const resetToDefaults = () => {
        setUnit(DEFAULT_UNIT);
        setTheme(DEFAULT_THEME);
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
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <PreferencesContext.Provider value={{ unit, setUnit, theme, setTheme, resetToDefaults }}>
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
