import { memo } from 'react';
import { Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router'; // ou ton système de routing
// import ReactMarkdown from "react-native-markdown-display";
import useTokenStore from '@/features/auth/store/tokenStore';
import { cn } from '@/lib/utils'; // si tu as un utilitaire cn
import { CalendarRange, Earth, Ellipsis, Lock, TagIcon, UsersRound } from 'lucide-react-native';

export const NoteCard = memo(({ note, onOptionPress }: { note: TBasicNote; onOptionPress: (note: TBasicNote) => void }) => {
    const { user: authUser } = useTokenStore();
    const user: TUser = note.user;
    const isOwner = authUser?.id === note.user.id;

    return (
        <Pressable
            className="flex flex-col bg-white border min-h-64 rounded-3xl border-neutral-200"
            //
            style={{ padding: 16 }}>
            {/* <DeleteNoteAlert note={note} /> */}
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="items-center justify-center bg-teal-600 rounded-full size-9">
                            <Text className="font-medium text-teal-50">{user.pseudo.charAt(0).toUpperCase()}</Text>
                        </View>
                        <View className="flex flex-col leading-none">
                            <Text className="text-lg font-semibold leading-4">{isOwner ? 'Vous' : user.pseudo}</Text>
                            <Text className="leading-4 text-neutral-600">{user.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onOptionPress(note)} className="flex flex-col items-center justify-center leading-none border border-teal-500 rounded-lg size-9">
                        <Ellipsis size={20} color="#14b8a6" />
                    </TouchableOpacity>
                </View>

                {/* Titre */}
                <Text className="mt-4 text-2xl font-semibold text-teal-600">
                    <Link href={'/(tabs)'}>{note.title}</Link>
                </Text>

                {/* Contenu */}
                <View className="relative mt-5 opacity-55">
                    <ScrollView className="max-h-40">
                        {/* <ReactMarkdown> */}
                        <Text className="">{note.content}</Text>

                        {/* </ReactMarkdown> */}
                    </ScrollView>
                </View>
            </View>

            {/* Infos principales */}
            <View className={cn('min-h-18')}>
                <View className="flex-row items-center gap-2 mt-3">
                    {note.isPublic ? <Earth size={16} color="#737373" /> : <Lock size={16} color="#737373" />}
                    <Text className="text-lg font-medium text-neutral-500">{note.isPublic ? 'Note Publique' : 'Note Privée'}</Text>
                </View>

                <View className="flex-row items-center gap-1 mt-2">
                    <TagIcon size={16} color="#737373" />
                    <Text className="text-lg font-medium text-neutral-500">Tags:</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerClassName="w-full gap-4 mt-2">
                    <View className={cn(' flex-row items-center justify-center gap-2', note.tags.length > 0 && '')}>
                        {note.tags.length > 0 ? (
                            note.tags.slice(0, 3).map((tag) => (
                                <Text key={tag.id} className="shrink-0 rounded-full border border-teal-800/50 bg-teal-100/50 px-2 py-0.5 text-sm text-teal-950">
                                    {tag.name}
                                </Text>
                            ))
                        ) : (
                            <View className="flex items-center justify-center w-full h-6">
                                <Text className="text-sm text-neutral-500">Aucun tag</Text>
                            </View>
                        )}
                        {note.tags.length > 3 && <Text className="text-sm text-neutral-600">+ {note.tags.length - 3} plus</Text>}
                    </View>
                </ScrollView>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-between pt-2 mt-2 border-t border-neutral-200 text-neutral-400">
                <View className="flex-row items-center gap-2">
                    <View className="flex items-center justify-center rounded-full h-9 w-9 text-neutral-400">
                        <UsersRound strokeWidth={1.5} size={20} color="#a3a3a3" />
                    </View>
                    <View className="flex flex-col leading-none">
                        <Text className="text-sm text-neutral-500">Partagé avec</Text>
                        {isOwner ? (
                            <Text className="text-lg font-medium leading-5 text-neutral-500">{note?.sharedWithCount || 0} amis(es)</Text>
                        ) : (
                            <Text className={cn('-mb-3 font-medium text-3xl leading-6 text-neutral-500', Platform.OS === 'ios' ? 'leading-8' : '-mb-1')}>*****</Text>
                        )}
                    </View>
                </View>

                <View className="flex-row items-center gap-2">
                    <CalendarRange strokeWidth={1.5} size={20} color="#a3a3a3" />
                    <View className="flex flex-col leading-none">
                        <Text className="text-sm text-neutral-500">Créé le</Text>
                        <Text className="text-lg font-medium leading-5 text-neutral-500">{new Date(note.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
});
