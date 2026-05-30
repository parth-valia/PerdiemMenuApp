import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/theme';
import type { Location } from '@/types';

interface Props {
  location: Location;
  isSelected: boolean;
  onPress: () => void;
}

const LocationCard: React.FC<Props> = ({ location, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
        <Text style={styles.icon}>📍</Text>
      </View>

      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {location.name}
        </Text>
        {location.address ? (
          <Text style={styles.address} numberOfLines={1}>
            {location.address}
          </Text>
        ) : null}
      </View>

      {isSelected ? (
        <View style={styles.check}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      ) : (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    shadowColor: Colors.shadowMd,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 2,
  },
  cardSelected: {
    borderColor: Colors.borderAmber,
    backgroundColor: Colors.glassAmber,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    backgroundColor: Colors.glassElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrapSelected: {
    backgroundColor: Colors.glassAmberStrong,
    borderColor: Colors.borderAmber,
  },
  icon: { fontSize: 20 },
  text: { flex: 1 },
  name: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  address: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  checkMark: {
    color: Colors.textOnAmber,
    fontSize: 14,
    fontWeight: '700',
  },
  arrow: {
    color: Colors.textTertiary,
    fontSize: 22,
    fontWeight: '300',
  },
});

export default LocationCard;
