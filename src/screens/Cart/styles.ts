import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },
  listContent: {
    padding: Spacing.base,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
});
