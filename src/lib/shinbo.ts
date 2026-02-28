// Shinbo/SHAFT visual language constants

export const KANJI_CHARS = [
  // Katakana
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ",
  "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン",
  // Hiragana
  "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
  // Kanji (thematic: code, creation, dream, light, shadow, spirit)
  "無", "幻", "夢", "光", "影", "魂", "空", "闇", "紅", "白",
  "黒", "刻", "永", "瞬", "創", "終", "始", "命", "道", "力",
];

export const FLASH_KANJI = [
  "無", "幻", "夢", "紅", "黒", "終", "始", "命", "魂", "刻",
];

export const COLORS = {
  red: "#dc2626",
  black: "#171717",
  white: "#fafaf9",
  zinc200: "#e4e4e7",
  zinc400: "#a1a1aa",
} as const;

export const PARTICLE_CONFIG = {
  desktop: 300,
  mobile: 80,
  charSize: 32,
  atlasGridSize: 8,
  fallSpeedMin: 0.3,
  fallSpeedMax: 1.2,
  flashProbability: 0.05,
  mouseRepelRadius: 1.5,
  mouseRepelStrength: 0.08,
} as const;

export const POST_PROCESSING = {
  chromaticAberration: { x: 0.0008, y: 0.0008 },
  bloom: { intensity: 0.15, luminanceThreshold: 0.9 },
  noise: { opacity: 0.03 },
  scanlineOpacity: 0.04,
  scanlineCount: 800,
} as const;

export const FLASH_FRAME = {
  duration: 150,
  cooldown: 8000,
  colors: [COLORS.red, COLORS.black, COLORS.white] as string[],
} as const;
