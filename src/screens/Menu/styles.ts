import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },

  // ── Header (pinned at top) ────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  locationIcon: { fontSize: 13 },
  locationName: {
    ...Typography.label,
    color: Colors.textPrimary,
    flex: 1,
  },
  chevron: {
    color: Colors.amber,
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 2,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowAmber,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  cartIcon: { fontSize: 20 },

  // ── Section title ─────────────────────────────────────────────────────────
  sectionHeader: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  sectionCount: {
    ...Typography.body,
    color: Colors.textTertiary,
  },

  // ── Category pills ────────────────────────────────────────────────────────
  pillsScroll: {
    marginBottom: Spacing.md,
  },
  pillsContainer: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    gap: Spacing.sm,
    alignItems: 'center',
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  separator: { height: Spacing.md },

  // ── Empty state wrapper (keeps header + pills + empty msg together) ────────
  emptyWrapper: { flex: 1 },
});
