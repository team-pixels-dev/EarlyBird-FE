import { Pressable, type ViewProps, GestureResponderEvent  } from 'react-native';
import { PropsWithChildren } from 'react';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type CustomAnimatedPressableProps = ViewProps & PropsWithChildren & {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

/** 버튼의 애니매이션을 커스텀 해놓은 컴포넌트 */
export function CustomAnimatedPressable({ style, children, onPress, disabled } : CustomAnimatedPressableProps) {
  const opacity = useSharedValue(1);
  const pressed = useSharedValue(false);

  const handlePressIn = () => {
    opacity.value = withSpring(0.4);
    pressed.value = true;
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
    pressed.value = false;
  };

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{scale : pressed.value ? 0.99 : 1}],
      transition: 2,
    }
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[{ opacity }, style, uas]}
      disabled = {disabled}
    >
      {children}
    </AnimatedPressable>
  );
};
