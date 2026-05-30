import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetLocationsQuery } from '@/store/api/locationsApi';
import { setSelectedLocation } from '@/store/slices/locationSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { LocationCard } from '@/components/location';
import { ErrorState } from '@/components/common';
import { Colors } from '@/theme';
import type { Location } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationSwitcher'>;

const ListSeparator: React.FC = () => <View style={styles.separator} />;

const LocationSwitcherScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const selectedLocationId = useAppSelector(s => s.location.selectedLocationId);
  const { data: locations, isLoading, error, refetch } = useGetLocationsQuery();

  const handleSelect = (location: Location) => {
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
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.amber} />
          <Text style={styles.loadingText}>Finding locations…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !locations) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.body}>
          <ErrorState
            title="Can't load locations"
            message="Check your connection and try again."
            onRetry={refetch}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandName}>PER DIEM</Text>
        </View>
        <Text style={styles.headerTitle}>Choose a Location</Text>
        <Text style={styles.headerSubtitle}>
          {locations.length} location{locations.length !== 1 ? 's' : ''}{' '}
          available
        </Text>
      </View>

      <View style={styles.body}>
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
      </View>
    </SafeAreaView>
  );
};

export default LocationSwitcherScreen;
