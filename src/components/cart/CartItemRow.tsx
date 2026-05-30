import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ItemImage } from '@/components/common';
import { formatCents } from '@/utils/currency';
import { Colors, Typography, Spacing, Radius } from '@/theme';
import type { CartItem } from '@/types';

interface Props {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CartItemRow: React.FC<Props> = ({ item, onIncrement, onDecrement }) => {
  const modifierTotal = item.selectedModifiers.reduce(
    (s, m) => s + (m.price?.amount ?? 0),
    0,
  );
  const lineTotalCents = (item.price.amount + modifierTotal) * item.quantity;
  const lineTotal = formatCents(lineTotalCents, item.price.currency);

  return (
    <View style={styles.row}>
      <ItemImage
        uri={item.imageUrl}
        containerStyle={styles.image}
        placeholderEmojiSize={24}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        {item.variationName !== 'Regular' && (
          <Text style={styles.variation}>{item.variationName}</Text>
        )}
        {item.selectedModifiers.map(m => (
          <Text key={m.modifierId} style={styles.modifier}>
            + {m.name}
            {m.price ? ` (${m.price.formatted})` : ''}
          </Text>
        ))}
        <Text style={styles.price}>{lineTotal}</Text>
      </View>

      <View style={styles.qtyControls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={onDecrement}
          activeOpacity={0.7}
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.qtyBtn, styles.qtyBtnAdd]}
          onPress={onIncrement}
          activeOpacity={0.7}
        >
          <Text style={[styles.qtyBtnText, styles.qtyBtnAddText]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Row — Stitch glass panel card
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 2,
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface2,
  },
  info: { flex: 1 },
  name: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  variation: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  modifier: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  price: {
    ...Typography.price,
    color: Colors.amber,
    marginTop: Spacing.xs,
  },

  // Quantity controls
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderMid,
  },
  qtyBtnAdd: {
    backgroundColor: Colors.amber,
    borderColor: Colors.amber,
  },
  qtyBtnText: {
    ...Typography.h4,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  qtyBtnAddText: {
    color: Colors.textOnAmber,
  },
  qtyValue: {
    ...Typography.label,
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartItemRow;
