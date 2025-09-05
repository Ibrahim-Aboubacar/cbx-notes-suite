import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { ChevronRight } from 'lucide-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type TouchableListItemProps = TouchableOpacityProps & {
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
    hasChevron?: boolean;
    title: string;
    containerClassName?: string;
    titleClassName?: string;
};
export default function TouchableListItem({ LeftIcon, RightIcon, title, className, hasChevron = true, containerClassName, onPress, titleClassName, ...props }: TouchableListItemProps) {
    return (
        <TouchableOpacity
            onPress={(e) => {
                VibrationService.softImpact();
                onPress?.(e);
            }}
            activeOpacity={0.5}
            className={cn('rounded-xl bg-slate-200/40 px-4 py-3', className)}
            {...props}>
            <View className={cn('flex-row items-center justify-between gap-2', containerClassName)}>
                <View className={cn('flex-row items-center gap-3')}>
                    {LeftIcon}
                    <Text className={cn('text-xl font-medium text-slate-800', titleClassName)}>{title}</Text>
                </View>
                {hasChevron && !RightIcon && <ChevronRight size={20} strokeWidth={1.5} color="#555" />}
                {RightIcon}
            </View>
        </TouchableOpacity>
    );
}
