import AppIcon from '@/components/AppIcon';
import Button from '@/components/onboarding/button';
import { Input } from '@/components/ui/input';
import { getUserQueryOpions } from '@/features/auth/hooks/useUser';
import useLoginForm from '@/features/auth/login/LoginForm';
import useLogin from '@/features/auth/login/query/LoginQuery';
import useTokenStore from '@/features/auth/store/tokenStore';
import { cn } from '@/lib/utils';
import { ToastService } from '@/services/toastService/toastService';
import { VibrationService } from '@/services/VibrationService';
import { useAppStartupStore } from '@/store/AppStartupStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { version } from 'package.json';
import { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

export default function LoginScreen() {
    const { mutateAsync } = useLogin();
    const queryClient = useQueryClient();
    const { setData } = useTokenStore();

    const { setCompletedOnboarding } = useAppStartupStore();

    const [isPending, setIsPending] = useState(false);
    const {
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formSchema,
    } = useLoginForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    type formType = z.infer<typeof formSchema>;

    const { replace } = useRouter();

    const handleSubmitPress = (data: formType) => {
        VibrationService.softImpact();
        setIsPending(true);

        mutateAsync(data)
            .then((res) => {
                if (res.success && res.data?.accessToken && res.data?.user) {
                    VibrationService.success();

                    queryClient.prefetchQuery(getUserQueryOpions());
                    queryClient.setQueryData(getUserQueryOpions().queryKey, {
                        data: {
                            user: res.data.user,
                        },
                        success: true,
                        message: 'Connexion reussite!',
                    });
                    setData({
                        token: res.data.accessToken,
                        user: res.data.user,
                    });

                    setTimeout(() => {
                        ToastService.success({
                            title: 'Connexion reussite!',
                            description: 'Bon retour ' + res.data.user.pseudo,
                        });
                    }, 300);

                    setCompletedOnboarding(true);
                    replace('/(tabs)');
                } else {
                    VibrationService.error();
                    ToastService.error({
                        title: 'Une erreur est survenue',
                        description: res.message,
                    });
                }
            })
            .catch(() => {
                VibrationService.error();
                setError('email', { message: 'Email ou mot de passe incorrect' });
                setError('password', { message: 'Email ou mot de passe incorrect' });
                ToastService.error({
                    title: 'Une erreur est survenue',
                    description: 'Veuillez vérifier vos identifiants',
                });
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    const handleCreateAccountPress = () => {
        VibrationService.softImpact();
        replace('/(auth)/register');
    };

    return (
        <SafeAreaView className="flex-1 bg-teal-50 px-8">
            <ScrollView keyboardShouldPersistTaps="handled" className="flex-1">
                <View className="flex-1">
                    <View className="mt-6 items-center">
                        <AppIcon />
                        <Text className="mt-10 text-3xl font-semibold">Bienvenue sur CoNote</Text>
                        <Text className="mt-5 text-center text-2xl text-gray-500">
                            {/*  */}
                            Connectez-vous pour commencer
                        </Text>
                        <Text className="text-center text-2xl text-gray-500">
                            {/*  */}
                            votre expérience avec CoNote.
                        </Text>
                    </View>
                    <View className="mt-10">
                        <Text className="mb-2 font-medium text-xl text-slate-800">Email : </Text>
                        <Input
                            textContentType="emailAddress"
                            autoComplete="email"
                            keyboardType="email-address"
                            icon="mail"
                            placeholder="Votre address email"
                            value={watch('email')}
                            onChangeText={(value) => setValue('email', value)}
                            error={errors.email}
                        />
                    </View>
                    <View className="mt-5">
                        <Text className="mb-2 font-medium text-xl text-slate-800">Mot de passe : </Text>
                        <Input
                            textContentType="password"
                            autoComplete="password"
                            type="password"
                            icon="lock"
                            placeholder="Votre mot de passe"
                            value={watch('password')}
                            onChangeText={(value) => setValue('password', value)}
                            error={errors.password}
                        />
                    </View>
                    {/* <View className="flex-row items-center justify-end mt-3">
                        <Text className="text-md text-slate-500">Mot de passe oublié ?</Text>
                        <TouchableOpacity onPress={handleReinitialisePress} className="px-1 py-2">
                            <Text className="font-semibold text-teal-500 text-md">Reinitialiser</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View className="mt-8">
                        <Button title="Se connecter" isLoading={isPending} onPress={handleSubmit(handleSubmitPress)} />
                    </View>
                    <View className="mt-5 flex-row items-center justify-center">
                        <Text className="text-md text-slate-500">Vous n&apos;avez pas de compte ?</Text>
                        <TouchableOpacity onPress={handleCreateAccountPress} className="px-1 py-2">
                            <Text className="text-md font-semibold text-teal-500">Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View className={cn('mt-8 justify-end ', Platform.OS === 'android' && 'pb-10')}>
                <Text className="text-center text-gray-400">CoNote © {new Date().getFullYear()}</Text>
                <Text className="text-center text-gray-400">Tous droits reservés</Text>
                <Text className="text-center text-gray-400">
                    version <Text className="font-semibold text-teal-400">{version}</Text>
                </Text>
                <Text className="text-center text-gray-400">cisko.dev</Text>
            </View>
        </SafeAreaView>
    );
}
