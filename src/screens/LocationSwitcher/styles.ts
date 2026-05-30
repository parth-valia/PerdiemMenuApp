import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Radius } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  body: { flex: 1, backgroundColor: Colors.bg },

  // ── Loading / Error ──────────────────────────────────────────────────────
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
    gap: Spacing.md,
  },
  loadingText: { ...Typography.body, color: Colors.textSecondary },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['2xl'],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.amber,
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  brandName: {
    ...Typography.labelSm,
    color: Colors.amber,
    letterSpacing: 3,
    fontWeight: '700',
  },
  headerTitle: {
    ...Typography.displayMd,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textTertiary,
  },

  // ── List ─────────────────────────────────────────────────────────────────
  list: {
    padding: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  separator: { height: Spacing.sm },
});
