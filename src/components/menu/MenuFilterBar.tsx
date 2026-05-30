import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CategoryPill from '@/components/menu/CategoryPill';
import { Colors, Spacing, Typography } from '@/theme';
import type { Category } from '@/types';

interface Props {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectAll: () => void;
  onSelectCategory: (id: string) => void;
}

const MenuFilterBar: React.FC<Props> = ({
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
        onPress={onSelectAll}
      />
      {categories.map(cat => (
        <CategoryPill
          key={cat.id}
          label={cat.name}
          isActive={activeCategoryId === cat.id}
          onPress={() => onSelectCategory(cat.id)}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  pillsScroll: {
    marginBottom: Spacing.md,
  },
  pillsContainer: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    gap: Spacing.sm,
    alignItems: 'center',
  },
});

export default MenuFilterBar;
