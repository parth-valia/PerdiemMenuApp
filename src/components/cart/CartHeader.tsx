import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/theme';

interface Props {
  itemCount: number;
  onBack: () => void;
  onClear: () => void;
}

const CartHeader: React.FC<Props> = ({ itemCount, onBack, onClear }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Your Order ({itemCount})</Text>
    <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Text style={styles.clearText}>Clear</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
  backText: { ...Typography.label, color: Colors.amber },
  title: { ...Typography.h4, color: Colors.textPrimary },
  clearText: { ...Typography.label, color: Colors.error },
});

export default CartHeader;
