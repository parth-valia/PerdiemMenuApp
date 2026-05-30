import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  locationCount: number;
}

const LocationSwitcherHeader: React.FC<Props> = ({ locationCount }) => (
  <View style={styles.header}>
    <View style={styles.brandRow}>
      <View style={styles.brandDot} />
      <Text style={styles.brandName}>PER DIEM</Text>
    </View>
    <Text style={styles.title}>Choose a Location</Text>
    <Text style={styles.subtitle}>
      {locationCount} location{locationCount !== 1 ? 's' : ''} available
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.amber,
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  brandName: {
    ...Typography.labelSm,
    color: Colors.amber,
    letterSpacing: 3,
    fontWeight: '700',
  },
  title: {
    ...Typography.displayMd,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textTertiary,
  },
});

export default LocationSwitcherHeader;
