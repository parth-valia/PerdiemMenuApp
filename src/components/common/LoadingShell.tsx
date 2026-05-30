import React, { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { View, Animated, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/theme';

// ─── Animated skeleton block ──────────────────────────────────────────────────

interface SkeletonBlockProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width,
  height,
  borderRadius = Radius.md,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.2, duration: 750, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ width, height, borderRadius, backgroundColor: Colors.surface3, opacity }, style]}
    />
  );
};

// ─── Header skeleton — mirrors the pinned header row ─────────────────────────

const HeaderSkeleton: React.FC = () => (
  <View style={styles.header}>
    {/* Location pill */}
    <View style={styles.locationPill}>
      <SkeletonBlock width={14} height={14} borderRadius={7} />
      <SkeletonBlock width="55%" height={13} borderRadius={6} />
    </View>
    {/* Cart button */}
    <SkeletonBlock width={44} height={44} borderRadius={Radius.full} />
  </View>
);

// ─── Card skeleton — mirrors MenuCard exactly ─────────────────────────────────

const CardSkeleton: React.FC = () => (
  <View style={styles.card}>
    {/* Image area */}
    <View style={styles.imageArea}>
      <SkeletonBlock width="100%" height={176} borderRadius={0} />
      {/* Price chip top-right */}
      <View style={styles.priceChip}>
        <SkeletonBlock width={72} height={28} borderRadius={Radius.full} />
      </View>
    </View>

    {/* Content area */}
    <View style={styles.cardContent}>
      {/* Item name */}
      <SkeletonBlock width="65%" height={16} style={styles.mb6} />
      {/* Description line 1 */}
      <SkeletonBlock width="92%" height={13} style={styles.mb4} />
      {/* Description line 2 */}
      <SkeletonBlock width="72%" height={13} style={styles.mb10} />
      {/* Customizable badge */}
      <SkeletonBlock width={110} height={26} borderRadius={Radius.full} />
    </View>
  </View>
);

// ─── Full loading shell ───────────────────────────────────────────────────────

const LoadingShell: React.FC = () => (
  <View style={styles.container}>
    <HeaderSkeleton />

    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      scrollEnabled={false}
    >
      {/* Section title */}
      <View style={styles.sectionHeader}>
        <SkeletonBlock width="42%" height={22} borderRadius={8} />
      </View>

      {/* Category pills */}
      <View style={styles.pillsRow}>
        {[58, 80, 68, 56].map((w, i) => (
          <SkeletonBlock key={i} width={w} height={32} borderRadius={Radius.full} />
        ))}
      </View>

      {/* Menu cards */}
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </ScrollView>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Header mirrors styles.header in Menu/styles.ts
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  locationPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
    gap: Spacing.md,
  },

  // Section title
  sectionHeader: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },

  // Pills row
  pillsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  imageArea: {
    height: 176,
    backgroundColor: Colors.surface2,
  },
  priceChip: {
    position: 'absolute',
    top: Spacing.sm + 2,
    right: Spacing.sm + 2,
  },
  cardContent: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  mb4: { marginBottom: 4 },
  mb6: { marginBottom: 6 },
  mb10: { marginBottom: 10 },
});

export default LoadingShell;
