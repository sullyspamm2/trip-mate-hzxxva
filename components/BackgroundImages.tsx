
import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const TravelIcon = ({ emoji, style, iconStyle }: { emoji: string; style: any; iconStyle: any }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.05, { duration: 3000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      ),
      transform: [
        {
          translateY: withRepeat(
            withSequence(
              withTiming(-10, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
              withTiming(10, { duration: 4000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
          ),
        },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.icon, iconStyle, animatedStyle, style]}>
      {emoji}
    </Animated.Text>
  );
};

export default function BackgroundImages() {
  const icons = useMemo(() => [
    { emoji: '🧳', top: '10%', left: '5%', delay: 0 },
    { emoji: '🧭', top: '15%', right: '8%', delay: 500 },
    { emoji: '🎒', top: '25%', left: '10%', delay: 1000 },
    { emoji: '🗺️', top: '35%', right: '5%', delay: 1500 },
    { emoji: '✈️', top: '45%', left: '7%', delay: 2000 },
    { emoji: '🏔️', top: '55%', right: '10%', delay: 2500 },
    { emoji: '🌍', top: '65%', left: '8%', delay: 3000 },
    { emoji: '📸', top: '75%', right: '7%', delay: 3500 },
    { emoji: '🏕️', top: '85%', left: '6%', delay: 4000 },
  ], []);

  return (
    <View style={styles.container} pointerEvents="none">
      {icons.map((icon, index) => {
        return (
          <TravelIcon
            key={index}
            emoji={icon.emoji}
            iconStyle={{}}
            style={{
              position: 'absolute',
              top: icon.top,
              left: icon.left,
              right: icon.right,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 0,
  },
  icon: {
    fontSize: 48,
    opacity: 0.1,
  },
});
