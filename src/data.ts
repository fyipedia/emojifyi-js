/**
 * Emoji data bundle -- 3,781 emojis from Unicode Emoji 16.0.
 *
 * Loads emoji metadata from bundled JSON. Data is lazy-loaded
 * on first access and cached in module-level variables.
 */

import type {
  Category,
  EmojiInfo,
  RawCategory,
  RawEmoji,
  RawSubcategory,
  Subcategory,
} from "./types.js";

import rawEmojis from "./emojis.json" with { type: "json" };
import rawCategories from "./categories.json" with { type: "json" };
import rawSubcategories from "./subcategories.json" with { type: "json" };

// Lazy-built indexes
let _bySlug: Map<string, RawEmoji> | null = null;
let _byChar: Map<string, RawEmoji> | null = null;

function emojis(): RawEmoji[] {
  return rawEmojis as RawEmoji[];
}

function buildSlugIndex(): Map<string, RawEmoji> {
  if (_bySlug === null) {
    _bySlug = new Map();
    for (const e of emojis()) {
      _bySlug.set(e.slug, e);
    }
  }
  return _bySlug;
}

function buildCharIndex(): Map<string, RawEmoji> {
  if (_byChar === null) {
    _byChar = new Map();
    for (const e of emojis()) {
      _byChar.set(e.character, e);
    }
  }
  return _byChar;
}

function toEmojiInfo(raw: RawEmoji): EmojiInfo {
  return {
    codepoint: raw.codepoint,
    character: raw.character,
    slug: raw.slug,
    cldrName: raw.cldr_name,
    category: raw.category_slug,
    subcategory: raw.subcategory_slug,
    emojiVersion: raw.emoji_version,
    unicodeVersion: raw.unicode_version,
    addedYear: raw.added_year,
    emojiType: raw.emoji_type,
    isZwj: raw.is_zwj,
    hasSkinTones: raw.has_skin_tones,
  };
}

/**
 * Look up an emoji by its slug.
 *
 * @example
 * const info = getEmoji("grinning-face");
 * info?.character  // "\u{1F600}"
 */
export function getEmoji(slug: string): EmojiInfo | null {
  const raw = buildSlugIndex().get(slug);
  return raw ? toEmojiInfo(raw) : null;
}

/**
 * Look up an emoji by its character.
 *
 * @example
 * const info = getEmojiByChar("\u{1F525}");
 * info?.slug  // "fire"
 */
export function getEmojiByChar(character: string): EmojiInfo | null {
  const raw = buildCharIndex().get(character);
  return raw ? toEmojiInfo(raw) : null;
}

/**
 * Search emojis by name (case-insensitive substring match).
 *
 * @param query - Search string to match against CLDR names
 * @param limit - Maximum results to return (default: 20)
 *
 * @example
 * const results = search("heart");
 * results[0].cldrName  // "red heart"
 */
export function search(query: string, limit: number = 20): EmojiInfo[] {
  if (limit <= 0) return [];
  const q = query.toLowerCase();
  const results: EmojiInfo[] = [];
  for (const raw of emojis()) {
    if (raw.cldr_name.toLowerCase().includes(q)) {
      results.push(toEmojiInfo(raw));
      if (results.length >= limit) break;
    }
  }
  return results;
}

/**
 * Return all 3,781 emojis.
 */
export function allEmojis(): EmojiInfo[] {
  return emojis().map(toEmojiInfo);
}

/**
 * Return all emojis in a category.
 *
 * @example
 * const faces = byCategory("smileys-and-emotion");
 */
export function byCategory(categorySlug: string): EmojiInfo[] {
  return emojis()
    .filter((e) => e.category_slug === categorySlug)
    .map(toEmojiInfo);
}

/**
 * Return all emojis added in a specific emoji version.
 *
 * @example
 * const newest = byVersion("16.0");
 */
export function byVersion(version: string): EmojiInfo[] {
  return emojis()
    .filter((e) => e.emoji_version === version)
    .map(toEmojiInfo);
}

/**
 * Return all 10 emoji categories.
 */
export function categories(): Category[] {
  return (rawCategories as RawCategory[]).map((c) => ({
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    order: c.order,
  }));
}

/**
 * Return subcategories, optionally filtered by parent category.
 */
export function subcategories(categorySlug?: string): Subcategory[] {
  const subs = rawSubcategories as RawSubcategory[];
  const filtered = categorySlug
    ? subs.filter((sc) => sc.category_slug === categorySlug)
    : subs;
  return filtered.map((sc) => ({
    name: sc.name,
    slug: sc.slug,
    categorySlug: sc.category_slug,
    order: sc.order,
  }));
}

/**
 * Total number of emojis in the dataset.
 */
export function emojiCount(): number {
  return emojis().length;
}
