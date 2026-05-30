import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/theme';
import type { ModifierList, Money } from '@/types';

interface Props {
  modifierList: ModifierList;
  selectedIds: string[];
  onToggle: (
    modifierId: string,
    modifierListId: string,
    name: string,
    price?: Money,
  ) => void;
}

const ModifierSection: React.FC<Props> = ({
  modifierList,
  selectedIds,
  onToggle,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{modifierList.name}</Text>
        <View style={styles.badgeWrapper}>
          <Text style={styles.sectionBadge}>
            {modifierList.selectionType === 'SINGLE' ? 'Choose 1' : 'Optional'}
          </Text>
        </View>
      </View>
      {modifierList.modifiers.map(mod => {
        const isSelected = selectedIds.includes(mod.id);
        return (
          <TouchableOpacity
            key={mod.id}
            style={[styles.optionRow, isSelected && styles.optionRowSelected]}
            onPress={() =>
              onToggle(mod.id, modifierList.id, mod.name, mod.price)
            }
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            >
              {isSelected && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
            <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
              {mod.name}
            </Text>
            {mod.price && (
              <Text style={[styles.optionPrice, isSelected && styles.optionPriceSelected]}>
                +{mod.price.formatted}
              </Text>
            )}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    letterSpacing: 0.1,
  },
  badgeWrapper: {
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionBadge: {
    ...Typography.caption,
    color: Colors.textTertiary,
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.borderMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.amber,
    borderColor: Colors.amber,
  },
  checkboxTick: {
    color: Colors.textOnAmber,
    fontSize: 12,
    fontWeight: '700',
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

export default ModifierSection;
