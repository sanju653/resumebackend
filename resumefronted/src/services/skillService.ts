 import api from "./api";

 export interface SkillRequest{
    name:string;
    category:string;

 }
 export interface SkillResponse{
    id:number;
    name:string;
    category:string;

 }

 export const addSkill=async(resumeId: number,data:SkillRequest):Promise<SkillResponse>=>{
    const response=await api.post(`/resume/${resumeId}/skills`,data);
    return response.data;
 };

 export const getSkills=async(resumeId: number):Promise<SkillResponse[]>=>{
    const response=await api.get(`/resume/${resumeId}/skills`);
    return response.data;

 };
 export const updateSkill=async(resumeId: number,skillId:number,data:SkillRequest):Promise<SkillResponse>=>{
    const response=await api.put(`/resume/${resumeId}/skills/${skillId}`,data);
    return response.data;
 };
 export const deleteSkill=async(resumeId: number,skillId:number):Promise<string>=>{
    const response=await api.delete(`/resume/${resumeId}/skills/${skillId}`);
    return response.data;
 };
