import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  uri?: string;
  containerStyle: StyleProp<ViewStyle>;
  placeholderEmojiSize?: number;
}

const ItemImage: React.FC<Props> = ({
  uri,
  containerStyle,
  placeholderEmojiSize = 40,
}) => {
  return (
    <View style={[styles.base, containerStyle]}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={[styles.emoji, { fontSize: placeholderEmojiSize }]}>
          🍽️
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  emoji: {},
});

export default ItemImage;
