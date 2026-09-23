import api from "./api";
//resume related apis
export interface ResumeReq{
 fullName: string;
    phone: string;
    email: string;
    address: string;
    summary: string;   
    jobRole:string;
}
export interface ResumeResponse {
    id: number;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    summary: string;
     jobRole:string;
}

export const createResume=async(data:ResumeReq)=>{
    const response=await api.post("/resume",data);
    return response.data;
};

export const getMyResumes=async(): Promise<ResumeResponse[]>=>{
    const response=await api.get("/resume");
    return response.data;
};

export const updateResume=async(resumeId: number,data:ResumeReq)=>{
    const response=await api.put(`/resume/${resumeId}`,data);
    return response.data;
};

export const deleteResume = async (resumeId: number) => {
    const response = await api.delete(`/resume/${resumeId}`);
    return response.data;
};
export const getResumeById = async (
    resumeId: number
): Promise<ResumeResponse> => {
    


    const response = await api.get(`/resume/${resumeId}`);

    return response.data;
};