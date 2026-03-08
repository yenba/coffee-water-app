import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RecipePicker from "./pages/RecipePicker";
import RecipeChart from "./pages/RecipeChart";
import CustomRecipe from "./pages/CustomRecipe";
import GHKHLookup from "./pages/GHKHLookup";
import About from "./pages/About";

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-slate-50 md:flex-row dark:bg-[#0B1120]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full px-4 py-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <Routes>
            <Route path="/" element={<RecipePicker />} />
            <Route path="/chart" element={<RecipeChart />} />
            <Route path="/custom" element={<CustomRecipe />} />
            <Route path="/lookup" element={<GHKHLookup />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
