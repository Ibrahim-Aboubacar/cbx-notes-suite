import useTokenStore from '@/features/auth/store/tokenStore';

export default function useUser() {
    const { user } = useTokenStore();

    let initials = '';
    let userName = '';
    if (user) {
        initials = user.pseudo.charAt(0).toUpperCase();
        userName = user.pseudo.slice(0, 10);
    }
    return { initials, userName, user }
}