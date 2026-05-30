// Plus Jakarta Sans — chosen by Google Stitch for the PerDiem design system
const fontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extrabold: 'PlusJakartaSans-ExtraBold',
};

export const Typography = {
  // Display
  // Display — Plus Jakarta Sans ExtraBold (Stitch headline style)
  displayLg: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800' as const,
    fontFamily: fontFamily.extrabold,
    letterSpacing: -0.5,
  },
  displayMd: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    letterSpacing: -0.3,
  },

  // Headings
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },
  h4: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },

  // Body
  bodyLg: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },
  bodySm: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },

  // Labels — Plus Jakarta Sans Medium/SemiBold
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.1,
  },
  labelSm: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },

  // Price — ExtraBold for impact (Stitch amber price chips)
  price: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    letterSpacing: -0.1,
  },
  priceLg: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800' as const,
    fontFamily: fontFamily.extrabold,
    letterSpacing: -0.3,
  },
} as const;
