import Button from '@/components/onboarding/button';
import { Input } from '@/components/ui/input';
import useSaveNote from '@/features/notes/hooks/useSaveNote';
import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { ChevronRight, Info, Loader2, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SetFreinds() {
    const [input, setInput] = useState('');
    const { addFriendEmail, friendEmails, setFriendEmails } = useNoteEditor();
    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <View className="flex-1 justify-center">
                <Text className="font-robotoMedium mb-2 text-lg text-neutral-600">Partagez vos notes avec vos amis(es) en ajoutant leurs emails. </Text>

                <View className="">
                    <Text className="mb-2 font-medium text-xl text-slate-800">Email : </Text>
                    <Input
                        placeholder="Email de l'ami(e)"
                        value={input}
                        icon="mail"
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setInput(value);
                        }}
                        error={{ message: '', type: '' }}
                    />
                </View>
                <View className="my-3 flex-row items-center gap-2">
                    <Info size={18} strokeWidth={1.5} color="#737373" />
                    <Text className="font-regular text-lg text-neutral-500">{'NB: Taper sur "Ajouter" pour ajouter un ami(e)'}</Text>
                </View>
                <Button
                    disabled={input.length < 6}
                    title="Ajouter"
                    onPress={() => {
                        if (input) {
                            addFriendEmail(input);
                            setInput('');
                        }
                    }}
                    className="mt-3"
                />
                <ScrollView className="mt-4 flex-1">
                    <View className="gap-3 ">
                        {friendEmails
                            .sort((a, b) => a.localeCompare(b))
                            .map((email) => (
                                <View key={email} className="flex-row items-center gap-4 rounded-3xl border border-neutral-300 p-3">
                                    <View className="flex-1 flex-row items-center gap-4">
                                        <View className="size-14 items-center justify-center rounded-full bg-teal-600">
                                            <Text className="text-center font-RobotoMedium text-2xl text-teal-50">{email.charAt(0).toUpperCase()}</Text>
                                        </View>
                                        <View className="">
                                            <Text className="font-RobotoSemiBold text-2xl leading-6 text-neutral-600">{email}</Text>
                                            {/* <Text className="mt-1 text-lg leading-5 text-neutral-500">{user.email}</Text> */}
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            VibrationService.selectionChange();
                                            setFriendEmails(friendEmails.filter((e) => e !== email));
                                        }}
                                        className="_bg-red-400 size-12 items-center justify-center rounded-full bg-red-100/60">
                                        <Trash2 size={22} strokeWidth={2} color={'#dc2626'} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>
            <View className="gap-5 pb-10 pt-2"></View>
        </View>
    );
}

export const AddNoteFreindsScreenNextButton = () => {
    const { handleSubmit, isPending } = useSaveNote({ isEdit: false });
    function handlePress() {
        VibrationService.selectionChange();
        handleSubmit();
    }
    if (isPending) {
        return (
            <View className="px-4">
                <View className="animate-spin">
                    <Loader2 size={22} strokeWidth={2} color={'#0d9488'} />
                </View>
            </View>
        );
    }
    return (
        <Pressable onPress={handlePress} className={cn('flex-row items-center rounded-full py-2 pl-5')}>
            <Text className={cn('font-RobotoMedium text-xl text-teal-600')}>Enregistrer</Text>
            <ChevronRight size={22} strokeWidth={2} color={'#0d9488'} />
        </Pressable>
    );
};
