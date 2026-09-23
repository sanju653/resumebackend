import api from "./api";

export interface CertificationRequest {
    name: string;
    issuingOrganization: string;
    issueDate: string;
    credentialUrl: string;
}

export interface CertificationResponse {
    id: number;
    name: string;
    issuingOrganization: string;
    issueDate: string;
    credentialUrl: string;
}

export const addCertification = async (
    resumeId: number,
    certification: CertificationRequest
): Promise<CertificationResponse> => {
    const response = await api.post(
        `/resume/${resumeId}/certifications`,
        certification
    );

    return response.data;
};

export const getCertifications = async (
    resumeId: number
): Promise<CertificationResponse[]> => {
    const response = await api.get(
        `/resume/${resumeId}/certifications`
    );

    return response.data;
};

export const updateCertification = async (
    resumeId: number,
    certificationId: number,
    certification: CertificationRequest
): Promise<CertificationResponse> => {
    const response = await api.put(
        `/resume/${resumeId}/certifications/${certificationId}`,
        certification
    );

    return response.data;
};

export const deleteCertification = async (
    resumeId: number,
    certificationId: number
): Promise<string> => {
    const response = await api.delete(
        `/resume/${resumeId}/certifications/${certificationId}`
    );

    return response.data;
};