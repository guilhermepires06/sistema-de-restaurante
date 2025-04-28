import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  elevated?: boolean;
  bordered?: boolean;
}

export default function Card({
  children,
  style,
  padded = true,
  elevated = true,
  bordered = false,
}: CardProps) {
  return (
    <View 
      style={[
        styles.card,
        padded && styles.padded,
        elevated && styles.elevated,
        bordered && styles.bordered,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Sizes.radiusMedium,
    overflow: 'hidden',
  },
  padded: {
    padding: Sizes.cardPadding,
  },
  elevated: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
});