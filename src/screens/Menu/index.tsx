import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetCatalogQuery } from '@/store/api/catalogApi';
import { setActiveCategory } from '@/store/slices/catalogSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { selectFilteredItems, selectCategories } from '@/store/selectors';
import { MenuCard, CategoryPill } from '@/components/menu';
import { LoadingShell, ErrorState, EmptyState } from '@/components/common';
import { CartBadge } from '@/components/cart';
import type { CatalogItem } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

interface ListHeaderProps {
  itemCount: number;
  categories: { id: string; name: string; availableNow: boolean }[];
  activeCategoryId: string | null;
  onSelectAll: () => void;
  onSelectCategory: (id: string) => void;
}

const MenuListHeader: React.FC<ListHeaderProps> = ({
  categories,
  activeCategoryId,
  onSelectAll,
  onSelectCategory,
}) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Today's Menu</Text>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.pillsContainer}
      style={styles.pillsScroll}
    >
      <CategoryPill
        label="All"
        isActive={!activeCategoryId}
        isAvailable={true}
        onPress={onSelectAll}
      />
      {categories.map(cat => (
        <CategoryPill
          key={cat.id}
          label={cat.name}
          isActive={activeCategoryId === cat.id}
          isAvailable={cat.availableNow}
          onPress={() => onSelectCategory(cat.id)}
        />
      ))}
    </ScrollView>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

// ─── Screen ───────────────────────────────────────────────────────────────────

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(s => s.location.selectedLocation);
  const activeCategoryId = useAppSelector(s => s.catalog.activeCategoryId);

  const locationId = selectedLocation?.id ?? '';

  const { isLoading, error, refetch } = useGetCatalogQuery(locationId, {
    skip: !locationId,
  });

  const filteredItems = useAppSelector(selectFilteredItems);
  const categories = useAppSelector(selectCategories);
  const handleItemPress = useCallback(
    (item: CatalogItem) => {
      navigation.navigate('ItemDetail', { itemId: item.id });
    },
    [navigation],
  );

  const handleSelectAll = useCallback(
    () => dispatch(setActiveCategory(null)),
    [dispatch],
  );

  const handleSelectCategory = useCallback(
    (id: string) =>
      dispatch(setActiveCategory(activeCategoryId === id ? null : id)),
    [dispatch, activeCategoryId],
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
      {/* ── Pinned top header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LocationSwitcher')}
          style={styles.locationButton}
        >
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationName} numberOfLines={1}>
            {selectedLocation?.name}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          <CartBadge />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable list: [header + pills] + items ─────────────────── */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <MenuListHeader
            itemCount={filteredItems.length}
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelectAll={handleSelectAll}
            onSelectCategory={handleSelectCategory}
          />
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
