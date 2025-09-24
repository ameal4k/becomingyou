export function truncate(str: string, max = 120) {
  if (str.length <= max) return str;
  const clipped = str.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trim() + "…";
}
