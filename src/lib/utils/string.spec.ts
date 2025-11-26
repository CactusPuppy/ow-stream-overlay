import { describe, it, expect } from "vitest";
import { toSlug, transliterate } from "./string";

describe("transliterate", () => {
  it("handles a normal ascii string", () => {
    expect(transliterate("The quick brown fox jumped over the lazy dog. 12345")).toBe(
      "The quick brown fox jumped over the lazy dog. 12345",
    );
    expect(transliterate("#1 Single")).toBe("#1 Single");
    expect(transliterate("I.V. Drip")).toBe("I.V. Drip");
    expect(transliterate("Build-A-Blast Buckshot")).toBe("Build-A-Blast Buckshot");
    expect(transliterate("Nano Cola™ Nitrous")).toBe("Nano ColaTM Nitrous");
  });

  it("helps when searching for lookalike-ish characters", () => {
    expect(transliterate("Rüstung von Wilhelm")).toBe("Rustung von Wilhelm");
    expect(transliterate("Lille Fælde")).toBe("Lille Faelde");
    expect(transliterate("Volley à Deux")).toBe("Volley a Deux");
    expect(transliterate("Lúcio")).toBe("Lucio");
  });
});

describe("toSlug", () => {
  it("Should replace space with dashes without repeats", () => {
    expect(toSlug("Some String")).toBe("some-string");
    expect(toSlug("Some 0 string")).toBe("some-0-string");
    expect(toSlug("Some   string")).toBe("some-string");
  });

  it("Should replace special characters with dashes without repeats", () => {
    expect(toSlug("Some_-_string")).toBe("some-string");
    expect(toSlug("Some:string")).toBe("some-string");
    expect(toSlug("!Some_string!")).toBe("some-string");
    expect(toSlug("Some@string!!!")).toBe("some-string");
  });

  it.each([
    ["Junker Queen", "junker-queen"],
    ["Lúcio", "lucio"],
    ["Soldier: 76", "soldier-76"],
    ["Wrecking Ball", "wrecking-ball"],
  ])("Should slugify %s to %s", (input, expected) => {
    expect(toSlug(input)).toBe(expected);
  });
});
