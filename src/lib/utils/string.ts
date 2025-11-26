const combiningUnicodeChars = /[\u0300-\u036F]/g;
export function transliterate(string: string): string {
  return string.normalize("NFKD").replace(combiningUnicodeChars, "").replace("\u00E6", "ae");
}

export function toSlug(string: string): string {
  return transliterate(string)
    .replace(/[&.()]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .replaceAll(" ", "-")
    .toLowerCase()
    .replace(/-+/g, "-");
}
