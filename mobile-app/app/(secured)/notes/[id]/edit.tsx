import { Input } from '@/components/ui/input';
import useNoteQuery from '@/features/notes/query/getNoteQuery';
import useNoteEditor from '@/features/notes/store/noteEditorStore';
import { useLocalSearchParams } from 'expo-router';
import { Info } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

export default function NoteEdit() {
    const { id } = useLocalSearchParams();
    const { setTitle, title, setFriendEmails, setId } = useNoteEditor();
    const { data } = useNoteQuery({ noteId: id as string });
    const hasAlreadyLoaded = useRef(false);

    useEffect(() => {
        if (data && !hasAlreadyLoaded.current) {
            setId(data.note.id);
            setFriendEmails(data.note.sharedWith.map((user) => user.email));
            hasAlreadyLoaded.current = true;
        }
    }, [data, setFriendEmails, setId]);
    return (
        <View className="relative flex-1 bg-teal-50 px-6 pt-0">
            <View className="justify-center ">
                <View className="">
                    <Text className="mb-2 font-medium text-xl text-slate-800">Titre : </Text>
                    <Input
                        placeholder="Titre de la note"
                        value={title}
                        onChangeText={(value) => {
                            setTitle(value);
                        }}
                        error={{ message: '', type: '' }}
                    />
                </View>
                {title.length <= 3 && (
                    <View className="mt-3 flex-row items-center gap-2">
                        <Info size={18} strokeWidth={1.5} color="#737373" />
                        <Text className="font-regular text-lg text-neutral-500">Entrez le titre de votre note pour continuer </Text>
                    </View>
                )}
            </View>
            <View className="gap-5 pb-20 pt-2"></View>
        </View>
    );
}
