import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { updateQuantity, clearCart } from '@/store/slices/cartSlice';
import {
  selectCartSubtotalFormatted,
  selectCartItemCount,
} from '@/store/selectors';
import { CartHeader, CartItemRow, CartSummary } from '@/components/cart';
import { EmptyState } from '@/components/common';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(s => s.cart.items);
  const subtotal = useAppSelector(selectCartSubtotalFormatted);
  const itemCount = useAppSelector(selectCartItemCount);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CartHeader
          itemCount={0}
          onBack={() => navigation.goBack()}
          onClear={() => dispatch(clearCart())}
        />
        <EmptyState
          emoji="🛒"
          title="Your order is empty"
          subtitle="Browse the menu and add some items"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CartHeader
        itemCount={itemCount}
        onBack={() => navigation.goBack()}
        onClear={() => dispatch(clearCart())}
      />

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrement={() =>
              dispatch(
                updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
              )
            }
            onDecrement={() =>
              dispatch(
                updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
              )
            }
          />
        )}
      />

      <CartSummary subtotal={subtotal} onCheckout={() => {}} />
    </SafeAreaView>
  );
};

export default CartScreen;
