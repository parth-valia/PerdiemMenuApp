import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { addItem } from '@/store/slices/cartSlice';
import { selectItemById } from '@/store/selectors';
import { VariationSelector, ModifierSection } from '@/components/menu';
import { ItemImage } from '@/components/common';
import { formatCents } from '@/utils/currency';
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
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Item not found</Text>
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
        <View style={styles.heroContainer}>
          <ItemImage
            uri={item.imageUrl}
            containerStyle={styles.heroImage}
            placeholderEmojiSize={72}
          />
          <LinearGradient
            colors={['rgba(26,10,0,0.8)', 'transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.heroGradient}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {!item.availableNow && (
            <View style={styles.unavailableOverlay}>
              <Text style={styles.unavailableOverlayText}>⏰</Text>
              <Text style={styles.unavailableOverlayLabel}>
                {item.availabilityReason ?? 'Not available right now'}
              </Text>
            </View>
          )}
        </View>

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
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleAddToCart}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Add to order</Text>
            <Text style={styles.ctaPrice}>{totalFormatted}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ItemDetailScreen;
