import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ItemImage, StatusBadge } from '@/components/common';
import { Colors, Typography, Spacing, Radius } from '@/theme';
import type { CatalogItem } from '@/types';

interface Props {
  item: CatalogItem;
  onPress: () => void;
}

const MenuCard: React.FC<Props> = ({ item, onPress }) => {
  const lowestPrice = item.variations.reduce(
    (min, v) => (v.price.amount < min.price.amount ? v : min),
    item.variations[0],
  );

  const isUnavailable = !item.availableNow;
  const isSoldOut =
    item.availableNow && item.variations.every(v => v.inStock === false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, isUnavailable && styles.cardUnavailable]}
    >
      {/* ── Food image ─────────────────────────────────────────────────── */}
      <View style={styles.imageContainer}>
        <ItemImage
          uri={item.imageUrl}
          containerStyle={styles.image}
          placeholderEmojiSize={52}
        />

        {/* Price chip overlaid on image — Stitch style amber glass pill */}
        {lowestPrice && (
          <View style={styles.priceChip}>
            <Text style={styles.priceChipText}>
              {item.variations.length > 1 ? 'from ' : ''}
              {lowestPrice.price.formatted}
            </Text>
          </View>
        )}

        {isUnavailable && (
          <View style={styles.badgeTopLeft}>
            <StatusBadge
              label={`⏰ ${item.availabilityReason ?? 'Not available now'}`}
              variant="warning"
            />
          </View>
        )}

        {isSoldOut && (
          <View style={styles.badgeTopLeft}>
            <StatusBadge label="Sold out" variant="error" />
          </View>
        )}
      </View>

      {/* ── Glass content panel — Stitch frosted card bottom ───────────── */}
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
        </View>

        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}

        {item.modifierLists.length > 0 && (
          <View style={styles.customizablePill}>
            <Text style={styles.customizableText}>Customizable</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Card — Stitch: glass-panel rounded-xl with warm soft shadow
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardUnavailable: { opacity: 0.55 },

  // Image area
  imageContainer: {
    height: 176,
    backgroundColor: Colors.surface2,
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },

  // Price chip — Stitch amber glass pill, top-right of image
  priceChip: {
    position: 'absolute',
    top: Spacing.sm + 2,
    right: Spacing.sm + 2,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  priceChipText: {
    ...Typography.price,
    color: Colors.amberDark,
  },

  badgeTopLeft: { position: 'absolute', top: Spacing.sm, left: Spacing.sm },

  // Content panel — white with subtle glass border
  content: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nameRow: { marginBottom: Spacing.xs },
  name: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  description: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  // Customizable pill — amber glass chip (Stitch chip/tag style)
  customizablePill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.amberBg,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    marginTop: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderAmber,
  },
  customizableText: {
    ...Typography.caption,
    color: Colors.amberDark,
    fontWeight: '600',
  },
});

export default MenuCard;
