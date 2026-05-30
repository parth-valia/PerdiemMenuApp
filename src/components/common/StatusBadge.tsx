import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/theme';

type Variant = 'warning' | 'error';

interface Props {
  label: string;
  variant?: Variant;
}

const variantStyles: Record<
  Variant,
  { bg: string; border: string; text: string }
> = {
  warning: {
    bg: Colors.warningBg,
    border: Colors.warning,
    text: Colors.warning,
  },
  error: { bg: Colors.errorBg, border: Colors.error, text: Colors.error },
};

const StatusBadge: React.FC<Props> = ({ label, variant = 'warning' }) => {
  const v = variantStyles[variant];
  return (
    <View
      style={[styles.badge, { backgroundColor: v.bg, borderColor: v.border }]}
    >
      <Text style={[styles.text, { color: v.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: { ...Typography.caption, fontWeight: '600' },
});

export default StatusBadge;
