import { cn } from '@/lib/utils';
import { Feather } from '@expo/vector-icons';
import { ComponentProps, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TouchableOpacity, View, ViewProps } from 'react-native';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

type InputProps = {
    container?: ViewProps;
    type?: 'text' | 'password';
    icon?: FeatherIconName;
    containerClassName?: string;
    error?: FieldError;
} & TextInputProps;

function Input({ className, container, containerClassName, keyboardType = 'default', type = 'text', icon, error, style, ...props }: InputProps) {
    const [showPassword, setShowPassword] = useState(!(type === 'password'));

    const hasError = !!error?.message;

    return (
        <View
            className={cn('relative h-14 rounded-lg border border-neutral-200 bg-white px-5', icon && 'pl-12', type === 'password' && 'pr-12', hasError && 'border-red-500', containerClassName)}
            {...container}>
            {icon && (
                <View className="absolute z-10 items-center justify-center -translate-y-1/2 rounded-full  left-2 top-1/2 size-10">
                    <Feather name={icon} size={18} color={hasError ? '#ef4444' : '#222'} />
                </View>
            )}
            <TextInput
                className={cn(' black h-full text-xl leading-6 placeholder:text-slate-500', className || '')}
                style={[
                    {
                        color: '#222',
                    },
                    style,
                ]}
                {...props}
                cursorColor={'#f97316'}
                keyboardType={showPassword ? 'visible-password' : keyboardType}
                secureTextEntry={type === 'password' && !showPassword}
            />
            {type === 'password' && (
                <TouchableOpacity
                    className="absolute z-10 items-center justify-center -translate-y-1/2 rounded-full _bg-slate-200/60 right-2 top-1/2 size-10"
                    onPress={() => setShowPassword((prev) => !prev)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#555" />
                </TouchableOpacity>
            )}
            {hasError && <Text className="absolute left-0 right-0 top-full mt-[0.3rem] text-red-500">{error?.message}</Text>}
        </View>
    );
}

export { Input };
