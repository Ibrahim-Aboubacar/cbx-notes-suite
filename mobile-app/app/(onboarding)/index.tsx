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
        <SafeAreaView className="relaive flex-1 bg-white">
            <View className="flex-1"></View>
            <View className="absolute -top-3 left-0 right-0 h-[65%]">
                <View className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-teal-600" />
                <Image source={OpenNoteIllustration} className="z-20 h-full w-full opacity-50" />
            </View>
            <View className="z-20 flex-1 items-center rounded-t-[2rem] bg-white p-6 pt-0">
                <View className="mt-6 flex items-center text-black">
                    <Text className="mb-2 rounded-2xl border border-teal-300 bg-teal-100 px-3 py-1 font-medium text-lg text-teal-600">{'Prenez des notes'}</Text>

                    <Text className="font-bold text-3xl text-black">
                        <Text className="text-teal-600">Collaborez</Text> & <Text className="text-teal-600">Synchronisez</Text>
                    </Text>
                    <Text className="font-bold text-3xl text-black">partout</Text>
                    <Text className="mt-4 text-center text-xl text-gray-600">
                        <Text className="">{"CoNote est l'application de gestion de notes collaborative, sécurisée et multi-plateforme. "}</Text>
                        <Text className="">{'Créez, organisez et partagez vos idées, en ligne ou hors ligne.'}</Text>
                    </Text>
                </View>
                <View className="mt-auto flex-row gap-4 pb-3 pt-10">
                    <Button
                        title={
                            <View className="flex-row items-center gap-3">
                                <Text className="text-xl font-semibold text-teal-50">Créer ma première note</Text>
                                <ArrowRight size={25} color="#f0fdfa" />
                            </View>
                        }
                        onPress={handlePress}
                        className="w-full"
                    />
                </View>
                <View className="mt-auto flex-row gap-4 pb-10">
                    <ButtonSecondary title="Se connecter" onPress={handlePress} className="w-full" />
                </View>
            </View>
        </SafeAreaView>
    );
}
