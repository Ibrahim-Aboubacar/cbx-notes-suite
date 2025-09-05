import { Loader2 } from 'lucide-react-native';
import { memo } from 'react';
import { View } from 'react-native';

export const LoaderComponent = memo(() => {
    return (
        <View className="absolute inset-0 z-50 items-center justify-center bg-teal-50">
            <View className="animate-spin">
                <Loader2 size={24} color="#0d9488" />
            </View>
        </View>
    );
});
