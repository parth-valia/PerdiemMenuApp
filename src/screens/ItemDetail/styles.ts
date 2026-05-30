import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },

  // Info panel — white card that slides over the hero image
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
});
