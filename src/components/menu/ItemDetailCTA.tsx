import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  totalFormatted: string;
  onAddToCart: () => void;
}

const ItemDetailCTA: React.FC<Props> = ({ totalFormatted, onAddToCart }) => (
  <View style={styles.ctaContainer}>
    <TouchableOpacity
      style={styles.ctaButton}
      onPress={onAddToCart}
      activeOpacity={0.85}
    >
      <Text style={styles.ctaText}>Add to order</Text>
      <Text style={styles.ctaPrice}>{totalFormatted}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaButton: {
    backgroundColor: Colors.amber,
    borderRadius: Radius.full,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadowAmber,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 8,
  },
  ctaText: { ...Typography.h4, color: Colors.textOnAmber },
  ctaPrice: {
    ...Typography.price,
    color: 'rgba(12,4,0,0.70)',
    fontWeight: '700',
  },
});

export default ItemDetailCTA;
