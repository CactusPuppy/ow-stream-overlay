export const OverwatchHeroRole = {
  Tank: "Tank",
  Damage: "Damage",
  Support: "Support",
} as const;
export type OverwatchHeroRole = (typeof OverwatchHeroRole)[keyof typeof OverwatchHeroRole];

export type OverwatchHeroData = {
  name: OverwatchHeroName;
  role: OverwatchHeroRole;
};

export const OverwatchHeroNames = [
  "Ana",
  "Ashe",
  "Baptiste",
  "Bastion",
  "Brigitte",
  "Cassidy",
  "Doomfist",
  "D.Va",
  "Echo",
  "Freja",
  "Genji",
  "Hanzo",
  "Hazard",
  "Illari",
  "Junker Queen",
  "Junkrat",
  "Juno",
  "Kiriko",
  "Lifeweaver",
  "Lúcio",
  "Mauga",
  "Mei",
  "Mercy",
  "Moira",
  "Orisa",
  "Pharah",
  "Ramattra",
  "Reaper",
  "Reinhardt",
  "Roadhog",
  "Sigma",
  "Sojourn",
  "Soldier: 76",
  "Sombra",
  "Symmetra",
  "Torbjörn",
  "Tracer",
  "Venture",
  "Widowmaker",
  "Winston",
  "Wrecking Ball",
  "Wuyang",
  "Zarya",
  "Zenyatta"
] as const;
export type OverwatchHeroName = (typeof OverwatchHeroNames)[number];
export function isOverwatchHeroName(str: string): str is OverwatchHeroName {
  return OverwatchHeroNames.includes(str as OverwatchHeroName);
}
