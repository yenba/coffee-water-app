import { Link } from "react-router-dom";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 pt-5 border-t border-gray-100 dark:border-slate-800">
      <h2 className="text-lg font-bold text-sky-400">{title}</h2>
      {children}
    </div>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-400 underline decoration-sky-400/30 underline-offset-2 hover:decoration-sky-400 transition-colors"
    >
      {children}
    </a>
  );
}

function PageLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="font-semibold text-gray-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function About() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">About</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          coffeewater — Direct Dosing Recipe Picker &amp; Calculator
        </p>
      </div>

      <div className="space-y-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-gray-700 dark:text-gray-300 pb-5">
          This tool helps you calculate how many minerals to add
          directly into water to achieve specific water hardness (GH) and
          alkalinity (KH) levels for brewing coffee. All calculations happen
          instantly in your browser — no data is sent anywhere.
        </p>

        <Section title="How to Use">
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="mb-1">
                <PageLink to="/">Recipe Picker</PageLink>
              </h3>
              <p>
                Browse all well-known water recipes at once in a dynamic card
                grid. Set your water amount and mineral choices at the top, then
                every recipe card instantly shows exactly how many grams to add.
                Sort and filter by GH/KH to find your perfect match.
              </p>
            </div>

            <div>
              <h3 className="mb-1">
                <PageLink to="/custom">Recipe Builder</PageLink>
              </h3>
              <p>
                Create your own recipe by entering your desired GH and KH values.
                Name it and save it — it will appear at the top of your Recipe
                Picker right alongside the built-in recipes.
              </p>
            </div>

            <div>
              <h3 className="mb-1">
                <PageLink to="/lookup">GH / KH Lookup</PageLink>
              </h3>
              <p>
                The reverse calculator — enter the grams you used and it tells
                you the resulting GH and KH of your water.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Links &amp; Resources">
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <ExtLink href="https://discord.gg/espresso">
                Espresso Aficionados Discord
              </ExtLink>
            </li>
            <li>
              <ExtLink href="https://coffeeadastra.com/2018/12/16/water-for-coffee-extraction/">
                Jonathan Gagné — Water for Coffee Extraction
              </ExtLink>
            </li>
            <li>
              <ExtLink href="https://espressoaf.com/guides/water.html">
                Espresso Aficionados — Water Guide
              </ExtLink>
            </li>
            <li>
              <ExtLink href="https://www.baristahustle.com/blog/diy-water-recipes-redux/">
                Barista Hustle — DIY Water Recipes Redux
              </ExtLink>
            </li>
          </ul>
        </Section>

        <Section title="Credits">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Made possible by the fantastic work of:
          </p>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">Sagebush</span> — Espresso
              Aficionados Discord
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">David Seng / The Espresso School</span>
            </li>
            <li>
              <ExtLink href="https://coffeeadastra.com/">
                Jonathan Gagné
              </ExtLink>
            </li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
            Huge thanks to y'all for doing the hard math and science!
          </p>
        </Section>
      </div>
    </div>
  );
}
