 import api from "./api";

 export interface ProjectRequest{
title:string;
description:string;
technologies:string;
githubUrl:string;
liveUrl:string


 }
 export interface ProjectResponse{
    id:number;
    title:string;
description:string;
technologies:string;
githubUrl:string;
liveUrl:string
    
 }

 export  const addProject=async(resumeId:number,project:ProjectRequest):Promise<ProjectResponse>=>{
    const response=await api.post(`/resume/${resumeId}/projects`,project);
    return response.data;
};

export  const getMyProjects=async(resumeId:number):Promise<ProjectResponse[]>=>{
    const response=await api.get(`/resume/${resumeId}/projects`);
    return response.data;
};
export  const updateProject=async(resumeId:number,projectId:number,project:ProjectRequest):Promise<ProjectResponse>=>{
    const response=await api.put(`/resume/${resumeId}/projects/${projectId}`,project);
    return response.data;
};
export  const deleteProject=async(resumeId:number,projectId:number):Promise<string>=>{
    const response=await api.delete(`/resume/${resumeId}/projects/${projectId}`);
    return response.data;
};