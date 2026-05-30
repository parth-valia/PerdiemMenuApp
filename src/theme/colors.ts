// Per Diem — Stitch "Warm & Atmospheric Culinary" design system
export const Colors = {
  // ── Backgrounds (from Stitch generated palette) ───────────────────────────
  bg: '#FBFAF1',
  bgWarm: '#F5F4EC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surface2: '#F5F4EC',
  surface3: '#EAE8E0',

  // ── Brand amber (Stitch primary: #FFBF00, dark: #795900) ─────────────────
  amber: '#FFBF00',
  amberLight: '#FBBC00',
  amberDark: '#795900',
  amberBg: 'rgba(255,191,0,0.09)',
  amberBgStrong: 'rgba(255,191,0,0.18)',

  // ── Text (warm tones from Stitch) ────────────────────────────────────────
  textPrimary: '#1C1208',
  textSecondary: '#705A49',
  textTertiary: '#A08069',
  textInverse: '#FFFFFF',
  textOnAmber: '#1C1208',

  // ── Borders ──────────────────────────────────────────────────────────────
  border: 'rgba(212,197,171,0.45)',
  borderMid: 'rgba(212,197,171,0.70)',
  borderStrong: '#D4C5AB',
  borderFocus: 'rgba(255,191,0,0.55)',
  borderAmber: 'rgba(255,191,0,0.38)',

  // ── Semantic ─────────────────────────────────────────────────────────────
  success: '#16A34A',
  successBg: '#F0FDF4',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  info: '#2563EB',

  // ── Shadows (Stitch: rgba(74,55,40,0.08) warm brown) ─────────────────────
  shadow: 'rgba(74,55,40,0.08)',
  shadowMd: 'rgba(74,55,40,0.14)',
  shadowAmber: 'rgba(255,191,0,0.32)',

  // ── Overlay ──────────────────────────────────────────────────────────────
  overlay: 'rgba(18,10,4,0.55)',
  overlayLight: 'rgba(18,10,4,0.22)',

  // ── Glass — Stitch frosted glass spec ────────────────────────────────────
  // bg: rgba(255,255,255,0.70), border: rgba(255,255,255,0.40)
  glass: 'rgba(255,255,255,0.72)',
  glassElevated: 'rgba(255,255,255,0.92)',
  glassBorder: 'rgba(255,255,255,0.42)',
  glassAmber: 'rgba(255,191,0,0.07)',
  glassAmberStrong: 'rgba(255,191,0,0.14)',

  // ── Legacy aliases (keep for any code that references them) ───────────────
  espresso: '#1C1208',
  cream: '#FBFAF1',
  surfaceMuted: '#F5F4EC',
  selectedOptionBg: 'rgba(255,191,0,0.09)',
  disabled: '#C4B9B2',
  disabledBg: '#F5F4EC',
} as const;

export type ColorKey = keyof typeof Colors;
