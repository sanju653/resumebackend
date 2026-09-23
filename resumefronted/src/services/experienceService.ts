
//Think of a React service file as the place where we keep all the code responsible for talking to the Spring Boot backend.
import api from "./api";


export interface ExperienceRequest {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface ExperienceResponse {
    id: number;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}


export const createExperience=async(resumeId: number, experience:ExperienceRequest):Promise<ExperienceResponse>=>{
    const response=await api.post(`/resume/${resumeId}/experience`,experience);
    return response.data;
}

export const getMyExperiences=async(resumeId: number):Promise<ExperienceResponse[]>=>{
    const response=await api.get(`/resume/${resumeId}/experience`);
    return response.data; 
}
export const updateExperience=async(resumeId: number,experienceId:number,  experience:ExperienceRequest):Promise<ExperienceResponse>=>{
    const response=await api.put(`/resume/${resumeId}/experience/${experienceId}`, experience);
    return response.data; 
}
export const deleteExperience=async(resumeId: number,experienceId:number):Promise<String>=>{
    const response=await api.delete(`/resume/${resumeId}/experience/${experienceId}`);
    return response.data; 
}