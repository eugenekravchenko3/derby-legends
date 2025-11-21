const PREFIXES = [
  "Quantum", "Cyber", "Neon", "Solar", "Lunar", "Atomic", "Galactic", "Binary", 
  "Logic", "Turbo", "Sonic", "Hyper", "Mega", "Giga", "Nano", "Data", "Circuit", 
  "Astro", "Cosmic", "Digital", "Vector", "Pixel", "Plasma", "Zero", "Alpha"
];

const SUFFIXES = [
  "Runner", "Spirit", "Storm", "Flash", "Spark", "Dash", "Flow", "Stream", 
  "Byte", "Bit", "Link", "Wave", "Core", "Mind", "Surge", "Drifter", "Chaser", 
  "Glitch", "Nova", "Comet", "Pulse", "Protocol", "Engine", "Rider", "Walker"
];

export const generateCreativeHorseNames = async (count: number): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Small simulation delay

  const names = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10; 

  while (names.size < count && attempts < maxAttempts) {
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    
    if (prefix !== suffix) {
        names.add(`${prefix} ${suffix}`);
    }
    attempts++;
  }

  return Array.from(names);
};