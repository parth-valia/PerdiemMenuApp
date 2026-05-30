import React, { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { View, Animated, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/theme';

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
  const opacity = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.55,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.25,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.surface3,
          opacity,
        },
        style,
      ]}
    />
  );
};

const MenuCardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <SkeletonBlock width="100%" height={176} borderRadius={0} />
    <View style={styles.cardContent}>
      <SkeletonBlock width="72%" height={16} style={styles.mb8} />
      <SkeletonBlock width="90%" height={13} style={styles.mb4} />
      <SkeletonBlock width="58%" height={13} />
    </View>
  </View>
);

const LoadingShell: React.FC = () => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    scrollEnabled={false}
  >
    <View style={styles.pills}>
      {[80, 100, 72, 96, 84].map((w, i) => (
        <SkeletonBlock key={i} width={w} height={38} borderRadius={Radius.full} />
      ))}
    </View>
    <MenuCardSkeleton />
    <MenuCardSkeleton />
    <MenuCardSkeleton />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: Spacing.base, gap: Spacing.md },
  pills: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardContent: {
    padding: Spacing.base,
    gap: 0,
  },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: Spacing.sm },
});

export default LoadingShell;
