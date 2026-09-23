import api from "./api";

export interface UserSettingsResponse {
    id: number;
    defaultTemplate: string;
    accentColor: string;
    theme: string;
    emailNotifications: boolean;
    resumeReminders: boolean;
}

export interface UserSettingsReq {
    defaultTemplate: string;
    accentColor: string;
    theme: string;
    emailNotifications: boolean;
    resumeReminders: boolean;
}


export const getSettings = async (): Promise<UserSettingsResponse> => {

    const response = await api.get<UserSettingsResponse>(
        "/settings"
    );

    return response.data;
};


export const updateSettings = async (
    data: UserSettingsReq
): Promise<UserSettingsResponse> => {

    const response = await api.put<UserSettingsResponse>(
        "/settings",
        data
    );

    return response.data;
};