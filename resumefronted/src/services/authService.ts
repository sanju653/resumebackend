//separate file where we keep all authentication-related API calls.

import api from "./api";
export interface LoginRequest{
    email:string;
    password:string;
}

export interface SignupRequest{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface LoginResponse{
    accessToken:string;
    refreshToken:string;
    user?:{
        id:string;
        name:string;
         email: string;
        role: string;
    };
}

export const login=async(data:LoginRequest): Promise<LoginResponse>=>{
    const response=await api.post("/auth/login",data);
    return response.data;
};
export const signup=async(data:SignupRequest)=>{
    const response=await api.post("/auth/register",data);
    return response.data;
};
export const refreshAccessToken = async (refreshToken: string) => {

    const response = await api.post("/auth/refresh", 
       { refreshToken }
    );

    return response.data;
};

export const logout=async(refreshToken: string)=>{
    const response=await api.post("/auth/logout",{ refreshToken });
    return response.data;
};
export const forgotPassword = async (email: string) => {

    const response = await api.post(
        "/auth/forgot-password",
        { email }
    );

    return response.data;
};
export const resetPassword = async (data: {
    token: string;
    newPassword: string;
}) => {

    const response = await api.post(
        "/auth/reset-password",
        data
    );

    return response.data;
};