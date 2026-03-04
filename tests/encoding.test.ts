import { describe, expect, it } from "vitest";
import {
  charToCodepoint,
  encodeUtf8,
  encodeUtf16,
  encodeHtml,
  encodeCss,
  encodePython,
  encodeJavascript,
  encodeJava,
  encode,
  getEmoji,
  getEmojiByChar,
  search,
  allEmojis,
  byCategory,
  byVersion,
  categories,
  subcategories,
  emojiCount,
} from "../src/index.js";

// ---------------------------------------------------------------------------
// Encoding functions
// ---------------------------------------------------------------------------

describe("charToCodepoint", () => {
  it("converts a BMP character", () => {
    expect(charToCodepoint("A")).toBe("U+0041");
  });

  it("converts a supplementary character", () => {
    expect(charToCodepoint("\u{1F600}")).toBe("U+1F600");
  });

  it("converts a ZWJ sequence", () => {
    // Woman technologist: woman + ZWJ + laptop
    expect(charToCodepoint("\u{1F469}\u{200D}\u{1F4BB}")).toBe(
      "U+1F469 U+200D U+1F4BB",
    );
  });

  it("converts a flag sequence", () => {
    // US flag: regional indicator U + regional indicator S
    expect(charToCodepoint("\u{1F1FA}\u{1F1F8}")).toBe("U+1F1FA U+1F1F8");
  });
});

describe("encodeUtf8", () => {
  it("encodes ASCII", () => {
    expect(encodeUtf8("A")).toBe("0x41");
  });

  it("encodes 2-byte character", () => {
    // Copyright sign U+00A9
    expect(encodeUtf8("\u00A9")).toBe("0xC2 0xA9");
  });

  it("encodes 3-byte character", () => {
    // Euro sign U+20AC
    expect(encodeUtf8("\u20AC")).toBe("0xE2 0x82 0xAC");
  });

  it("encodes 4-byte emoji", () => {
    expect(encodeUtf8("\u{1F600}")).toBe("0xF0 0x9F 0x98 0x80");
  });

  it("encodes ZWJ sequence", () => {
    const result = encodeUtf8("\u{1F469}\u{200D}\u{1F4BB}");
    // Woman (4 bytes) + ZWJ (3 bytes) + Laptop (4 bytes) = 11 bytes
    expect(result.split(" ")).toHaveLength(11);
  });
});

describe("encodeUtf16", () => {
  it("encodes BMP character", () => {
    expect(encodeUtf16("A")).toBe("0x0041");
  });

  it("encodes supplementary character as surrogate pair", () => {
    expect(encodeUtf16("\u{1F600}")).toBe("0xD83D 0xDE00");
  });

  it("encodes BMP emoji without surrogates", () => {
    // Heavy check mark U+2714
    expect(encodeUtf16("\u2714")).toBe("0x2714");
  });
});

describe("encodeHtml", () => {
  it("encodes single codepoint", () => {
    expect(encodeHtml("U+1F600")).toBe("&#x1F600;");
  });

  it("encodes multi-codepoint sequence", () => {
    expect(encodeHtml("U+1F469 U+200D U+1F4BB")).toBe(
      "&#x1F469;&#x200D;&#x1F4BB;",
    );
  });
});

describe("encodeCss", () => {
  it("encodes single codepoint", () => {
    expect(encodeCss("U+1F600")).toBe("\\1F600");
  });

  it("encodes multi-codepoint sequence", () => {
    expect(encodeCss("U+1F469 U+200D U+1F4BB")).toBe(
      "\\1F469\\200D\\1F4BB",
    );
  });
});

describe("encodePython", () => {
  it("encodes to 8-digit format", () => {
    expect(encodePython("U+1F600")).toBe("\\U0001F600");
  });

  it("encodes short codepoint with zero-padding", () => {
    expect(encodePython("U+0041")).toBe("\\U00000041");
  });
});

describe("encodeJavascript", () => {
  it("encodes with curly braces", () => {
    expect(encodeJavascript("U+1F600")).toBe("\\u{1F600}");
  });

  it("encodes ZWJ sequence", () => {
    expect(encodeJavascript("U+1F469 U+200D U+1F4BB")).toBe(
      "\\u{1F469}\\u{200D}\\u{1F4BB}",
    );
  });
});

describe("encodeJava", () => {
  it("encodes BMP character", () => {
    expect(encodeJava("A")).toBe("\\u0041");
  });

  it("encodes supplementary character as surrogate pair", () => {
    expect(encodeJava("\u{1F600}")).toBe("\\uD83D\\uDE00");
  });
});

describe("encode (all-in-one)", () => {
  it("encodes grinning face completely", () => {
    const result = encode("\u{1F600}");
    expect(result.codepoint).toBe("U+1F600");
    expect(result.utf8Bytes).toBe("0xF0 0x9F 0x98 0x80");
    expect(result.utf16Surrogates).toBe("0xD83D 0xDE00");
    expect(result.htmlEntity).toBe("&#x1F600;");
    expect(result.cssContent).toBe("\\1F600");
    expect(result.pythonLiteral).toBe("\\U0001F600");
    expect(result.javascriptLiteral).toBe("\\u{1F600}");
    expect(result.javaLiteral).toBe("\\uD83D\\uDE00");
  });

  it("encodes red heart (BMP with variation selector)", () => {
    // Red heart U+2764 U+FE0F
    const result = encode("\u2764\uFE0F");
    expect(result.codepoint).toBe("U+2764 U+FE0F");
    expect(result.htmlEntity).toBe("&#x2764;&#xFE0F;");
  });

  it("encodes ZWJ sequence", () => {
    const result = encode("\u{1F469}\u{200D}\u{1F4BB}");
    expect(result.codepoint).toBe("U+1F469 U+200D U+1F4BB");
    expect(result.htmlEntity).toBe("&#x1F469;&#x200D;&#x1F4BB;");
    expect(result.javascriptLiteral).toBe("\\u{1F469}\\u{200D}\\u{1F4BB}");
  });
});

// ---------------------------------------------------------------------------
// Data lookup and search
// ---------------------------------------------------------------------------

describe("getEmoji", () => {
  it("finds grinning face by slug", () => {
    const info = getEmoji("grinning-face");
    expect(info).not.toBeNull();
    expect(info!.character).toBe("\u{1F600}");
    expect(info!.codepoint).toBe("U+1F600");
    expect(info!.cldrName).toBe("grinning face");
    expect(info!.category).toBe("smileys-and-emotion");
    expect(info!.isZwj).toBe(false);
  });

  it("returns null for unknown slug", () => {
    expect(getEmoji("not-a-real-emoji")).toBeNull();
  });
});

describe("getEmojiByChar", () => {
  it("finds emoji by character", () => {
    const info = getEmojiByChar("\u{1F525}");
    expect(info).not.toBeNull();
    expect(info!.slug).toBe("fire");
    expect(info!.cldrName).toBe("fire");
  });

  it("returns null for non-emoji character", () => {
    expect(getEmojiByChar("Z")).toBeNull();
  });
});

describe("search", () => {
  it("finds heart emojis", () => {
    const results = search("heart");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.cldrName.toLowerCase()).toContain("heart");
  });

  it("finds grinning emojis", () => {
    const results = search("grin");
    expect(results.length).toBeGreaterThan(0);
  });

  it("respects limit parameter", () => {
    const results = search("face", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns empty for zero limit", () => {
    expect(search("heart", 0)).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    const lower = search("FIRE");
    const upper = search("fire");
    expect(lower.length).toBe(upper.length);
  });
});

describe("allEmojis", () => {
  it("returns all emojis", () => {
    const all = allEmojis();
    expect(all.length).toBe(3781);
  });
});

describe("byCategory", () => {
  it("returns emojis for a known category", () => {
    const faces = byCategory("smileys-and-emotion");
    expect(faces.length).toBeGreaterThan(0);
    for (const f of faces) {
      expect(f.category).toBe("smileys-and-emotion");
    }
  });

  it("returns empty for unknown category", () => {
    expect(byCategory("nonexistent")).toHaveLength(0);
  });
});

describe("byVersion", () => {
  it("returns emojis for version 1.0", () => {
    const v1 = byVersion("1.0");
    expect(v1.length).toBeGreaterThan(0);
    for (const e of v1) {
      expect(e.emojiVersion).toBe("1.0");
    }
  });
});

describe("categories", () => {
  it("returns all 10 categories", () => {
    const cats = categories();
    expect(cats).toHaveLength(10);
    expect(cats[0]!.name).toBe("Smileys & Emotion");
    expect(cats[0]!.slug).toBe("smileys-and-emotion");
    expect(cats[0]!.icon).toBe("\u{1F600}");
    expect(cats[0]!.order).toBe(1);
  });
});

describe("subcategories", () => {
  it("returns all subcategories", () => {
    const subs = subcategories();
    expect(subs.length).toBeGreaterThan(0);
  });

  it("filters by category", () => {
    const subs = subcategories("smileys-and-emotion");
    expect(subs.length).toBeGreaterThan(0);
    for (const sc of subs) {
      expect(sc.categorySlug).toBe("smileys-and-emotion");
    }
  });
});

describe("emojiCount", () => {
  it("returns total count", () => {
    expect(emojiCount()).toBe(3781);
  });
});
