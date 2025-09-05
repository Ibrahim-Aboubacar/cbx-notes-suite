import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

export default function Button({ title, className, isLoading, ...props }: TouchableOpacityProps & { title: string | ReactNode; isLoading?: boolean }) {
    return (
        <TouchableOpacity disabled={isLoading} className={cn('relative h-14 items-center justify-center rounded-2xl bg-teal-500 disabled:opacity-50', className)} {...props}>
            <Text className={cn('text-center font-bold text-2xl text-white', isLoading && 'text-transparent')}>{title}</Text>
            {isLoading && (
                <View className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <ActivityIndicator color="white" />
                </View>
            )}
        </TouchableOpacity>
    );
}

export function ButtonSecondary({ title, className, isLoading, ...props }: TouchableOpacityProps & { title: string | ReactNode; isLoading?: boolean }) {
    return (
        <TouchableOpacity disabled={isLoading} className={cn('relative h-14 items-center justify-center rounded-2xl border border-teal-500 disabled:opacity-50', className)} {...props}>
            <Text className={cn('text-center font-bold text-2xl text-teal-500 ', isLoading && 'text-transparent')}>{title}</Text>
            {isLoading && (
                <View className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <ActivityIndicator color="white" />
                </View>
            )}
        </TouchableOpacity>
    );
}
