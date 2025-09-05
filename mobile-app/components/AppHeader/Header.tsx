import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
// import { StatusBar } from 'expo-status-bar';
import { VibrationService } from '@/services/VibrationService';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Profile from './Profile';

export default function Header({ options }: BottomTabHeaderProps) {
    const insets = useSafeAreaInsets();
    StatusBar.setBarStyle('dark-content');
    return (
        <View className="bg-teal-50" style={{ paddingTop: insets.top }}>
            <View className="flex-row items-center justify-between w-full h-20 px-6">
                <Profile />
                <AddNoteButton />
            </View>
        </View>
    );
}

function AddNoteButton() {
    const router = useRouter();
    function handlePress() {
        VibrationService.softImpact();
        router.push('/(secured)/notes/new');
    }
    return (
        <TouchableOpacity onPress={handlePress} className="relative size-12 items-center justify-center rounded-[0.5rem] border border-teal-600 bg-white">
            <Plus size={22} strokeWidth={1.5} color="#0d9488" />
        </TouchableOpacity>
    );
}
