/**
 * emojifyi -- Pure TypeScript emoji toolkit.
 *
 * Encode any emoji into 8 representations, look up metadata for 3,781 emojis,
 * search and browse by category. Zero dependencies.
 *
 * @packageDocumentation
 */

// Types
export type {
  EmojiInfo,
  EncodingResult,
  Category,
  Subcategory,
} from "./types.js";

// Encoding functions
export {
  charToCodepoint,
  encodeUtf8,
  encodeUtf16,
  encodeHtml,
  encodeCss,
  encodePython,
  encodeJavascript,
  encodeJava,
  encode,
} from "./encoding.js";

// Data lookup and search
export {
  getEmoji,
  getEmojiByChar,
  search,
  allEmojis,
  byCategory,
  byVersion,
  categories,
  subcategories,
  emojiCount,
} from "./data.js";
