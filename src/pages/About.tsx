import { Link } from "react-router-dom";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
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
      className="text-sky-400 underline decoration-sky-400/30 underline-offset-2 hover:decoration-sky-400"
    >
      {children}
    </a>
  );
}

export default function About() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">About</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Direct Dosing Recipe Picker & Calculator
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-gray-700 dark:text-gray-300">
          This tool helps you calculate how much dry mineral salt to add
          directly into water to achieve specific water hardness (GH) and
          alkalinity (KH) levels for brewing coffee. All calculations happen
          instantly in your browser — no data is sent anywhere.
        </p>

        <Section title="How to Use">
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                <Link to="/" className="hover:text-sky-400">
                  Recipe Picker
                </Link>
              </h3>
              <p>
                Pick a well-known water recipe from the dropdown and choose your
                desired water amount. The calculator tells you exactly how many
                grams of each salt to add.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                <Link to="/chart" className="hover:text-sky-400">
                  Recipe Chart
                </Link>
              </h3>
              <p>
                View all recipes at once in a table, showing the grams needed
                for your selected water volume and salt choices. Great for
                comparing recipes side by side.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                <Link to="/custom" className="hover:text-sky-400">
                  Custom Recipe Creator
                </Link>
              </h3>
              <p>
                Create your own recipe by entering your desired GH and KH
                values. The calculator figures out how much of each salt you
                need.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                <Link to="/lookup" className="hover:text-sky-400">
                  GH/KH Lookup
                </Link>
              </h3>
              <p>
                The reverse calculator — enter the grams of salt you used and
                it tells you the resulting GH and KH of your water.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Links & Resources">
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
                Espresso Aficionados — Water
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
              <span className="text-gray-900 dark:text-white">Sagebush</span> — Espresso
              Aficionados Discord
            </li>
            <li>
              <span className="text-gray-900 dark:text-white">David Seng / The Espresso School</span>
            </li>
            <li>
              <ExtLink href="https://coffeeadastra.com/">
                Jonathan Gagné
              </ExtLink>
            </li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Huge thanks to y'all for doing the hard math and science!
          </p>
        </Section>
      </div>
    </div>
  );
}
