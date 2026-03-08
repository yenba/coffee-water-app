import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
    { to: "/", label: "Recipe Picker" },
    { to: "/chart", label: "Recipe Chart" },
    { to: "/custom", label: "Custom Recipe" },
    { to: "/lookup", label: "GH/KH Lookup" },
    { to: "/about", label: "About" },
];

function HamburgerIcon({ open }: { open: boolean }) {
    return (
        <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""
                    }`}
            />
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""
                    }`}
            />
            <span
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
            />
        </div>
    );
}

export default function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header (visible only on narrow screens) */}
            <div className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-900/90">
                <NavLink to="/" className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    coffee<span className="text-sky-500 dark:text-sky-400">water</span>
                </NavLink>
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon open={menuOpen} />
                </button>
            </div>

            {/* Backdrop for mobile drawer */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/20 md:hidden dark:bg-black/40"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <nav
                className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:static md:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="hidden h-16 shrink-0 items-center px-6 md:flex">
                    <NavLink to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        coffee<span className="text-sky-500 dark:text-sky-400">water</span>
                    </NavLink>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
