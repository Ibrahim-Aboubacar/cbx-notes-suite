import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import { Blend, Compass, House, Layers } from 'lucide-react-native';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-row justify-between rounded-t-[2rem] bg-white px-6 pt-3" style={[styles.tabBar, { paddingBottom: Platform.OS === 'android' ? insets.bottom + 25 : insets.bottom }]}>
            {state.routes.map((route, index) => {
                return <NavBarItem key={route.key} state={state} descriptors={descriptors} navigation={navigation} route={route} index={index} />;
            })}
        </View>
    );
}
type NavBarItemProps = {
    state: BottomTabBarProps['state'];
    descriptors: BottomTabBarProps['descriptors'];
    navigation: BottomTabBarProps['navigation'];
    route: NavigationRoute<ParamListBase, string>;
    index: number;
};

function NavBarItem({ state, descriptors, navigation, route, index }: NavBarItemProps) {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            VibrationService.selectionChange();
            navigation.navigate(route.name, route.params);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    return (
        <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="max-w-26 h-20 flex-1 items-center justify-center gap-1 rounded-[1.5rem]">
            <View
                className={cn('h-10 w-24 items-center justify-center', isFocused ? 'bg-teal-100/80' : '')}
                style={{
                    borderRadius: isFocused ? 22 : 0,
                }}>
                <TabBarIcon name={route.name} color={isFocused ? '#0f766e' : '#64748b'} />
            </View>
            <Text className={cn('text-[13px]', isFocused ? 'font-semibold text-teal-700' : 'text-slate-500')}>{label as string}</Text>
        </TouchableOpacity>
    );
}

const TabBarIcon = ({ name, color }: { name: string; color: string }) => {
    switch (name) {
        case 'index':
            return <House size={22} color={color} />;
        case 'explore':
            return <Compass size={22} color={color} />;
        case 'shared-with-me':
            return <Blend size={22} color={color} />;
        default:
            return <Layers size={22} color={color} />;
    }
};

const styles = StyleSheet.create({
    tabBar: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
});
