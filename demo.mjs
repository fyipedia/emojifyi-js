import { getEmojiByChar, encode, search } from './dist/index.js'

const C = { r: '\x1b[0m', b: '\x1b[1m', d: '\x1b[2m', y: '\x1b[33m', g: '\x1b[32m', c: '\x1b[36m' }

// 1. Emoji lookup
const party = getEmojiByChar('\u{1F389}')
console.log(`${C.b}${C.y}Emoji: ${party.character} ${C.r}`)
console.log(`  ${C.c}Name     ${C.r} ${C.g}${party.cldrName}${C.r}`)
console.log(`  ${C.c}Category ${C.r} ${C.g}${party.category}${C.r} ${C.d}> ${party.subcategory}${C.r}`)
console.log(`  ${C.c}Codepoint${C.r} ${C.g}${party.codepoint}${C.r}`)
console.log(`  ${C.c}Version  ${C.r} ${C.g}Emoji ${party.emojiVersion}${C.r} ${C.d}(${party.addedYear})${C.r}`)

console.log()

// 2. Encode emoji
const enc = encode('\u{1F680}')
console.log(`${C.b}${C.y}Encode: \u{1F680} ${C.r}`)
console.log(`  ${C.c}UTF-8 ${C.r} ${C.g}${enc.utf8Bytes}${C.r}`)
console.log(`  ${C.c}HTML  ${C.r} ${C.g}${enc.htmlEntity}${C.r}`)
console.log(`  ${C.c}CSS   ${C.r} ${C.g}${enc.cssContent}${C.r}`)
console.log(`  ${C.c}JS    ${C.r} ${C.g}${enc.javascriptLiteral}${C.r}`)
console.log(`  ${C.c}Python${C.r} ${C.g}${enc.pythonLiteral}${C.r}`)

console.log()

// 3. Search
const results = search('fire', 3)
console.log(`${C.b}${C.y}Search: "fire"${C.r}`)
for (const r of results) {
  console.log(`  ${r.character}  ${C.g}${r.cldrName}${C.r} ${C.d}(${r.category})${C.r}`)
}
