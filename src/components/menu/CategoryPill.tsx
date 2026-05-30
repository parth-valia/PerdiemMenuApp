import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '@/theme';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const CategoryPill: React.FC<Props> = ({ label, isActive, onPress }) => {
  if (isActive) {
    return (
      <TouchableOpacity
        style={styles.activePill}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.labelActive}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.pill, styles.pillInactive]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activePill: {
    borderRadius: Radius.full,
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingHorizontal: Spacing.lg,
  },
  pill: {
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  pillInactive: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  labelActive: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textOnAmber,
    letterSpacing: 0.2,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: 0.1,
  },
  labelUnavailable: {
    color: Colors.textTertiary,
  },
});

export default CategoryPill;
