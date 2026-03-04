/**
 * Core emoji metadata for a single emoji character.
 */
export interface EmojiInfo {
  /** Unicode codepoint notation, e.g. "U+1F600" or "U+1F469 U+200D U+1F4BB" */
  codepoint: string;
  /** The actual emoji character */
  character: string;
  /** URL-safe slug, e.g. "grinning-face" */
  slug: string;
  /** CLDR short name, e.g. "grinning face" */
  cldrName: string;
  /** Category slug, e.g. "smileys-and-emotion" */
  category: string;
  /** Subcategory slug, e.g. "face-smiling" */
  subcategory: string;
  /** Emoji version when added, e.g. "1.0", "16.0" */
  emojiVersion: string;
  /** Unicode version, e.g. "1.0" */
  unicodeVersion: string;
  /** Year the emoji was added */
  addedYear: number;
  /** Emoji type: "basic", "variant", "skin_tone", "zwj" */
  emojiType: string;
  /** Whether this is a ZWJ (Zero Width Joiner) sequence */
  isZwj: boolean;
  /** Whether this emoji supports skin tone modifiers */
  hasSkinTones: boolean;
}

/**
 * All 8 encoding representations for an emoji character.
 */
export interface EncodingResult {
  /** Unicode codepoint notation, e.g. "U+1F600" */
  codepoint: string;
  /** UTF-8 byte representation, e.g. "0xF0 0x9F 0x98 0x80" */
  utf8Bytes: string;
  /** UTF-16 code units (with surrogates for supplementary chars), e.g. "0xD83D 0xDE00" */
  utf16Surrogates: string;
  /** HTML numeric entity, e.g. "&#x1F600;" */
  htmlEntity: string;
  /** CSS content property value, e.g. "\\1F600" */
  cssContent: string;
  /** Python string literal, e.g. "\\U0001F600" */
  pythonLiteral: string;
  /** JavaScript string literal, e.g. "\\u{1F600}" */
  javascriptLiteral: string;
  /** Java string literal (with surrogates), e.g. "\\uD83D\\uDE00" */
  javaLiteral: string;
}

/**
 * Emoji category metadata.
 */
export interface Category {
  /** Category display name, e.g. "Smileys & Emotion" */
  name: string;
  /** URL-safe slug, e.g. "smileys-and-emotion" */
  slug: string;
  /** Representative emoji icon */
  icon: string;
  /** Display order (1-10) */
  order: number;
}

/**
 * Emoji subcategory metadata.
 */
export interface Subcategory {
  /** Subcategory display name, e.g. "face-smiling" */
  name: string;
  /** URL-safe slug */
  slug: string;
  /** Parent category slug */
  categorySlug: string;
  /** Display order within category */
  order: number;
}

/**
 * Raw emoji record as stored in emojis.json.
 * @internal
 */
export interface RawEmoji {
  codepoint: string;
  character: string;
  slug: string;
  cldr_name: string;
  category_slug: string;
  subcategory_slug: string;
  emoji_version: string;
  unicode_version: string;
  added_year: number;
  emoji_type: string;
  is_zwj: boolean;
  has_skin_tones: boolean;
  base_emoji_slug: string;
  order: number;
}

/**
 * Raw category record as stored in categories.json.
 * @internal
 */
export interface RawCategory {
  name: string;
  slug: string;
  icon: string;
  order: number;
}

/**
 * Raw subcategory record as stored in subcategories.json.
 * @internal
 */
export interface RawSubcategory {
  name: string;
  slug: string;
  category_slug: string;
  order: number;
}
