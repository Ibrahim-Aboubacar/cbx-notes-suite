import icon from '@/assets/images/logo.png';
import { cn } from '@/lib/utils';
import { Image, Text, View, ViewProps } from 'react-native';

type TAppIconProps = ViewProps & {
    withName?: boolean;
    ImageClassName?: string;
};

export default function AppIcon({ withName = true, ImageClassName, className, ...props }: TAppIconProps) {
    return (
        <View className={cn('flex-row items-center justify-center gap-2', className)} {...props}>
            <Image source={icon} className={cn('size-10', ImageClassName)} />
            {withName && <Text className="mt-1 text-4xl font-bold text-teal-600">CoNote</Text>}
        </View>
    );
}
