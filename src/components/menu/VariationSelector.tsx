import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/theme';
import type { ItemVariation } from '@/types';

interface Props {
  variations: ItemVariation[];
  selectedId: string;
  onSelect: (v: ItemVariation) => void;
}

const VariationSelector: React.FC<Props> = ({
  variations,
  selectedId,
  onSelect,
}) => {
  if (variations.length <= 1) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Size</Text>
      {variations.map(v => {
        const isSelected = selectedId === v.id;
        return (
          <TouchableOpacity
            key={v.id}
            style={[styles.optionRow, isSelected && styles.optionRowSelected]}
            onPress={() => onSelect(v)}
            activeOpacity={0.7}
          >
            <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
              {v.name}
            </Text>
            <Text style={[styles.optionPrice, isSelected && styles.optionPriceSelected]}>
              {v.price.formatted}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    letterSpacing: 0.1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xs,
    gap: Spacing.md,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionRowSelected: {
    borderColor: Colors.borderAmber,
    backgroundColor: Colors.glassAmber,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.borderMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: Colors.amber,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.amber,
  },
  optionName: {
    ...Typography.body,
    color: Colors.textSecondary,
    flex: 1,
  },
  optionNameSelected: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  optionPrice: {
    ...Typography.label,
    color: Colors.textTertiary,
  },
  optionPriceSelected: {
    color: Colors.amber,
  },
});

export default VariationSelector;
