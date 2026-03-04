/**
 * Emoji encoding engine -- compute 8 encoding representations for any character.
 *
 * Pure TypeScript, zero dependencies. Works with single emojis, ZWJ sequences,
 * keycap sequences, flags, and any Unicode character.
 */

import type { EncodingResult } from "./types.js";

/**
 * Convert a character (possibly multi-codepoint) to "U+XXXX" notation.
 *
 * @example
 * charToCodepoint("\u{1F600}")     // "U+1F600"
 * charToCodepoint("\u{1F469}\u200D\u{1F4BB}")  // "U+1F469 U+200D U+1F4BB"
 */
export function charToCodepoint(char: string): string {
  const codepoints: string[] = [];
  for (const ch of char) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined) {
      codepoints.push(`U+${cp.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  return codepoints.join(" ");
}

/**
 * UTF-8 byte representation.
 *
 * @example
 * encodeUtf8("\u{1F600}")  // "0xF0 0x9F 0x98 0x80"
 * encodeUtf8("A")          // "0x41"
 */
export function encodeUtf8(char: string): string {
  const bytes: number[] = [];
  for (const ch of char) {
    const cp = ch.codePointAt(0)!;
    if (cp <= 0x7f) {
      bytes.push(cp);
    } else if (cp <= 0x7ff) {
      bytes.push(0xc0 | (cp >> 6));
      bytes.push(0x80 | (cp & 0x3f));
    } else if (cp <= 0xffff) {
      bytes.push(0xe0 | (cp >> 12));
      bytes.push(0x80 | ((cp >> 6) & 0x3f));
      bytes.push(0x80 | (cp & 0x3f));
    } else {
      bytes.push(0xf0 | (cp >> 18));
      bytes.push(0x80 | ((cp >> 12) & 0x3f));
      bytes.push(0x80 | ((cp >> 6) & 0x3f));
      bytes.push(0x80 | (cp & 0x3f));
    }
  }
  return bytes.map((b) => `0x${b.toString(16).toUpperCase().padStart(2, "0")}`).join(" ");
}

/**
 * UTF-16 code unit representation (with surrogate pairs for supplementary chars).
 *
 * @example
 * encodeUtf16("\u{1F600}")  // "0xD83D 0xDE00"
 * encodeUtf16("A")          // "0x0041"
 */
export function encodeUtf16(char: string): string {
  const units: number[] = [];
  for (let i = 0; i < char.length; i++) {
    units.push(char.charCodeAt(i));
  }
  return units.map((u) => `0x${u.toString(16).toUpperCase().padStart(4, "0")}`).join(" ");
}

/**
 * HTML numeric entity representation.
 *
 * @example
 * encodeHtml("U+1F600")                    // "&#x1F600;"
 * encodeHtml("U+1F469 U+200D U+1F4BB")     // "&#x1F469;&#x200D;&#x1F4BB;"
 */
export function encodeHtml(codepoint: string): string {
  return codepoint
    .split(" ")
    .map((cp) => `&#x${cp.replace("U+", "")};`)
    .join("");
}

/**
 * CSS content property value.
 *
 * @example
 * encodeCss("U+1F600")  // "\\1F600"
 */
export function encodeCss(codepoint: string): string {
  return codepoint
    .split(" ")
    .map((cp) => `\\${cp.replace("U+", "")}`)
    .join("");
}

/**
 * Python string literal.
 *
 * @example
 * encodePython("U+1F600")  // "\\U0001F600"
 */
export function encodePython(codepoint: string): string {
  return codepoint
    .split(" ")
    .map((cp) => `\\U${cp.replace("U+", "").padStart(8, "0")}`)
    .join("");
}

/**
 * JavaScript string literal.
 *
 * @example
 * encodeJavascript("U+1F600")  // "\\u{1F600}"
 */
export function encodeJavascript(codepoint: string): string {
  return codepoint
    .split(" ")
    .map((cp) => `\\u{${cp.replace("U+", "")}}`)
    .join("");
}

/**
 * Java string literal with surrogate pairs for supplementary characters.
 *
 * @example
 * encodeJava("\u{1F600}")  // "\\uD83D\\uDE00"
 * encodeJava("A")          // "\\u0041"
 */
export function encodeJava(char: string): string {
  const parts: string[] = [];
  for (let i = 0; i < char.length; i++) {
    const code = char.charCodeAt(i);
    parts.push(`\\u${code.toString(16).toUpperCase().padStart(4, "0")}`);
  }
  return parts.join("");
}

/**
 * Compute all 8 encoding representations for a character.
 *
 * Works with any Unicode character: single emojis, ZWJ sequences,
 * flags, keycaps, or plain text characters.
 *
 * @example
 * const result = encode("\u{1F600}");
 * result.codepoint        // "U+1F600"
 * result.utf8Bytes        // "0xF0 0x9F 0x98 0x80"
 * result.htmlEntity       // "&#x1F600;"
 * result.cssContent       // "\\1F600"
 * result.pythonLiteral    // "\\U0001F600"
 * result.javaLiteral      // "\\uD83D\\uDE00"
 */
export function encode(char: string): EncodingResult {
  const codepoint = charToCodepoint(char);
  return {
    codepoint,
    utf8Bytes: encodeUtf8(char),
    utf16Surrogates: encodeUtf16(char),
    htmlEntity: encodeHtml(codepoint),
    cssContent: encodeCss(codepoint),
    pythonLiteral: encodePython(codepoint),
    javascriptLiteral: encodeJavascript(codepoint),
    javaLiteral: encodeJava(char),
  };
}
