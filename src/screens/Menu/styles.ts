import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  separator: { height: Spacing.md },
});
