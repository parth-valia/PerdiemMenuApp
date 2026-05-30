import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  list: {
    padding: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  separator: { height: Spacing.sm },
});
