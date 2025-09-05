import PageHeader from '@/components/AppHeader/PageHeader';
import useTokenStore from '@/features/auth/store/tokenStore';
import '@/global.css';
import { Provider } from '@/integrations/tanstack-query/root-provider';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
    const { user } = useTokenStore();

    const [loaded] = Font.useFonts({
        InterRegular: require('../assets/fonts/inter/Inter_18pt-Regular.ttf'),
        InterMedium: require('../assets/fonts/inter/Inter_18pt-Medium.ttf'),
        InterBold: require('../assets/fonts/inter/Inter_18pt-Bold.ttf'),
        InterSemiBold: require('../assets/fonts/inter/Inter_18pt-SemiBold.ttf'),
        // Roboto
        RobotoMedium: require('../assets/fonts/roboto/Roboto-Medium.ttf'),
        RobotoBold: require('../assets/fonts/roboto/Roboto-Bold.ttf'),
        RobotoSemiBold: require('../assets/fonts/roboto/Roboto-SemiBold.ttf'),
        RobotoBlack: require('../assets/fonts/roboto/Roboto-Black.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <Provider>
            <ThemeProvider
                value={{
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        primary: '#f97316',
                        background: '#f8fafc',
                    },
                    fonts: {
                        regular: {
                            fontFamily: 'InterRegular',
                            fontWeight: 'normal',
                        },
                        medium: {
                            fontFamily: 'InterMedium',
                            fontWeight: 'normal',
                        },
                        bold: {
                            fontFamily: 'InterBold',
                            fontWeight: 'normal',
                        },
                        heavy: {
                            fontFamily: 'InterSemiBold',
                            fontWeight: 'normal',
                        },
                    },
                }}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Protected guard={!!user}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(secured)" options={{ headerShown: false }} />
                    </Stack.Protected>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            headerShown: true,
                            headerBackVisible: true,
                            header(props) {
                                return <PageHeader {...props} />;
                            },
                            animation: 'simple_push',
                        }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </Provider>
    );
}
