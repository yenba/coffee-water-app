import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RecipePicker from "./pages/RecipePicker";
import CustomRecipe from "./pages/CustomRecipe";
import GHKHLookup from "./pages/GHKHLookup";
import About from "./pages/About";
import Preferences from "./pages/Preferences";

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-slate-50 md:flex-row dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl 2xl:max-w-7xl">
          <Routes>
            <Route path="/" element={<RecipePicker />} />
            <Route path="/custom" element={<CustomRecipe />} />
            <Route path="/lookup" element={<GHKHLookup />} />
            <Route path="/about" element={<About />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
