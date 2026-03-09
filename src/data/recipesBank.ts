/**
 * Recipe bank sourced from:
 * https://docs.google.com/spreadsheets/d/14tPm_1ndQl90GxdWJw_u7-7_Lzg0tPiVDaMzWC3u6bQ
 *
 * Conversion verified against known recipes:
 *   Barista Hustle: spreadsheet TH=79.9/TA=40.1 → app gh:80.0/kh:40.0 ✓
 *   TWW Espresso:   spreadsheet TH=160.4/TA=67.5 → app gh:160.0/kh:67.5 ✓
 *   Hendon:         spreadsheet TH=98.8/TA=30.8  → app gh:98.7/kh:31.0  ✓
 *
 * Mapping: Total Hardness (ppm CaCO3) = gh, Total Alkalinity (ppm CaCO3) = kh
 *
 * This file is NOT imported anywhere yet — it's a staging area to pull from
 * as we add recipes to recipes.ts one by one.
 *
 * Already in recipes.ts are marked with ← IN APP
 */

import type { Recipe } from "./recipes";

// ---------------------------------------------------------------------------
// Base recipes (rows 5–18 of the spreadsheet)
// ---------------------------------------------------------------------------

export const BANK_BASE: Recipe[] = [
  // ← IN APP (as "TWW Espresso Inspired" gh:160.0/kh:67.5)
  { name: "Third Wave Espresso", gh: 160.4, kh: 67.5 },

  // ← IN APP
  { name: "Third Wave Classic", gh: 165.7, kh: 47.7 },

  // ← IN APP
  { name: "Rao/Perger", gh: 87.5, kh: 40.5 },

  { name: "Rao 2013", gh: 93.9, kh: 40.0 },

  { name: "Perger", gh: 81.2, kh: 41.0 },

  { name: "Dan Eils", gh: 117.3, kh: 50.0 },

  // NOTE: this spreadsheet has Melbourne at gh:23.5/kh:11.5
  // but the app currently has gh:49.5/kh:20.3 from a different source.
  // Leaving both noted here for reference.
  { name: "Melbourne (spreadsheet)", gh: 23.5, kh: 11.5 },

  // ← IN APP
  { name: "WOC Budapest", gh: 50.6, kh: 40.1 },

  // ← IN APP
  { name: "SCA Optimal", gh: 67.9, kh: 40.1 },

  // ← IN APP (as "Barista Hustle Water #4" gh:80.0/kh:40.0)
  { name: "Barista Hustle", gh: 79.9, kh: 40.1 },

  { name: "Rao 2008 by BH", gh: 39.4, kh: 50.1 },

  // ← IN APP (as "Hendon Water 2" gh:98.7/kh:31.0)
  { name: "Hendon", gh: 98.8, kh: 30.8 },

  { name: "BH Hard", gh: 124.8, kh: 35.1 },

  { name: "BH Hard AF", gh: 175.0, kh: 45.2 },
];

// ---------------------------------------------------------------------------
// Mason jar versions (rows 19–30)
// These are the same target recipes reformulated for a 200mL mason jar
// concentrate. Most are close to their base counterparts but some differ
// slightly due to different mineral choices.
// ---------------------------------------------------------------------------

export const BANK_MASON: Recipe[] = [
  // Notably different alkalinity from the base Rao/Perger (kh:40.5 → 20.0)
  { name: "Rao/Perger mason", gh: 87.5, kh: 20.0 },

  { name: "Rao 2013 mason", gh: 93.9, kh: 40.0 },
  { name: "Perger mason", gh: 81.2, kh: 40.5 },
  { name: "Dan Eils mason", gh: 117.3, kh: 50.0 },
  { name: "Melbourne mason", gh: 23.6, kh: 11.9 },
  { name: "WOC Budapest mason", gh: 50.6, kh: 40.5 },
  { name: "SCA Optimal mason", gh: 67.9, kh: 40.5 },
  { name: "Barista Hustle mason", gh: 79.9, kh: 40.5 },
  { name: "Rao 2008 by BH mason", gh: 74.9, kh: 50.1 },
  { name: "Hendon mason", gh: 98.8, kh: 30.8 },
  { name: "BH Hard mason", gh: 124.8, kh: 35.1 },
  { name: "BH Hard AF mason", gh: 175.0, kh: 45.2 },
];

// ---------------------------------------------------------------------------
// Variants and modified recipes (rows 31–50)
// ---------------------------------------------------------------------------

export const BANK_VARIANTS: Recipe[] = [
  // Rao/Perger in a 600mL bottle, slightly rounded values
  { name: "Rao/Perger Large mason", gh: 87.5, kh: 40.2 },

  // Simpler mineral combo, nearly identical to Rao/Perger
  { name: "Easier Rao/Perger mason", gh: 87.3, kh: 40.5 },

  // Lower hardness variant of Rao/Perger
  { name: "Rao/Perger softer", gh: 70.0, kh: 40.2 },

  // Espresso-focused, higher GH with lower alkalinity
  { name: "Bahrain Espresso", gh: 117.7, kh: 30.7 },

  // Squirt-bottle format, essentially same as Rao/Perger
  { name: "Rao/Perger squirt bottle", gh: 87.5, kh: 40.2 },

  // Gesha/Pacamara variant — slightly softer and less alkaline
  { name: "Rao/Perger Gesha Pacamara", gh: 83.5, kh: 37.5 },

  // Third Wave Classic with small modification
  { name: "Third Wave Classic Modded", gh: 165.8, kh: 47.6 },

  // Single-dose sachet version of Rao/Perger target
  { name: "Single dose (Rao/Perger target)", gh: 87.5, kh: 40.8 },

  // SRPHB recipes (Scott Rao / Paul Bassett inspired)
  { name: "SRPHB", gh: 87.6, kh: 20.3 },
  { name: "SRPHBMG", gh: 120.1, kh: 20.3 },
  { name: "SRPHB2", gh: 87.6, kh: 40.5 },

  // Rao/Perger simplified for espresso
  { name: "Rao/Perger Simple for Espresso", gh: 79.8, kh: 33.4 },

  // San Diego tap water profile
  { name: "San Diego", gh: 230.0, kh: 121.0 },
  { name: "San Diego Filler", gh: 142.6, kh: 80.0 },

  // Montreal tap water profile
  { name: "Mtl Tap", gh: 111.7, kh: 92.9 },
];
