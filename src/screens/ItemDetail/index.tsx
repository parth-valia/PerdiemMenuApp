import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { addItem } from '@/store/slices/cartSlice';
import { selectItemById } from '@/store/selectors';
import {
  ItemHero,
  ItemDetailCTA,
  VariationSelector,
  ModifierSection,
} from '@/components/menu';
import { formatCents } from '@/utils/currency';
import { Colors, Typography } from '@/theme';
import type { ItemVariation, SelectedModifier, Money } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

const ItemDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { itemId } = route.params;

  const locationId = useAppSelector(s => s.location.selectedLocationId) ?? '';
  const locationName = useAppSelector(s => s.location.selectedLocation?.name);

  const itemSelector = useMemo(() => selectItemById(itemId), [itemId]);
  const item = useAppSelector(itemSelector);

  const [selectedVariation, setSelectedVariation] =
    useState<ItemVariation | null>(item?.variations[0] ?? null);
  const [selectedModifiers, setSelectedModifiers] = useState<
    SelectedModifier[]
  >([]);

  const handleModifierToggle = useCallback(
    (
      modifierId: string,
      modifierListId: string,
      name: string,
      price?: Money,
    ) => {
      setSelectedModifiers(prev => {
        const isSingle =
          item?.modifierLists.find(ml => ml.id === modifierListId)
            ?.selectionType === 'SINGLE';

        if (isSingle) {
          const withoutList = prev.filter(
            m => m.modifierListId !== modifierListId,
          );
          const alreadySelected = prev.find(
            m =>
              m.modifierId === modifierId &&
              m.modifierListId === modifierListId,
          );
          if (alreadySelected) return withoutList;
          return [...withoutList, { modifierListId, modifierId, name, price }];
        }

        const exists = prev.find(m => m.modifierId === modifierId);
        if (exists) return prev.filter(m => m.modifierId !== modifierId);
        return [...prev, { modifierListId, modifierId, name, price }];
      });
    },
    [item],
  );

  const handleAddToCart = useCallback(() => {
    if (!item || !selectedVariation) return;
    dispatch(
      addItem({
        itemId: item.id,
        variationId: selectedVariation.id,
        name: item.name,
        variationName: selectedVariation.name,
        price: selectedVariation.price,
        imageUrl: item.imageUrl,
        selectedModifiers,
        locationId,
      }),
    );
    navigation.goBack();
  }, [
    dispatch,
    item,
    selectedVariation,
    selectedModifiers,
    locationId,
    navigation,
  ]);

  const totalCents = selectedVariation
    ? selectedVariation.price.amount +
      selectedModifiers.reduce((sum, m) => sum + (m.price?.amount ?? 0), 0)
    : 0;

  const totalFormatted = formatCents(
    totalCents,
    selectedVariation?.price.currency ?? 'USD',
  );

  if (!item) {
    return (
      <View style={notFoundStyles.container}>
        <Text style={notFoundStyles.text}>Item not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        style={styles.container}
      >
        <ItemHero
          imageUrl={item.imageUrl}
          availableNow={item.availableNow}
          availabilityReason={item.availabilityReason}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              {selectedVariation && (
                <Text style={styles.basePrice}>
                  {selectedVariation.price.formatted}
                </Text>
              )}
            </View>
            {locationName && (
              <Text style={styles.locationTag}>📍 {locationName}</Text>
            )}
          </View>

          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}

          {item.variations.length > 1 && selectedVariation && (
            <VariationSelector
              variations={item.variations}
              selectedId={selectedVariation.id}
              onSelect={setSelectedVariation}
            />
          )}

          {item.modifierLists.map(ml => (
            <ModifierSection
              key={ml.id}
              modifierList={ml}
              selectedIds={selectedModifiers
                .filter(m => m.modifierListId === ml.id)
                .map(m => m.modifierId)}
              onToggle={handleModifierToggle}
            />
          ))}

          <View style={styles.ctaSpacer} />
        </View>
      </ScrollView>

      {item.availableNow && (
        <ItemDetailCTA
          totalFormatted={totalFormatted}
          onAddToCart={handleAddToCart}
        />
      )}
    </SafeAreaView>
  );
};

// Isolated not-found style — not part of the main screen layout
const notFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  text: { ...Typography.h3, color: Colors.textSecondary },
});

export default ItemDetailScreen;
