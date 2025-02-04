import { GITHUB_TECH_COLORS } from "@/consts/githubTechColors";

export function matchMainTechnologyColor(mainTechnology: string): string {
  if (!mainTechnology) return GITHUB_TECH_COLORS.default;

  const normalizedTech = mainTechnology.trim().toLowerCase();
  return GITHUB_TECH_COLORS[normalizedTech] || GITHUB_TECH_COLORS.default;
}
