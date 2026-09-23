import api from "./api";

export interface ResumeActivityResponse {
    id: number;
    activityType: string;
    createdAt: string;
}

export const getResumeActivities = async (
    resumeId: number
): Promise<ResumeActivityResponse[]> => {

    const response = await api.get(
        `/resume/${resumeId}/activities`
    );

    return response.data;
};