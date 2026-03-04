# emojifyi

[![npm](https://img.shields.io/npm/v/emojifyi)](https://www.npmjs.com/package/emojifyi)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Pure TypeScript emoji toolkit for developers. Encode any emoji into 8 representations, look up metadata for 3,781 emojis, search and browse by category -- all with zero dependencies. Bundled data from [Unicode Emoji 16.0](https://emojifyi.com/versions/).

> Browse all emojis at [emojifyi.com](https://emojifyi.com/) -- [search emojis](https://emojifyi.com/search/), [browse categories](https://emojifyi.com/category/), [emoji encoding tools](https://emojifyi.com/tools/unicode-lookup/), [emoji collections](https://emojifyi.com/collection/)

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

## Advanced Usage

```typescript
import {
  getEmojiByChar,
  byCategory,
  byVersion,
  categories,
  subcategories,
  allEmojis,
  emojiCount,
} from "emojifyi";

// Look up by character
const info = getEmojiByChar("\u{1F525}");
console.log(info?.slug);  // fire

// Browse by category
const animals = byCategory("animals-and-nature");
console.log(animals.length);  // 151 emojis

// New emojis in a specific version
const latest = byVersion("16.0");
console.log(latest.length);  // Latest additions

// Category metadata
for (const cat of categories()) {
  console.log(`${cat.icon} ${cat.name} (${cat.slug})`);
}

// Total count
console.log(emojiCount());  // 3781
```

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

## FYIPedia Developer Tools

Part of the [FYIPedia](https://fyipedia.com/) open-source developer tools ecosystem:

| Package | Description |
|---------|-------------|
| **emojifyi** | [Emoji encoding](https://emojifyi.com/developers/) & metadata for 3,781 Unicode emojis |
| [colorfyi](https://colorfyi.com/) | [Hex to RGB converter](https://colorfyi.com/tools/converter/), [WCAG contrast checker](https://colorfyi.com/tools/contrast-checker/), [color harmonies](https://colorfyi.com/tools/palette-generator/) |
| [symbolfyi](https://symbolfyi.com/) | [Symbol encoder](https://symbolfyi.com/developers/) -- 11 encoding formats for any character |
| [unicodefyi](https://unicodefyi.com/) | [Unicode character lookup](https://unicodefyi.com/developers/) -- 17 encodings + character search |
| [fontfyi](https://fontfyi.com/) | [Google Fonts explorer](https://fontfyi.com/developers/) -- metadata, CSS helpers, font pairings |
| [distancefyi](https://www.npmjs.com/package/distancefyi) | Haversine distance, bearing, travel times -- [distancefyi.com](https://distancefyi.com/) |
| [timefyi](https://www.npmjs.com/package/timefyi) | Timezone operations, time differences -- [timefyi.com](https://timefyi.com/) |
| [namefyi](https://www.npmjs.com/package/namefyi) | Korean romanization, Five Elements -- [namefyi.com](https://namefyi.com/) |
| [unitfyi](https://www.npmjs.com/package/unitfyi) | Unit conversion, 200 units, 20 categories -- [unitfyi.com](https://unitfyi.com/) |
| [holidayfyi](https://www.npmjs.com/package/holidayfyi) | Holiday dates, Easter calculation -- [holidayfyi.com](https://holidayfyi.com/) |

## Links

- [Emoji Browser](https://emojifyi.com/) -- Browse all 3,781 emojis online
- [Emoji Search](https://emojifyi.com/search/) -- Search emojis by name or keyword
- [Emoji Categories](https://emojifyi.com/category/) -- Browse emojis by category
- [Emoji Encoding Tools](https://emojifyi.com/tools/unicode-lookup/) -- Codepoint and encoding breakdown
- [Emoji Collections](https://emojifyi.com/collection/) -- Curated emoji collections
- [Emoji Versions](https://emojifyi.com/versions/) -- Unicode Emoji version history
- [API Documentation](https://emojifyi.com/developers/) -- REST API with free access
- [Python Package](https://pypi.org/project/emojifyi/) -- Python version with CLI and MCP server
- [Source Code](https://github.com/fyipedia/emojifyi-js) -- MIT licensed

## License

MIT
