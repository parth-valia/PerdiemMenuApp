import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
}

const MenuSearchBar: React.FC<Props> = ({ value, onChange, onClear }) => (
  <View style={styles.searchBar}>
    <Text style={styles.searchIcon}>🔍</Text>
    <TextInput
      style={styles.searchInput}
      placeholder="Search menu…"
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
      clearButtonMode="never"
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={styles.searchClear}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 9,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  searchIcon: { fontSize: 14, color: Colors.textTertiary },
  searchInput: {
    ...Typography.body,
    flex: 1,
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  searchClear: {
    fontSize: 16,
    color: Colors.textTertiary,
    paddingHorizontal: 2,
  },
});

export default MenuSearchBar;
