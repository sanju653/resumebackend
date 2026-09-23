import api from "./api";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
      phone: string;
    location: string;
}

export interface UserUpdateReq {
    name: string;
    email: string;
    phone: string;
    location: string;
}
export interface ChangePasswordReq {
    oldPassword: string;
    newPassword: string;
}

export const getMyProfile = async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>("/users/me");
    return response.data;
};

export const updateMyProfile = async (
    data: UserUpdateReq
): Promise<UserResponse> => {
    const response = await api.put<UserResponse>("/users/me", data);
    return response.data;
};

export const changePassword = async (
    data: ChangePasswordReq
): Promise<string> => {
    const response = await api.put<string>(
        "/auth/change-password",
        data
    );

    return response.data;
};
export const deleteMyAccount = async () => {
    const response = await api.delete("/users/me");
    return response.data;
};