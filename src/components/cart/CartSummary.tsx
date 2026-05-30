import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  subtotal: string;
  onCheckout: () => void;
}

const CartSummary: React.FC<Props> = ({ subtotal, onCheckout }) => (
  <View style={styles.summary}>
    <View style={styles.row}>
      <Text style={styles.label}>Subtotal</Text>
      <Text style={styles.value}>{subtotal}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.labelMuted}>Tax & fees</Text>
      <Text style={styles.valueMuted}>Calculated at checkout</Text>
    </View>

    <TouchableOpacity
      style={styles.checkoutButton}
      onPress={onCheckout}
      activeOpacity={0.85}
    >
      <Text style={styles.checkoutText}>Proceed to Checkout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { ...Typography.label, color: Colors.textPrimary },
  value: { ...Typography.price, color: Colors.textPrimary },
  labelMuted: { ...Typography.body, color: Colors.textSecondary },
  valueMuted: { ...Typography.body, color: Colors.textTertiary },
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
  checkoutText: { ...Typography.h4, color: Colors.textOnAmber },
  checkoutSubtext: { ...Typography.caption, color: 'rgba(12,4,0,0.60)' },
});

export default CartSummary;
