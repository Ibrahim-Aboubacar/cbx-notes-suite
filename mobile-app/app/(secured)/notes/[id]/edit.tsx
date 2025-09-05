import { useLocalSearchParams } from 'expo-router';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NoteEdit() {
    const { id } = useLocalSearchParams();
    return (
        <GestureHandlerRootView className="relative">
            <ScrollView
                //
                refreshControl={<RefreshControl refreshing={!true} onRefresh={() => {}} tintColor="#0d9488" />}
                className="px-6 pt-0 bg-teal-50">
                <View className="justify-center h-16">
                    <Text className="text-3xl font-bold">Modifier la note : [{id}]</Text>
                </View>
                <View className="gap-5 pt-2 pb-20"></View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}
