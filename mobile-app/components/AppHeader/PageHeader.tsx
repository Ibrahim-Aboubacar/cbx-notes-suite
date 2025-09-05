import { VibrationService } from '@/services/VibrationService';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PageHeader({ options }: NativeStackHeaderProps) {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    function handleBack() {
        VibrationService.selectionChange();
        router.back();
    }
    return (
        <View className="flex-row items-center justify-between bg-teal-50" style={{ paddingTop: insets.top }}>
            <View className="flex-row items-center justify-between w-full h-20 px-6">
                <View className="flex-row items-center gap-3">
                    {options.headerBackVisible && (
                        <TouchableOpacity onPress={handleBack} className="items-center justify-center bg-white border border-teal-400 rounded-lg size-12">
                            <ArrowLeft size={22} strokeWidth={1.5} color="#14b8a6" />
                        </TouchableOpacity>
                    )}
                    <Text className="text-3xl font-RobotoBold text-slate-800">{options.title}</Text>
                </View>
                {options?.headerRight && options.headerRight({})}
            </View>
        </View>
    );
}
