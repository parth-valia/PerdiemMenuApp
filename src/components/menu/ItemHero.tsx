import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ItemImage } from '@/components/common';
import { Colors, Spacing, Radius, Typography } from '@/theme';

interface Props {
  imageUrl?: string;
  availableNow: boolean;
  availabilityReason?: string;
  onBack: () => void;
}

const ItemHero: React.FC<Props> = ({
  imageUrl,
  availableNow,
  availabilityReason,
  onBack,
}) => (
  <View style={styles.heroContainer}>
    <ItemImage
      uri={imageUrl}
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
      onPress={onBack}
      activeOpacity={0.8}
    >
      <Text style={styles.backIcon}>←</Text>
    </TouchableOpacity>

    {!availableNow && (
      <View style={styles.unavailableOverlay}>
        <Text style={styles.unavailableEmoji}>⏰</Text>
        <Text style={styles.unavailableLabel}>
          {availabilityReason ?? 'Not available right now'}
        </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  heroContainer: { position: 'relative', height: 320 },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surface2,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.base,
    left: Spacing.base,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  backIcon: { color: Colors.textPrimary, fontSize: 20 },
  unavailableOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(12,4,0,0.80)',
    alignItems: 'center',
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderAmber,
  },
  unavailableEmoji: { fontSize: 18 },
  unavailableLabel: { ...Typography.label, color: Colors.warning },
});

export default ItemHero;
