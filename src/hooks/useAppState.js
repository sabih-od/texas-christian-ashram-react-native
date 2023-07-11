import { useEffect, useState } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
    const [appState, setAppState] = useState(AppState?.currentState);

    useEffect(() => {
        AppState?.addEventListener('change', (newState) => {
            setAppState(newState);
        });

        return () => {
            AppState?.removeEventListener('change', (newState) => {
                setAppState(newState);
            });
        };
    }, [])

    return appState;
};