export type SaltPurpose = "hardness" | "buffer";

export interface Salt {
  id: string;
  scientificName: string;
  commonName: string;
  formula: string;
  purpose: SaltPurpose;
  targetType: "GH" | "KH";
  calcAmount: number; // mg per 1 unit of GH/KH per 1 liter
  easyPicker: boolean;
}

export const SALTS: Salt[] = [
  {
    id: "epsom-salt",
    scientificName: "Magnesium Sulfate Heptahydrate",
    commonName: "Epsom Salt",
    formula: "MgSO4·7H2O",
    purpose: "hardness",
    targetType: "GH",
    calcAmount: 2.4627,
    easyPicker: true,
  },
  {
    id: "calcium-chloride",
    scientificName: "Calcium Chloride",
    commonName: "Calcium Chloride",
    formula: "CaCl2",
    purpose: "hardness",
    targetType: "GH",
    calcAmount: 1.1088,
    easyPicker: false,
  },
  {
    id: "magnesium-chloride",
    scientificName: "Magnesium Chloride Hexahydrate",
    commonName: "Magnesium Chloride",
    formula: "MgCl2·6H2O",
    purpose: "hardness",
    targetType: "GH",
    calcAmount: 2.0312,
    easyPicker: false,
  },
  {
    id: "baking-soda",
    scientificName: "Sodium Bicarbonate",
    commonName: "Baking Soda",
    formula: "NaHCO3",
    purpose: "buffer",
    targetType: "KH",
    calcAmount: 1.6787,
    easyPicker: true,
  },
  {
    id: "potassium-bicarbonate",
    scientificName: "Potassium Bicarbonate",
    commonName: "Potassium Bicarbonate",
    formula: "KHCO3",
    purpose: "buffer",
    targetType: "KH",
    calcAmount: 2.0006,
    easyPicker: true,
  },
];

export const HARDNESS_SALTS = SALTS.filter((s) => s.purpose === "hardness");
export const BUFFER_SALTS = SALTS.filter((s) => s.purpose === "buffer");

export const EASY_HARDNESS_SALTS = HARDNESS_SALTS.filter((s) => s.easyPicker);
export const EASY_BUFFER_SALTS = BUFFER_SALTS.filter((s) => s.easyPicker);

export const getSaltById = (id: string): Salt =>
  SALTS.find((s) => s.id === id) ?? SALTS[0];
