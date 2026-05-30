import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { updateQuantity, clearCart } from '@/store/slices/cartSlice';
import {
  selectCartSubtotalFormatted,
  selectCartItemCount,
} from '@/store/selectors';
import { CartItemRow } from '@/components/cart';
import { EmptyState } from '@/components/common';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartSeparator: React.FC = () => <View style={styles.separator} />;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(s => s.cart.items);
  const subtotal = useAppSelector(selectCartSubtotalFormatted);
  const itemCount = useAppSelector(selectCartItemCount);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Order</Text>
          <View style={styles.headerSpacer} />
        </View>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Order ({itemCount})</Text>
        <TouchableOpacity onPress={() => dispatch(clearCart())}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

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
        ItemSeparatorComponent={CartSeparator}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabelMuted}>Tax & fees</Text>
          <Text style={styles.summaryValueMuted}>Calculated at checkout</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.85}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Text style={styles.checkoutSubtext}>
            No payment required for demo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
