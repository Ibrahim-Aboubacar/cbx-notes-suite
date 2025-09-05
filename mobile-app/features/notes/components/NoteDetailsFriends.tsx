import { memo } from 'react';
import { Text, View } from 'react-native';

export const NoteDetailsFriends = memo(({ note }: { note: TDetailedNote }) => {
    return (
        <View className="mt-5 gap-6">
            {note.sharedWith.map((user) => (
                <View key={user.id} className="flex-row items-center gap-4 rounded-3xl border border-neutral-300 p-3">
                    <View className="size-14 items-center justify-center rounded-full bg-teal-600">
                        <Text className="text-center font-RobotoMedium text-2xl text-teal-50">{user.pseudo.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View className="">
                        <Text className="font-RobotoSemiBold text-2xl leading-6 text-neutral-600">{user.pseudo}</Text>
                        <Text className="mt-1 text-lg leading-5 text-neutral-500">{user.email}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
});
