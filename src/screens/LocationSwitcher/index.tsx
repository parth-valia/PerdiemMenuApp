import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetLocationsQuery } from '@/store/api/locationsApi';
import { setSelectedLocation } from '@/store/slices/locationSlice';
import { clearCart } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { LocationCard, LocationSwitcherHeader } from '@/components/location';
import { ErrorState, LoadingShell } from '@/components/common';
import type { Location } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationSwitcher'>;

const ListSeparator = () => <View style={styles.separator} />;

const LocationSwitcherScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const selectedLocationId = useAppSelector(s => s.location.selectedLocationId);
  const { data: locations, isLoading, error, refetch } = useGetLocationsQuery();

  const handleSelect = (location: Location) => {
    // Clear the cart whenever the location changes so items from the previous
    // location never persist into a different menu. This mirrors how DoorDash /
    // Uber Eats handle location switches.
    if (location.id !== selectedLocationId) {
      dispatch(clearCart());
    }
    dispatch(setSelectedLocation(location));
    // Go back if opened from the Menu header — otherwise navigate forward
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Menu');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingShell />
      </SafeAreaView>
    );
  }

  if (error || !locations) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          title="Can't load locations"
          message="Check your connection and try again."
          onRetry={refetch}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LocationSwitcherHeader locationCount={locations.length} />

      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            isSelected={item.id === selectedLocationId}
            onPress={() => handleSelect(item)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LocationSwitcherScreen;
