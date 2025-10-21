
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  const activeIndex = tabs.findIndex((tab) => pathname.includes(tab.name));
  const indicatorPosition = useSharedValue(activeIndex >= 0 ? activeIndex : 0);

  React.useEffect(() => {
    const newIndex = tabs.findIndex((tab) => pathname.includes(tab.name));
    if (newIndex >= 0) {
      indicatorPosition.value = withSpring(newIndex, {
        damping: 20,
        stiffness: 90,
      });
    }
  }, [pathname, tabs, indicatorPosition]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    return {
      transform: [
        {
          translateX: interpolate(
            indicatorPosition.value,
            [0, tabs.length - 1],
            [0, tabWidth * (tabs.length - 1)]
          ),
        },
      ],
      width: tabWidth,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { width: containerWidth, borderRadius }]}>
        <BlurView
          intensity={80}
          tint={theme.dark ? 'dark' : 'light'}
          style={[styles.blurContainer, { borderRadius }]}
        >
          <View style={styles.tabBar}>
            <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
            {tabs.map((tab, index) => {
              const isActive = pathname.includes(tab.name);
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={styles.tab}
                  onPress={() => handleTabPress(tab.route)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? colors.primary : colors.text}
                  />
                  <Text
                    style={[
                      styles.label,
                      { color: isActive ? colors.primary : colors.text },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    position: 'relative',
    backgroundColor: Platform.OS === 'android' ? colors.card : 'transparent',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.accent + '40',
    borderRadius: 20,
    top: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
