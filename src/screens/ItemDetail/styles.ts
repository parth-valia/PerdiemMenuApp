import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },

  // ── Hero image ───────────────────────────────────────────────────────────
  heroContainer: { position: 'relative', height: 320 },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surface2,
  },

  // Soft gradient at bottom of hero to blend into content panel
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },

  // ── Back button — Stitch frosted glass circle ────────────────────────────
  backButton: {
    position: 'absolute',
    top: Spacing.base,
    left: Spacing.base,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  backIcon: { color: Colors.textPrimary, fontSize: 20 },

  // ── Unavailable overlay ──────────────────────────────────────────────────
  unavailableOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(12,4,0,0.80)',
    alignItems: 'center',
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderAmber,
  },
  unavailableOverlayText: { fontSize: 18 },
  unavailableOverlayLabel: { ...Typography.label, color: Colors.warning },

  // ── Info panel — white with rounded top corners (Stitch bottom sheet) ────
  infoContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius['2xl'],
    borderTopRightRadius: Radius['2xl'],
    marginTop: -Radius['2xl'],
    padding: Spacing.base,
    paddingTop: Spacing.lg + 4,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  infoHeader: { marginBottom: Spacing.md },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  itemName: {
    ...Typography.h1,
    color: Colors.textPrimary,
    flex: 1,
  },
  basePrice: {
    ...Typography.priceLg,
    color: Colors.amber,
  },
  locationTag: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  description: {
    ...Typography.bodyLg,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    lineHeight: 26,
  },
  ctaSpacer: { height: 100 },

  // ── CTA — amber gradient pill (Stitch primary button) ────────────────────
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaButton: {
    backgroundColor: Colors.amber,
    borderRadius: Radius.full,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadowAmber,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 8,
  },
  ctaText: {
    ...Typography.h4,
    color: Colors.textOnAmber,
  },
  ctaPrice: {
    ...Typography.price,
    color: 'rgba(12,4,0,0.70)',
    fontWeight: '700',
  },

  // ── Not found ────────────────────────────────────────────────────────────
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  notFoundText: { ...Typography.h3, color: Colors.textSecondary },
});
