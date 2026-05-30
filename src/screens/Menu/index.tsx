import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetCatalogQuery } from '@/store/api/catalogApi';
import {
  setActiveCategory,
  setSearchQuery,
  clearSearch,
} from '@/store/slices/catalogSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { selectFilteredItems, selectCategories } from '@/store/selectors';
import {
  MenuCard,
  MenuHeader,
  MenuSearchBar,
  MenuFilterBar,
} from '@/components/menu';
import { LoadingShell, ErrorState, EmptyState } from '@/components/common';
import type { CatalogItem } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const ItemSeparator = () => <View style={styles.separator} />;

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(s => s.location.selectedLocation);
  const activeCategoryId = useAppSelector(s => s.catalog.activeCategoryId);
  const searchQuery = useAppSelector(s => s.catalog.searchQuery);
  const locationId = selectedLocation?.id ?? '';

  const { isLoading, error, refetch } = useGetCatalogQuery(locationId, {
    skip: !locationId,
  });

  const filteredItems = useAppSelector(selectFilteredItems);
  const categories = useAppSelector(selectCategories);

  const handleItemPress = useCallback(
    (item: CatalogItem) =>
      navigation.navigate('ItemDetail', { itemId: item.id }),
    [navigation],
  );

  const handleSelectAll = useCallback(
    () => dispatch(setActiveCategory(null)),
    [dispatch],
  );

  // Use a thunk to read current store value at tap-time — eliminates any
  // stale-closure risk entirely since we never close over activeCategoryId.
  const handleSelectCategory = useCallback(
    (id: string) =>
      dispatch((_, getState) => {
        const current = getState().catalog.activeCategoryId;
        dispatch(setActiveCategory(current === id ? null : id));
      }),
    [dispatch],
  );

  if (!locationId) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState
          emoji="📍"
          title="No location selected"
          subtitle="Pick a location to browse the menu"
        />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingShell />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          title="Couldn't load the menu"
          message="The menu failed to load. Check your connection and try again."
          onRetry={refetch}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <MenuHeader
        locationName={selectedLocation?.name}
        onLocationPress={() => navigation.navigate('LocationSwitcher')}
        onCartPress={() => navigation.navigate('Cart')}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <MenuSearchBar
              value={searchQuery}
              onChange={text => dispatch(setSearchQuery(text))}
              onClear={() => dispatch(clearSearch())}
            />
            <MenuFilterBar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectAll={handleSelectAll}
              onSelectCategory={handleSelectCategory}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🍽️"
            title="Nothing here yet"
            subtitle={
              activeCategoryId
                ? 'No items in this category'
                : 'No items at this location'
            }
          />
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MenuCard item={item} onPress={() => handleItemPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;
