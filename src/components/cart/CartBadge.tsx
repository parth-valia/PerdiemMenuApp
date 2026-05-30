import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/theme';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { selectCartItemCount } from '@/store/selectors';

const CartBadge: React.FC = () => {
  const count = useAppSelector(selectCartItemCount);
  const scale = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.4,
          useNativeDriver: true,
          speed: 40,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
        }),
      ]).start();
      prevCount.current = count;
    }
  }, [count, scale]);

  if (count === 0) return null;

  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }] }]}>
      <Text style={styles.count}>{count > 99 ? '99+' : count}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.amber,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  count: {
    ...Typography.caption,
    color: Colors.textOnAmber,
    fontWeight: '700',
  },
});

export default CartBadge;
