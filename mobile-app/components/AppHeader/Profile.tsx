import useUser from '@/hooks/useUser';
import { VibrationService } from '@/services/VibrationService';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const router = useRouter();
    const { initials, user } = useUser();

    function handlePress() {
        VibrationService.selectionChange();
        router.push('/profile');
    }
    return (
        <TouchableOpacity onPress={handlePress} className="flex-row items-center gap-4">
            <View className="size-14 items-center justify-center rounded-[5rem] bg-teal-600">
                {initials ? <Text className="text-3xl font-semibold text-teal-50">{initials}</Text> : <Feather size={16} name="user" color="black" />}
            </View>
            <View>
                <Text className="text-lg font-medium leading-5">Salut !</Text>
                <Text className="text-2xl leading-6 font-RobotoBold">{user?.pseudo}</Text>
            </View>
        </TouchableOpacity>
    );
}
