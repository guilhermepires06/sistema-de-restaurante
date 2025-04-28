import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  centered?: boolean;
}

export default function Heading({
  level = 1,
  children,
  style,
  color,
  centered = false,
}: HeadingProps) {
  const getHeadingStyle = () => {
    switch (level) {
      case 1:
        return styles.h1;
      case 2:
        return styles.h2;
      case 3:
        return styles.h3;
      case 4:
        return styles.h4;
      case 5:
        return styles.h5;
      case 6:
        return styles.h6;
      default:
        return styles.h1;
    }
  };

  return (
    <Text
      style={[
        styles.heading,
        getHeadingStyle(),
        centered && styles.centered,
        color && { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: Colors.textDark,
    marginBottom: Sizes.spaceMedium,
  },
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontHuge,
    lineHeight: Sizes.fontHuge * 1.2,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: Sizes.fontXXLarge,
    lineHeight: Sizes.fontXXLarge * 1.2,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontXLarge,
    lineHeight: Sizes.fontXLarge * 1.2,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Sizes.fontLarge,
    lineHeight: Sizes.fontLarge * 1.2,
  },
  h5: {
    fontFamily: 'Poppins-Medium',
    fontSize: Sizes.fontRegular,
    lineHeight: Sizes.fontRegular * 1.2,
  },
  h6: {
    fontFamily: 'Poppins-Medium',
    fontSize: Sizes.fontMedium,
    lineHeight: Sizes.fontMedium * 1.2,
  },
  centered: {
    textAlign: 'center',
  },
});