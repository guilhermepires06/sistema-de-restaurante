import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Text, 
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

interface TextFieldProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: boolean | string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function TextField({
  label,
  helperText,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  helperTextStyle,
  leftIcon,
  rightIcon,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const errorMessage = typeof error === 'string' ? error : '';
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        (error) && styles.inputContainerError,
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholderTextColor={Colors.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {(helperText || errorMessage) && (
        <Text style={[
          styles.helperText,
          error && styles.errorText,
          helperTextStyle
        ]}>
          {errorMessage || helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spaceMedium,
    width: '100%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: Sizes.fontMedium,
    marginBottom: Sizes.spaceSmall,
    color: Colors.textDark,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Sizes.radiusMedium,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    minHeight: Sizes.inputHeight,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontRegular,
    color: Colors.textDark,
    paddingVertical: Sizes.spaceMedium,
    paddingHorizontal: Sizes.spaceMedium,
    height: Sizes.inputHeight,
  },
  inputWithLeftIcon: {
    paddingLeft: Sizes.spaceSmall,
  },
  inputWithRightIcon: {
    paddingRight: Sizes.spaceSmall,
  },
  leftIcon: {
    marginLeft: Sizes.spaceMedium,
  },
  rightIcon: {
    marginRight: Sizes.spaceMedium,
  },
  helperText: {
    fontFamily: 'Inter-Regular',
    fontSize: Sizes.fontSmall,
    marginTop: Sizes.spaceSmall,
    color: Colors.textLight,
  },
  errorText: {
    color: Colors.error,
  },
});