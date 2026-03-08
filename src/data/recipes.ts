export interface Recipe {
  name: string;
  gh: number;
  kh: number;
}

export const RECIPES: Recipe[] = [
  { name: "Barista Hustle Water #4", gh: 80.0, kh: 40.0 },
  { name: "Dr. Pavlis", gh: 0.0, kh: 50.0 },
  { name: "Fams 20/80", gh: 20.0, kh: 80.0 },
  { name: "Fams 20/90", gh: 20.0, kh: 90.0 },
  { name: "Fams 60/90", gh: 60.0, kh: 90.0 },
  { name: "Hendon Water 1", gh: 98.7, kh: 20.3 },
  { name: "Hendon Water 2", gh: 98.7, kh: 31.0 },
  { name: "Holy Water", gh: 61.7, kh: 23.0 },
  { name: "Melbourne", gh: 49.5, kh: 20.3 },
  { name: "Sey Water", gh: 36.0, kh: 15.0 },
  { name: "TWW Espresso Inspired", gh: 160.0, kh: 67.5 },
];
