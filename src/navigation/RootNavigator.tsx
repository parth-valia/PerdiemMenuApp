import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationSwitcherScreen from '@/screens/LocationSwitcher';
import MenuScreen from '@/screens/Menu';
import ItemDetailScreen from '@/screens/ItemDetail';
import CartScreen from '@/screens/Cart';

export type RootStackParamList = {
  LocationSwitcher: undefined;
  Menu: undefined;
  ItemDetail: { itemId: string };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LocationSwitcher"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="LocationSwitcher"
          component={LocationSwitcherScreen}
        />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
