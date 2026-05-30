import { StyleSheet } from 'react-native';
import { Radius, Spacing, Colors, Typography } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerSpacer: { width: 60 },
  backText: {
    ...Typography.label,
    color: Colors.amber,
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  clearText: {
    ...Typography.label,
    color: Colors.error,
  },

  // ── List ─────────────────────────────────────────────────────────────────
  listContent: {
    padding: Spacing.base,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  separator: { height: Spacing.xs },

  // ── Summary panel — glass card at bottom ─────────────────────────────────
  summary: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    ...Typography.label,
    color: Colors.textPrimary,
  },
  summaryValue: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
  summaryLabelMuted: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  summaryValueMuted: {
    ...Typography.body,
    color: Colors.textTertiary,
  },

  // ── Checkout button — Stitch amber primary button ─────────────────────────
  checkoutButton: {
    backgroundColor: Colors.amber,
    borderRadius: Radius.full,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 3,
    shadowColor: Colors.shadowAmber,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
  },
  checkoutText: {
    ...Typography.h4,
    color: Colors.textOnAmber,
  },
  checkoutSubtext: {
    ...Typography.caption,
    color: 'rgba(12,4,0,0.60)',
  },
});
