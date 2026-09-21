import { energyFleet } from './energy-fleet';
import { humidityTemperature } from './humidity-temperature';
import type { SolutionOffering } from './types';

export type { SolutionOffering, SolutionInclude, SolutionFaq, SolutionStep } from './types';

/** Ordered public catalog. Add a new offering file and register it here. */
const ALL: SolutionOffering[] = [humidityTemperature, energyFleet];

export function listSolutions(): SolutionOffering[] {
  return [...ALL].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getSolutionBySlug(slug: string): SolutionOffering | undefined {
  const key = String(slug || '')
    .trim()
    .toLowerCase();
  if (!key) return undefined;
  return listSolutions().find((s) => s.slug === key);
}

export function listSolutionSlugs(): string[] {
  return listSolutions().map((s) => s.slug);
}
