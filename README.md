# emojifyi

[![npm](https://img.shields.io/npm/v/emojifyi)](https://www.npmjs.com/package/emojifyi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/emojifyi)

Pure TypeScript emoji toolkit for developers. Encode any emoji into 8 representations, look up metadata for 3,781 emojis, search and browse by category -- all with zero dependencies. Bundled data from [Unicode Emoji 16.0](https://emojifyi.com/versions/).

> Browse all emojis at [emojifyi.com](https://emojifyi.com/) -- [search emojis](https://emojifyi.com/search/), [browse categories](https://emojifyi.com/category/), [emoji encoding tools](https://emojifyi.com/tools/unicode-lookup/), [emoji collections](https://emojifyi.com/collection/)

<p align="center">
  <img src="demo.gif" alt="emojifyi demo — emoji lookup, encoding, and search" width="800">
</p>

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [What You Can Do](#what-you-can-do)
  - [Emoji Encoding](#emoji-encoding)
  - [Emoji Lookup & Search](#emoji-lookup--search)
  - [Browse by Category](#browse-by-category)
- [Encoding Functions](#encoding-functions)
- [API Reference](#api-reference)
- [Data Types](#data-types)
- [Features](#features)
- [Learn More About Emojis](#learn-more-about-emojis)
- [Also Available for Python](#also-available-for-python)
- [FYIPedia Developer Tools](#fyipedia-developer-tools)
- [License](#license)

## Install

```bash
npm install emojifyi
```

## Quick Start

```typescript
import { encode, getEmoji, search } from "emojifyi";

// Encode any emoji into 8 representations
const result = encode("\u{1F600}");
console.log(result.codepoint);          // U+1F600
console.log(result.utf8Bytes);          // 0xF0 0x9F 0x98 0x80
console.log(result.utf16Surrogates);    // 0xD83D 0xDE00
console.log(result.htmlEntity);         // &#x1F600;
console.log(result.cssContent);         // \1F600
console.log(result.pythonLiteral);      // \U0001F600
console.log(result.javascriptLiteral);  // \u{1F600}
console.log(result.javaLiteral);        // \uD83D\uDE00

// Look up emoji metadata
const info = getEmoji("red-heart");
console.log(info?.character);           // Red heart emoji
console.log(info?.category);            // smileys-and-emotion
console.log(info?.emojiVersion);        // 1.0

// Search emojis by name
for (const emoji of search("fire").slice(0, 5)) {
  console.log(`${emoji.character} ${emoji.cldrName}`);
}
```

## What You Can Do

### Emoji Encoding

Every emoji is represented internally as one or more Unicode code points. The `encode()` function converts any emoji character into **8 encoding formats** for different programming contexts:

| # | Format | Example (U+1F600) | Use Case |
|---|--------|-------------------|----------|
| 1 | **Codepoint** | `U+1F600` | Unicode documentation, character charts |
| 2 | **UTF-8 Bytes** | `0xF0 0x9F 0x98 0x80` | Network protocols, file I/O, database storage |
| 3 | **UTF-16 Surrogates** | `0xD83D 0xDE00` | Java, C#, Windows APIs, JavaScript internals |
| 4 | **HTML Entity** | `&#x1F600;` | Web pages, email HTML, CMS content |
| 5 | **CSS Content** | `\1F600` | CSS `content` property, `::before`/`::after` pseudo-elements |
| 6 | **Python Literal** | `\U0001F600` | Python source code, string escaping |
| 7 | **JavaScript Literal** | `\u{1F600}` | ES6+ source code, JSON embedding |
| 8 | **Java Literal** | `\uD83D\uDE00` | Java source code (requires surrogate pairs for U+10000+) |

```typescript
import { encode } from "emojifyi";

// Encode the grinning face emoji into all 8 representations
const result = encode("\u{1F600}");
console.log(result.codepoint);          // "U+1F600"
console.log(result.utf8Bytes);          // "0xF0 0x9F 0x98 0x80"
console.log(result.utf16Surrogates);    // "0xD83D 0xDE00"
console.log(result.htmlEntity);         // "&#x1F600;"
console.log(result.cssContent);         // "\1F600"
console.log(result.pythonLiteral);      // "\U0001F600"
console.log(result.javascriptLiteral);  // "\u{1F600}"
console.log(result.javaLiteral);        // "\uD83D\uDE00"
```

ZWJ (Zero Width Joiner) sequences are fully supported -- compound emojis like family groups and profession emojis encode correctly across all formats.

Learn more: [Unicode Lookup Tool](https://emojifyi.com/tools/unicode-lookup/) · [Emoji Encoding Guide](https://emojifyi.com/glossary/) · [Unicode Emoji 16.0 Spec](https://unicode.org/emoji/charts-16.0/emoji-released.html)

### Emoji Lookup & Search

Look up metadata for any of the **3,781 emojis** in the bundled Unicode Emoji 16.0 dataset. Each emoji includes 12 metadata fields: character, slug, CLDR name, codepoint, category, subcategory, emoji version, Unicode version, year added, type (component, fully-qualified, etc.), ZWJ status, and skin tone support.

```typescript
import { getEmoji, getEmojiByChar, search } from "emojifyi";

// Look up by slug -- SEO-friendly identifiers
const heart = getEmoji("red-heart");
console.log(heart?.character);     // Red heart emoji
console.log(heart?.category);      // "smileys-and-emotion"
console.log(heart?.emojiVersion);  // "1.0"
console.log(heart?.isZwj);         // false
console.log(heart?.hasSkinTones);  // false

// Look up by character
const fire = getEmojiByChar("\u{1F525}");
console.log(fire?.slug);           // "fire"
console.log(fire?.cldrName);       // "fire"

// Search by name -- case-insensitive substring matching
const results = search("heart", 5);
for (const emoji of results) {
  console.log(`${emoji.character} ${emoji.cldrName} (${emoji.codepoint})`);
}
```

Learn more: [Emoji Search](https://emojifyi.com/search/) · [REST API Docs](https://emojifyi.com/developers/) · [OpenAPI Spec](https://emojifyi.com/api/openapi.json)

### Browse by Category

The Unicode Consortium organizes emojis into **10 top-level categories** and **100 subcategories**. Browse, filter, and explore the full emoji dataset programmatically:

```typescript
import { byCategory, byVersion, categories, subcategories, allEmojis, emojiCount } from "emojifyi";

// Browse by category
const animals = byCategory("animals-and-nature");
console.log(animals.length);  // 151 emojis

// New emojis added in Unicode Emoji 16.0
const latest = byVersion("16.0");
console.log(latest.length);  // Latest additions

// List all 10 categories with icons
for (const cat of categories()) {
  console.log(`${cat.icon} ${cat.name} (${cat.slug})`);
}

// Subcategories within a category
const faceSubs = subcategories("smileys-and-emotion");
for (const sub of faceSubs) {
  console.log(`  ${sub.name} (${sub.slug})`);
}

// Total emoji count
console.log(emojiCount());  // 3781
```

Learn more: [Browse Categories](https://emojifyi.com/category/) · [Emoji Collections](https://emojifyi.com/collection/) · [Emoji Versions](https://emojifyi.com/versions/)

## Encoding Functions

Individual encoding functions are available for fine-grained control:

```typescript
import {
  charToCodepoint,
  encodeUtf8,
  encodeUtf16,
  encodeHtml,
  encodeCss,
  encodePython,
  encodeJavascript,
  encodeJava,
} from "emojifyi";

// Works with single emojis
charToCodepoint("\u{1F600}");   // "U+1F600"

// Works with ZWJ sequences (woman technologist)
charToCodepoint("\u{1F469}\u{200D}\u{1F4BB}");  // "U+1F469 U+200D U+1F4BB"

// Works with flags (US flag)
encodeUtf8("\u{1F1FA}\u{1F1F8}");  // "0xF0 0x9F 0x87 0xBA 0xF0 0x9F 0x87 0xB8"
```

## API Reference

### Encoding

| Function | Description |
|----------|-------------|
| `encode(char) -> EncodingResult` | All 8 encodings at once |
| `charToCodepoint(char) -> string` | Character to `U+XXXX` notation |
| `encodeUtf8(char) -> string` | UTF-8 byte representation |
| `encodeUtf16(char) -> string` | UTF-16 code units (with surrogates) |
| `encodeHtml(codepoint) -> string` | HTML numeric entity |
| `encodeCss(codepoint) -> string` | CSS content property value |
| `encodePython(codepoint) -> string` | Python string literal |
| `encodeJavascript(codepoint) -> string` | JavaScript string literal |
| `encodeJava(char) -> string` | Java literal (with surrogates) |

### Lookup and Search

| Function | Description |
|----------|-------------|
| `getEmoji(slug) -> EmojiInfo \| null` | Look up by slug |
| `getEmojiByChar(char) -> EmojiInfo \| null` | Look up by character |
| `search(query, limit?) -> EmojiInfo[]` | Case-insensitive name search (default limit: 20) |
| `allEmojis() -> EmojiInfo[]` | All 3,781 emojis |
| `emojiCount() -> number` | Total emoji count |

### Browse

| Function | Description |
|----------|-------------|
| `byCategory(slug) -> EmojiInfo[]` | Filter by category |
| `byVersion(version) -> EmojiInfo[]` | Filter by emoji version |
| `categories() -> Category[]` | All 10 categories |
| `subcategories(slug?) -> Subcategory[]` | All or filtered subcategories |

## Data Types

### `EncodingResult`

8-field object: `codepoint`, `utf8Bytes`, `utf16Surrogates`, `htmlEntity`, `cssContent`, `pythonLiteral`, `javascriptLiteral`, `javaLiteral`

### `EmojiInfo`

12-field object: `character`, `slug`, `cldrName`, `codepoint`, `category`, `subcategory`, `emojiVersion`, `unicodeVersion`, `addedYear`, `emojiType`, `isZwj`, `hasSkinTones`

### `Category`

4-field object: `slug`, `name`, `icon`, `order`

### `Subcategory`

4-field object: `slug`, `name`, `categorySlug`, `order`

## Features

- **8 encoding types**: UTF-8 bytes, UTF-16 surrogates, HTML entity, CSS content, Python/JavaScript/Java literals, codepoint
- **3,781 emojis**: Full Unicode Emoji 16.0 dataset with metadata
- **10 categories, 100 subcategories**: Browse and filter
- **ZWJ support**: Multi-codepoint sequences, flags, keycaps, skin tones
- **Zero dependencies**: Pure TypeScript with bundled JSON data
- **Tree-shakeable**: ESM-only, import only what you need
- **Type-safe**: Full TypeScript declarations included

## Learn More About Emojis

- **Browse**: [Emoji Browser](https://emojifyi.com/) · [Search](https://emojifyi.com/search/) · [Categories](https://emojifyi.com/category/)
- **Tools**: [Unicode Lookup](https://emojifyi.com/tools/unicode-lookup/)
- **Collections**: [Emoji Collections](https://emojifyi.com/collection/) · [Versions](https://emojifyi.com/versions/)
- **API**: [REST API Docs](https://emojifyi.com/developers/) · [OpenAPI Spec](https://emojifyi.com/api/openapi.json)
- **Python**: [PyPI Package](https://pypi.org/project/emojifyi/)

## Also Available for Python

```bash
pip install emojifyi
```

See the [Python package on PyPI](https://pypi.org/project/emojifyi/).

## FYIPedia Developer Tools

Part of the [FYIPedia](https://fyipedia.com) open-source developer tools ecosystem.

| Package | PyPI | npm | Description |
|---------|------|-----|-------------|
| colorfyi | [PyPI](https://pypi.org/project/colorfyi/) | [npm](https://www.npmjs.com/package/@fyipedia/colorfyi) | Color conversion, WCAG contrast, harmonies -- [colorfyi.com](https://colorfyi.com/) |
| **emojifyi** | [PyPI](https://pypi.org/project/emojifyi/) | [npm](https://www.npmjs.com/package/emojifyi) | Emoji encoding & metadata for 3,953 emojis -- [emojifyi.com](https://emojifyi.com/) |
| symbolfyi | [PyPI](https://pypi.org/project/symbolfyi/) | [npm](https://www.npmjs.com/package/symbolfyi) | Symbol encoding in 11 formats -- [symbolfyi.com](https://symbolfyi.com/) |
| unicodefyi | [PyPI](https://pypi.org/project/unicodefyi/) | [npm](https://www.npmjs.com/package/unicodefyi) | Unicode lookup with 17 encodings -- [unicodefyi.com](https://unicodefyi.com/) |
| fontfyi | [PyPI](https://pypi.org/project/fontfyi/) | [npm](https://www.npmjs.com/package/fontfyi) | Google Fonts metadata & CSS -- [fontfyi.com](https://fontfyi.com/) |
| distancefyi | [PyPI](https://pypi.org/project/distancefyi/) | [npm](https://www.npmjs.com/package/distancefyi) | Haversine distance & travel times -- [distancefyi.com](https://distancefyi.com/) |
| timefyi | [PyPI](https://pypi.org/project/timefyi/) | [npm](https://www.npmjs.com/package/timefyi) | Timezone ops & business hours -- [timefyi.com](https://timefyi.com/) |
| namefyi | [PyPI](https://pypi.org/project/namefyi/) | [npm](https://www.npmjs.com/package/namefyi) | Korean romanization & Five Elements -- [namefyi.com](https://namefyi.com/) |
| unitfyi | [PyPI](https://pypi.org/project/unitfyi/) | [npm](https://www.npmjs.com/package/unitfyi) | Unit conversion, 220 units -- [unitfyi.com](https://unitfyi.com/) |
| holidayfyi | [PyPI](https://pypi.org/project/holidayfyi/) | [npm](https://www.npmjs.com/package/holidayfyi) | Holiday dates & Easter calculation -- [holidayfyi.com](https://holidayfyi.com/) |
| cocktailfyi | [PyPI](https://pypi.org/project/cocktailfyi/) | -- | Cocktail ABV, calories, flavor -- [cocktailfyi.com](https://cocktailfyi.com/) |
| fyipedia | [PyPI](https://pypi.org/project/fyipedia/) | -- | Unified CLI: `fyi color info FF6B35` -- [fyipedia.com](https://fyipedia.com/) |
| fyipedia-mcp | [PyPI](https://pypi.org/project/fyipedia-mcp/) | -- | Unified MCP hub for AI assistants -- [fyipedia.com](https://fyipedia.com/) |

## License

MIT
