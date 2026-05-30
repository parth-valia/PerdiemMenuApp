import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartBadge } from '@/components/cart';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  locationName: string | undefined;
  onLocationPress: () => void;
  onCartPress: () => void;
}

const MenuHeader: React.FC<Props> = ({
  locationName,
  onLocationPress,
  onCartPress,
}) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={onLocationPress}
      style={styles.locationButton}
      activeOpacity={0.75}
    >
      <Text style={styles.locationIcon}>📍</Text>
      <Text style={styles.locationName} numberOfLines={1}>
        {locationName}
      </Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.cartButton}
      onPress={onCartPress}
      activeOpacity={0.85}
    >
      <Text style={styles.cartIcon}>🛒</Text>
      <CartBadge />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  locationIcon: { fontSize: 13 },
  locationName: {
    ...Typography.label,
    color: Colors.textPrimary,
    flex: 1,
  },
  chevron: {
    color: Colors.amber,
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 2,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowAmber,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  cartIcon: { fontSize: 20 },
});

export default MenuHeader;
