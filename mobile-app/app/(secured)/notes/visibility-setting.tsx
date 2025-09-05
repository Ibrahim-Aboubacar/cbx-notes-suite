import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

export default function VisibilitySetting() {
    const [pickerToShow, setPickerToShow] = useState<'date' | 'time' | null>(null);
    const { isPublic, toggleIsPublic, expirationDate, setExpirationDate } = useNoteEditor();
    const [date, time] = new Date(expirationDate).toISOString().split('T');
    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <View className="justify-center ">
                <Text className="font-robotoMedium mb-2 mt-2 text-lg text-neutral-600">Une visiblité publique permettra à tout le monde de voir votre note.</Text>
                <View className="flex-row items-center justify-between gap-4 rounded-2xl bg-teal-700/10 px-3 py-3">
                    <View className="flex-shrink">
                        <Text className="font-medium text-xl text-neutral-700">Visibilité Public</Text>
                        <Text className="font-medium_ line-clamp-3 text-sm text-neutral-500">{"Votre note sera visible dans l'onglet Explore avec votre pseudo et sa date de création."}</Text>
                    </View>
                    <View className="">
                        <Switch trackColor={{ false: '#ccc', true: '#0d9488' }} value={isPublic} onValueChange={toggleIsPublic} />
                    </View>
                </View>
                <View className={cn('mt-4 rounded-2xl bg-neutral-700/10 px-3 py-3 opacity-50', isPublic && 'bg-teal-700/10 opacity-100')}>
                    <Text className="font-medium text-xl text-neutral-700">{"Date d'expiration de la visiblité"}</Text>
                    <Text className="font-medium_ line-clamp-3 text-sm text-neutral-500">{"Ajouter une date d'expiration de la note"}</Text>
                    <View className="mt-2 flex-row items-center justify-between gap-4">
                        <View className="flex-1">
                            <Text className="mb-1">Date :</Text>
                            <Pressable
                                onPress={() => {
                                    setPickerToShow('date');
                                }}
                                className="flex-row items-center justify-between rounded-xl bg-teal-50 p-3">
                                <Text>{date}</Text>
                                <ChevronDown size={18} />
                            </Pressable>
                        </View>
                        <View className="w-[35%]">
                            <Text className="mb-1">Heure :</Text>
                            <Pressable
                                onPress={() => {
                                    setPickerToShow('time');
                                }}
                                className="flex-row items-center justify-between rounded-xl bg-teal-50 p-3">
                                <Text>{time.slice(0, 5)}</Text>
                                <ChevronDown size={18} />
                            </Pressable>
                        </View>
                    </View>
                    <Text className="mt-3 line-clamp-3 text-sm text-neutral-500">
                        {'Une fois la date d\'expiration atteinte, votre note ne sera plus affichée publiquement dans l\'onglet "Explore".'}
                    </Text>
                </View>
            </View>
            {pickerToShow === 'date' && (
                <DateTimePicker
                    value={new Date(expirationDate)}
                    accentColor="#0d9488"
                    minimumDate={new Date()}
                    mode="date" // ⬅️ "date" pour calendrier
                    display="spinner"
                    onChange={(e) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const [_, oldTime] = new Date(expirationDate).toISOString().split('T');
                        const [date] = new Date(e.nativeEvent.timestamp).toISOString().split('T');
                        setExpirationDate(new Date(date + 'T' + oldTime));
                        setPickerToShow(null);
                    }}
                />
            )}
            {pickerToShow === 'time' && (
                <DateTimePicker
                    value={new Date(expirationDate)}
                    accentColor="#0d9488"
                    minimumDate={new Date()}
                    mode="time" // ⬅️ "date" pour calendrier
                    display="spinner"
                    onChange={(e) => {
                        const [oldDate] = new Date(expirationDate).toISOString().split('T');
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const [_, time] = new Date(e.nativeEvent.timestamp).toISOString().split('T');

                        setExpirationDate(new Date(oldDate + 'T' + time));
                        setPickerToShow(null);
                    }}
                />
            )}
            <View className="gap-5 pb-20 pt-2"></View>
        </View>
    );
}

export const AddNoteVisibilitySettingScreenNextButton = () => {
    const { push } = useRouter();

    function handlePress() {
        VibrationService.selectionChange();
        push({
            pathname: '/(secured)/notes/set-freinds',
        });
    }
    return (
        <Pressable onPress={handlePress} className={cn('flex-row items-center rounded-full py-2 pl-5')}>
            <Text className={cn('font-RobotoMedium text-xl text-teal-600')}>Suivant</Text>
            <ChevronRight size={22} strokeWidth={2} color={'#0d9488'} />
        </Pressable>
    );
};
