import { memo } from 'react';
import { Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router'; // ou ton système de routing
// import ReactMarkdown from "react-native-markdown-display";
import useTokenStore from '@/features/auth/store/tokenStore';
import { cn } from '@/lib/utils'; // si tu as un utilitaire cn
import { CalendarRange, Earth, Ellipsis, Lock, TagIcon, UsersRound } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';

export const NoteCard = memo(({ note, onOptionPress }: { note: TBasicNote; onOptionPress: (note: TBasicNote) => void }) => {
    const { user: authUser } = useTokenStore();
    const user: TUser = note.user;
    const isOwner = authUser?.id === note.user.id;

    return (
        <Pressable
            className="flex min-h-64 flex-col rounded-3xl border border-neutral-200 bg-white"
            //
            style={{ padding: 16 }}>
            {/* <DeleteNoteAlert note={note} /> */}
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="size-9 items-center justify-center rounded-full bg-teal-600">
                            <Text className="font-medium text-teal-50">{user.pseudo.charAt(0).toUpperCase()}</Text>
                        </View>
                        <View className="flex flex-col leading-none">
                            <Text className="text-lg font-semibold leading-6">{isOwner ? 'Vous' : user.pseudo}</Text>
                            <Text className="leading-4 text-neutral-600">{user.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onOptionPress(note)} className="flex size-9 flex-col items-center justify-center rounded-lg border border-teal-500 leading-none">
                        <Ellipsis size={20} color="#14b8a6" />
                    </TouchableOpacity>
                </View>

                {/* Titre */}
                <Text className="mt-4 text-2xl font-semibold text-teal-600">
                    <Link href={{ pathname: '/(secured)/notes/[id]', params: { id: note.id as string } }}>{note.title}</Link>
                </Text>

                {/* Contenu */}
                <View className="relative mt-5 opacity-55">
                    <ScrollView className="max-h-40">
                        <Markdown>{note.content}</Markdown>
                    </ScrollView>
                </View>
            </View>

            {/* Infos principales */}
            <View className={cn('min-h-18')}>
                <View className="mt-3 flex-row items-center gap-2">
                    {note.isPublic ? <Earth size={16} color="#737373" /> : <Lock size={16} color="#737373" />}
                    <Text className="font-medium text-lg text-neutral-500">{note.isPublic ? 'Note Publique' : 'Note Privée'}</Text>
                </View>

                <View className="mt-2 flex-row items-center gap-1">
                    <TagIcon size={16} color="#737373" />
                    <Text className="font-medium text-lg text-neutral-500">Tags:</Text>
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
                            <View className="flex h-6 w-full items-center justify-center">
                                <Text className="text-sm text-neutral-500">Aucun tag</Text>
                            </View>
                        )}
                        {note.tags.length > 3 && <Text className="text-sm text-neutral-600">+ {note.tags.length - 3} plus</Text>}
                    </View>
                </ScrollView>
            </View>

            {/* Footer */}
            <View className="mt-2 flex-row items-center justify-between border-t border-neutral-200 pt-2 text-neutral-400">
                <View className="flex-row items-center gap-2">
                    <View className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400">
                        <UsersRound strokeWidth={1.5} size={26} color="#a3a3a3" />
                    </View>
                    <View className="flex flex-col leading-none">
                        <Text className="text-sm text-neutral-500">Partagé avec</Text>
                        {isOwner ? (
                            <Text className="font-medium text-lg leading-5 text-neutral-500">{note?.sharedWithCount || 0} amis(es)</Text>
                        ) : (
                            <Text className={cn('-mb-3 font-medium text-3xl leading-6 text-neutral-500', Platform.OS === 'ios' ? 'leading-8' : '-mb-1')}>*****</Text>
                        )}
                    </View>
                </View>

                <View className="flex-row items-center gap-2">
                    <CalendarRange strokeWidth={1.5} size={26} color="#a3a3a3" />
                    <View className="flex flex-col leading-none">
                        <Text className="text-sm text-neutral-500">Créé le</Text>
                        <Text className="font-medium text-lg leading-5 text-neutral-500">{new Date(note.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
});
