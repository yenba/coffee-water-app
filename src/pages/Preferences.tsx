import { useState } from "react";
import { usePreferences, type Theme } from "../utils/PreferencesContext";

export default function Preferences() {
    const { unit, setUnit, theme, setTheme, resetToDefaults, exportData, importData } = usePreferences();
    const [importText, setImportText] = useState("");
    const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);

    const handleCopyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportData());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const handleImport = () => {
        if (!importText.trim()) return;
        const success = importData(importText.trim());
        if (success) {
            setImportStatus("success");
            setImportText("");
            setTimeout(() => setImportStatus("idle"), 3000);
        } else {
            setImportStatus("error");
            setTimeout(() => setImportStatus("idle"), 3000);
        }
    };

    const THEMES: { id: Theme; label: string; icon: string }[] = [
        { id: "system", label: "System", icon: "💻" },
        { id: "light", label: "Light", icon: "☀️" },
        { id: "dark", label: "Dark", icon: "🌙" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold">Preferences</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Global application settings
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-0">

                {/* Units */}
                <div className="space-y-3 pb-5">
                    <div>
                        <h2 className="text-lg font-bold text-sky-400">Units</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Default volume unit for all calculations.</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        {(["liters", "gallons"] as const).map((u) => (
                            <button
                                key={u}
                                type="button"
                                onClick={() => setUnit(u)}
                                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all active:scale-95 ${unit === u
                                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm ring-2 ring-sky-500 ring-offset-1 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-offset-slate-900"
                                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                    }`}
                            >
                                {u === "liters" ? "Liters (L)" : "Gallons (gal)"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme */}
                <div className="space-y-3 py-5 border-t border-gray-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-bold text-sky-400">Theme</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Controls the app's color scheme.</p>
                    </div>
                    <div className="grid gap-2 grid-cols-3">
                        {THEMES.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTheme(t.id)}
                                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-all active:scale-95 ${theme === t.id
                                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm ring-2 ring-sky-500 ring-offset-1 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-offset-slate-900"
                                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                    }`}
                            >
                                <span>{t.icon}</span>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data & Backup */}
                <div className="space-y-4 py-5 border-t border-gray-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-bold text-sky-400">Data &amp; Backup</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Export or import your preferences and custom recipes.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleCopyExport}
                            className="self-start rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 transition-all active:scale-95"
                        >
                            {copied ? "✓ Copied to Clipboard!" : "Copy Export Data"}
                        </button>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Import Data
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={importText}
                                    onChange={(e) => setImportText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleImport()}
                                    placeholder="Paste exported data string here..."
                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:border-slate-700 dark:bg-slate-800"
                                />
                                <button
                                    type="button"
                                    onClick={handleImport}
                                    disabled={!importText.trim()}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-all active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                                >
                                    Import
                                </button>
                            </div>
                            {importStatus === "success" && (
                                <p className="text-xs font-medium text-green-600 dark:text-green-400">✓ Data imported successfully!</p>
                            )}
                            {importStatus === "error" && (
                                <p className="text-xs font-medium text-red-600 dark:text-red-400">✗ Invalid data format. Please check and try again.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-5 border-t border-gray-100 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-red-500 dark:text-red-400 mb-2">Danger Zone</h2>
                    <button
                        type="button"
                        onClick={resetToDefaults}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-900/20 transition-all active:scale-95"
                    >
                        Reset to defaults
                    </button>
                    <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">This will clear all custom recipes and preferences.</p>
                </div>

            </div>
        </div>
    );
}
