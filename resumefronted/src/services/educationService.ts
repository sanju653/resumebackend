import api from "./api";

export interface EducationRequest {
    degree: string;
    institution: string;
    location: string;
    startYear: string;
    endYear: string;
}

export interface EducationResponse {
    id: number;
    degree: string;
    institution: string;
    location: string;
    startYear: string;
    endYear: string;
}

export const createEducation=async(resumeId: number,education:EducationRequest):Promise<EducationResponse>=>{
    const response=await api.post<EducationResponse>(`/resume/${resumeId}/education`,education);
    return response.data;
};
export const getMyEducation=async(resumeId: number,): Promise<EducationResponse[]>=>{
    const response=await api.get<EducationResponse[]>(`/resume/${resumeId}/education`);
    return response.data;
};

export const updateEducation=async(resumeId: number, id:number,education:EducationRequest):Promise<EducationResponse>=>{
    const response=await api.put(`/resume/${resumeId}/education/${id}`,education);
     return response.data;
}
export const deleteEducation=async(resumeId: number,id:number): Promise<string>=>{
    const response=await api.delete(`/resume/${resumeId}/education/${id}`);
    return response.data;
};