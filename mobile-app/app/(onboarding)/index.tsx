import OpenNoteIllustration from '@/assets/images/logo.png';
import Button, { ButtonSecondary } from '@/components/onboarding/button';
import { VibrationService } from '@/services/VibrationService';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingPage() {
    const { push } = useRouter();

    const handlePress = () => {
        VibrationService.softImpact();
        push('/(auth)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white relaive">
            <View className="flex-1"></View>
            <View className="absolute -top-6 left-0 right-0 h-[60%]">
                <View className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-teal-800/50" />
                <Image source={OpenNoteIllustration} className="w-full h-full" />
            </View>
            <View className="z-20 flex-1 items-center rounded-t-[2rem] bg-white p-6 pt-2">
                <View className="flex items-center mt-10 text-black">
                    <Text className="px-3 py-1 mb-2 text-lg font-medium text-teal-600 bg-teal-100 border border-teal-300 rounded-2xl">{'Prenez des notes'}</Text>

                    <Text className="text-4xl font-bold text-black">
                        <Text className="text-teal-600">Collaborez</Text> & <Text className="text-teal-600">Synchronisez</Text>
                    </Text>
                    <Text className="text-4xl font-bold text-black">partout</Text>
                    <Text className="mt-4 text-2xl text-center text-gray-600">
                        <Text className="">{"CoNote est l'application de gestion de notes collaborative, sécurisée et multi-plateforme. "}</Text>
                        <Text className="">{'Créez, organisez et partagez vos idées, en ligne ou hors ligne.'}</Text>
                    </Text>
                </View>
                <View className="flex-row gap-4 pt-10 pb-3 mt-auto">
                    <Button
                        title={
                            <View className="flex-row items-center gap-3">
                                <Text className="text-2xl font-bold text-teal-50">Créer ma première note</Text>
                                <ArrowRight size={25} color="#f0fdfa" />
                            </View>
                        }
                        onPress={handlePress}
                        className="w-full"
                    />
                </View>
                <View className="flex-row gap-4 pb-10 mt-auto">
                    <ButtonSecondary title="Se connecter" onPress={handlePress} className="w-full" />
                </View>
            </View>
        </SafeAreaView>
    );
}
