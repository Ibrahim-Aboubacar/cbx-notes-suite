import AppIcon from '@/components/AppIcon';
import Button from '@/components/onboarding/button';
import { Input } from '@/components/ui/input';
import { getUserQueryOpions } from '@/features/auth/hooks/useUser';
import useRegister from '@/features/auth/register/query/RegisterQuery';
import useRegisterForm from '@/features/auth/register/RegisterForm';
import useTokenStore from '@/features/auth/store/tokenStore';
import { ToastService } from '@/services/toastService/toastService';
import { VibrationService } from '@/services/VibrationService';
import { useAppStartupStore } from '@/store/AppStartupStore';
import { Feather } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { version } from 'package.json';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

export default function RegisterScreen() {
    const { mutateAsync } = useRegister();
    const queryClient = useQueryClient();
    const { setData } = useTokenStore();

    const { setCompletedOnboarding } = useAppStartupStore();

    const [step, setStep] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formSchema,
    } = useRegisterForm({
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

        mutateAsync({
            username: data.pseudo,
            email: data.email,
            password: data.password,
        })
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
                ToastService.error({
                    title: 'Une erreur est survenue',
                    description: 'Veuillez vérifier vos identifiants',
                });
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    const handleLoginPress = () => {
        VibrationService.softImpact();
        replace('/(auth)');
    };

    useEffect(() => {
        checkErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    function checkErrors() {
        if (errors.pseudo?.message || errors.pseudo?.message) {
            setStep(1);
            VibrationService.error();
            return;
        }

        if (errors.email?.message) {
            setStep(2);
            VibrationService.error();
            return;
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-teal-50 px-8 pb-10">
            <ScrollView keyboardShouldPersistTaps="handled" className="flex-1">
                <View className="flex-1">
                    <View className="mt-6 items-center">
                        <AppIcon />
                        <Text className="mt-10 text-3xl font-semibold">Bienvenue sur CoNote</Text>
                        <Text className="mt-5 text-center text-2xl text-gray-500">Connectez-vous pour commencer</Text>
                        <Text className="text-center text-2xl text-gray-500">votre expérience avec CoNote.</Text>
                        <Text className="mt-8 text-center text-2xl font-semibold text-slate-900">
                            {step === 1 && 'Saisissez votre pseudonyme'}
                            {step === 2 && 'Saisissez votre email'}
                            {step === 3 && 'Saisissez votre mot de passe'}
                        </Text>
                    </View>
                    {step === 1 && (
                        <>
                            <View className="mt-10">
                                <Text className="mb-2 font-medium text-xl text-slate-800">Pseudo : </Text>
                                <Input icon="user" placeholder="Pseudo" value={watch('pseudo')} onChangeText={(value) => setValue('pseudo', value)} error={errors.pseudo} />
                            </View>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <View className="mt-10">
                                <Text className="mb-2 font-medium text-xl text-slate-800">Email : </Text>
                                <Input icon="mail" placeholder="Votre address email" value={watch('email')} onChangeText={(value) => setValue('email', value)} error={errors.email} />
                                {/* <Text className="mt-2 font-medium text-red-500">Email invalide</Text> */}
                            </View>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <View className="mt-10">
                                <Text className="mb-2 font-medium text-xl text-slate-800">Mot de passe : </Text>
                                <Input
                                    type="password"
                                    icon="lock"
                                    placeholder="Votre mot de passe"
                                    value={watch('password')}
                                    onChangeText={(value) => setValue('password', value)}
                                    error={errors.password}
                                />
                            </View>
                        </>
                    )}
                    <View className="mt-8 flex-row gap-2">
                        {step > 1 && <Button title={<Feather name="arrow-left" size={24} color="white" />} onPress={() => setStep((prev) => prev - 1)} className="w-20 bg-black" />}
                        {step === 3 ? (
                            <Button title="S'inscrire" isLoading={isPending} onPress={handleSubmit(handleSubmitPress)} className="flex-1" />
                        ) : (
                            <Button title="Suivant" isLoading={isPending} onPress={() => setStep((prev) => prev + 1)} className="flex-1" />
                        )}
                    </View>
                    <View className="mt-8 flex-row items-center justify-center">
                        <Text className="text-md text-slate-500">Vous avez déjà un compte ?</Text>
                        <TouchableOpacity onPress={handleLoginPress} className="px-1 py-2">
                            <Text className="text-md font-semibold text-teal-500">Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Text className="text-center text-gray-500">CoNote © {new Date().getFullYear()}</Text>
            <Text className="text-center text-gray-500">Tous droits reservés</Text>
            <Text className="text-center text-gray-500">
                version <Text className="font-semibold text-teal-500">{version}</Text>
            </Text>
            <Text className="text-center text-gray-500">cisko.dev</Text>
        </SafeAreaView>
    );
}
