import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar, ViewStyle, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface ContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  safeArea?: boolean;
  backgroundColor?: string;
}

export default function Container({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  safeArea = true,
  backgroundColor = Colors.bgGray,
}: ContainerProps) {
  const containerView = (
    <View style={[styles.container, { backgroundColor }, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      )}
    </View>
  );

  return safeArea ? (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="dark-content"
      />
      {containerView}
    </SafeAreaView>
  ) : (
    containerView
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: Sizes.spaceLarge,
    paddingBottom: Sizes.spaceXLarge,
    ...(Platform.OS === 'web' ? {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    } : {}),
  },
});