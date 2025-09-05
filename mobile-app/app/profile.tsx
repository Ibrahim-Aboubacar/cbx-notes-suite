import useTokenStore from '@/features/auth/store/tokenStore';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { VibrationService } from '@/services/VibrationService';
import { useAppStartupStore } from '@/store/AppStartupStore';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LogOut, Trash2, User } from 'lucide-react-native';
import { version } from 'package.json';
import { RefObject, useCallback, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Profile() {
    const { resetData } = useTokenStore();
    const { resetOnboarding } = useAppStartupStore();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [bottomSheetState, setBottomSheetState] = useState<number>(-1);
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        setBottomSheetState(index);
        console.log('indexChanded', index);
    }, []);

    const handlePress = () => {
        VibrationService.selectionChange();
        bottomSheetRef.current?.expand();
    };

    function handleResetAll() {
        resetOnboarding();
        resetData();
        queryClient.resetQueries();
        router.replace('/');
    }

    return (
        <GestureHandlerRootView className="relative_ flex-1">
            <View className="flex-1 px-6 pb-16 pt-20">
                <UserInfoCard />
                <View className="bg-red-200_ flex-1_ mb-7 mt-5 justify-start rounded-b-2xl rounded-t-2xl border-t border-slate-200 pt-5">
                    <View className="gap-3">
                        <TouchableOpacity className="rounded-2xl bg-red-200/40 px-5 py-4" onPress={handlePress}>
                            <View className="flex-row items-center justify-between gap-3">
                                <View className="flex-row items-center gap-4">
                                    <LogOut size={24} strokeWidth={1.5} color="#ef4444" />
                                    <Text className="font-medium text-xl text-red-500">Se déconnecter</Text>
                                </View>
                                {/* <ChevronRight size={20} strokeWidth={1.5} color="#555" /> */}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="rounded-2xl bg-neutral-200/40 px-5 py-4" onPress={handleResetAll}>
                            <View className="flex-row items-center justify-between gap-3">
                                <View className="flex-row items-center gap-4">
                                    <Trash2 size={24} strokeWidth={1.5} color="#737373" />
                                    <Text className="font-medium text-xl text-neutral-500">Supprimer toutes les données</Text>
                                </View>
                                {/* <ChevronRight size={20} strokeWidth={1.5} color="#555" /> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={cn('mt-8 flex-1 justify-end ', Platform.OS === 'android' && 'pb-10')}>
                    <Text className="text-center text-gray-400">CoNote © {new Date().getFullYear()}</Text>
                    <Text className="text-center text-gray-400">Tous droits reservés</Text>
                    <Text className="text-center text-gray-400">
                        version <Text className="font-semibold text-teal-400">{version}</Text>
                    </Text>
                    <Text className="text-center text-gray-400">cisko.dev</Text>
                </View>
                <LogOutBottomSheet index={bottomSheetState} sheetRef={bottomSheetRef} onChange={handleSheetChanges} />
            </View>
        </GestureHandlerRootView>
    );
}

function UserInfoCard() {
    const { user } = useUser();
    return (
        <View className="relative isolate h-[11.5rem]">
            <View className="absolute bottom-0 left-0 right-0 top-14 gap-1 rounded-3xl bg-teal-200 px-3 pb-3 pt-14">
                <View className="flex-row items-center justify-center gap-1">
                    <Text className="text-center font-RobotoBlack text-2xl text-slate-800">{user?.pseudo}</Text>
                </View>
                <Text className="text-center font-medium text-lg leading-5 text-slate-700/50">{user?.email}</Text>
            </View>
            <View className="items-center justify-center">
                <View className="size-28 items-center justify-center rounded-[5rem] border-[0.3rem] border-slate-50 bg-slate-300">
                    {/*  */}
                    <User size={38} strokeWidth={1} color="#333" />
                </View>
            </View>
        </View>
    );
}

function LogOutBottomSheet({ index, sheetRef, onChange }: { index: number; sheetRef: RefObject<BottomSheet | null>; onChange: (index: number) => void }) {
    const { resetData } = useTokenStore();
    const queryClient = useQueryClient();
    const router = useRouter();
    function handleLogout() {
        queryClient.resetQueries();
        resetData();
        router.replace('/(auth)');
    }
    return (
        <BottomSheet
            //
            index={index}
            backdropComponent={(props) => (index !== -1 ? <TouchableOpacity onPress={() => sheetRef.current?.close()} className="flex-1" {...props} /> : null)}
            snapPoints={[380]}
            backgroundStyle={{
                shadowColor: '#000',
                shadowRadius: 40,
                shadowOpacity: 0.5,
            }}
            detached={false}
            enablePanDownToClose={true}
            ref={sheetRef}
            onChange={onChange}>
            <BottomSheetView className="bg-slate-800_ h-full flex-1 gap-2 p-6 pb-10">
                <View className="flex-1">
                    <View className="items-center justify-center">
                        <View className="rounded-full bg-red-100 p-8">
                            <LogOut size={30} color="#f00" />
                        </View>
                    </View>
                    <Text className="mt-4 text-center font-bold text-xl text-slate-600">Voulez-vous vraiment</Text>
                    <Text className="text-center font-bold text-xl text-slate-600">vous déconnecter</Text>
                </View>
                <View className="gap-3">
                    <TouchableOpacity onPress={handleLogout} className="h-16 items-center justify-center rounded-full bg-red-100">
                        <Text className="font-medium text-xl text-red-500">Oui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => sheetRef.current?.close()} className="h-16 items-center justify-center rounded-full bg-slate-800">
                        <Text className="font-medium text-xl text-slate-100">Annuler</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}
