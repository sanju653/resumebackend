import api from "./api";

export interface SocialLinkRequest {
    platform: string;
    url: string;
}

export interface SocialLinkResponse {
    id: number;
    platform: string;
    url: string;
}

export const addSocialLink = async (
    resumeId: number,
    socialLink: SocialLinkRequest
): Promise<SocialLinkResponse> => {
    const response = await api.post(
        `/resume/${resumeId}/social-links`,
        socialLink
    );

    return response.data;
};

export const getSocialLinks = async (
    resumeId: number
): Promise<SocialLinkResponse[]> => {
    const response = await api.get(
        `/resume/${resumeId}/social-links`
    );

    return response.data;
};

export const updateSocialLink = async (
    resumeId: number,
    socialLinkId: number,
    socialLink: SocialLinkRequest
): Promise<SocialLinkResponse> => {
    const response = await api.put(
        `/resume/${resumeId}/social-links/${socialLinkId}`,
        socialLink
    );

    return response.data;
};

export const deleteSocialLink = async (
    resumeId: number,
    socialLinkId: number
): Promise<string> => {
    const response = await api.delete(
        `/resume/${resumeId}/social-links/${socialLinkId}`
    );

    return response.data;
};