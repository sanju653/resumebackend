//as a small central box in your React app that remembers whether the user is logged in and keeps their JWT token.
//Instead of passing the token manually from Login → Dashboard → Profile → Settings, all those components can access the same store.
//Zustand store is only in memory if you refresh the dashboard, Zustand will lose this token.. so add Zustand persist so your login survives a page refresh
import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
    rememberMe: boolean;

    login: (
        accessToken: string,
        refreshToken: string,
        rememberMe: boolean
    ) => void;

    logout: () => void;
}

const getStoredAuth = () => {

    const localData =
        localStorage.getItem("auth-storage");

    const sessionData =
        sessionStorage.getItem("auth-storage");

    const data =
        localData || sessionData;

    if (!data) {
        return {
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
            rememberMe: false
        };
    }

    return JSON.parse(data);
};

const useAuthStore = create<AuthState>((set) => {

    const storedAuth = getStoredAuth();

    return {

        accessToken: storedAuth.accessToken,
        refreshToken: storedAuth.refreshToken,
        isLoggedIn: storedAuth.isLoggedIn,
        rememberMe: storedAuth.rememberMe,

        login: (
            accessToken,
            refreshToken,
            rememberMe
        ) => {

            const authData = {
                accessToken,
                refreshToken,
                isLoggedIn: true,
                rememberMe
            };

            const storage = rememberMe
                ? localStorage
                : sessionStorage;

            storage.setItem(
                "auth-storage",
                JSON.stringify(authData)
            );

            // Remove old data from the other storage
            if (rememberMe) {
                sessionStorage.removeItem("auth-storage");
            } else {
                localStorage.removeItem("auth-storage");
            }

            set(authData);
        },

        logout: () => {

            localStorage.removeItem("auth-storage");
            sessionStorage.removeItem("auth-storage");

            set({
                accessToken: null,
                refreshToken: null,
                isLoggedIn: false,
                rememberMe: false
            });
        }
    };
});

export default useAuthStore;