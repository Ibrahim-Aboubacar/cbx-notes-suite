import useUser from '@/features/auth/hooks/useUser';
import { cn } from '@/lib/utils';
import { CalendarRange, Earth, Lock, Tag, UserRound, UsersRound } from 'lucide-react-native';
import { memo } from 'react';
import { Text, View } from 'react-native';

export const NoteDetailsMetaData = memo(({ note }: { note: TDetailedNote }) => {
    const {
        data: { data },
    } = useUser();
    const isOwner = data?.user?.id === note.user.id;
    const hasExpired = !!(note.expirationDate && new Date(note.expirationDate) < new Date());

    return (
        <>
            <Text className="font-RobotoMedium text-3xl">{note.title}</Text>
            <View className="mt-4 flex-row items-center justify-between gap-2">
                {/* Auteur */}
                <View className="flex-row items-center gap-2">
                    <View className="size-8 flex-row items-center gap-2">
                        <UserRound size={28} className="size-8" color="#737373" strokeWidth={1.3} />
                    </View>
                    <View className="">
                        <Text className="mt-1 text-sm leading-4 text-neutral-500">Auteur</Text>
                        <Text className="font-RobotoMedium text-lg leading-5 text-neutral-600">{isOwner ? 'Vous' : note.user.pseudo}</Text>
                    </View>
                </View>
                {/* Partagé avec */}
                <View className="flex-row items-center gap-2">
                    <View className="size-8 flex-row items-center gap-2">
                        <UsersRound size={28} className="size-8" color="#737373" strokeWidth={1.3} />
                    </View>
                    <View className="">
                        <Text className="mt-1 text-sm leading-4 text-neutral-500">Partagé avec</Text>
                        <Text className="font-RobotoMedium text-lg leading-5 text-neutral-600">{note.sharedWith.length} amis(es)</Text>
                    </View>
                </View>
            </View>
            <View className="mt-2 flex-row items-center justify-between gap-2">
                {/* Visibilité */}
                <View className="flex-row items-center gap-2">
                    <View className="relative size-8 flex-row items-center gap-2">
                        {note.isPublic ? <Earth size={28} className="size-8" color="#737373" strokeWidth={1.3} /> : <Lock size={28} className="size-8" color="#737373" strokeWidth={1.3} />}
                        {note.isPublic && <View className={cn('absolute right-0 top-0 size-3 rounded-full border-2', hasExpired ? 'border-red-200 bg-red-500' : 'border-teal-200 bg-teal-500')}></View>}
                    </View>
                    <View className="">
                        <Text className="mt-1 text-sm leading-4 text-neutral-500">Visibilité</Text>
                        <Text className={cn('font-RobotoMedium text-lg leading-5 text-neutral-600', hasExpired ? 'text-red-600' : 'text-teal-600')}>{note.isPublic ? 'Publique' : 'Privée'}</Text>
                    </View>
                </View>
                {/* Créé le */}
                <View className="flex-row items-center gap-2">
                    <View className="size-8 flex-row items-center gap-2">
                        <CalendarRange size={28} className="size-8" color="#737373" strokeWidth={1.3} />
                    </View>
                    <View className="">
                        <Text className="mt-1 text-sm leading-4 text-neutral-500">Créé le</Text>
                        <Text className="font-RobotoMedium text-lg leading-5 text-neutral-600">{new Date(note.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
            <View className="mt-2">
                <View className="flex-row items-center gap-2">
                    <Tag size={20} className="size-8" color="#737373" strokeWidth={1.3} />

                    <Text className="font-RobotoMedium text-lg text-neutral-600">Tags ({note.tags.length}) : </Text>
                </View>
                <View className="mt-1 flex-row items-center gap-2">
                    {note.tags.slice(0, 3).map((tag) => (
                        <Text key={tag.id} className="rounded-full border border-teal-600 bg-teal-100 px-3 py-1 font-RobotoMedium text-sm text-teal-700">
                            {tag.name}
                        </Text>
                    ))}
                    {note.tags.length > 3 && <Text className="text-sm text-neutral-600">+ {note.tags.length - 3} plus</Text>}
                </View>
            </View>
        </>
    );
});
