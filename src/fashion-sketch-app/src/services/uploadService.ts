import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/api.config";

const uploadService = {
  uploadImage: async (uri: string, filename: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", { uri, type: "image/png", name: filename } as any);
    const response = await apiClient.post(API_ENDPOINTS.UPLOAD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data?.data?.url ?? response.data?.url;
  },
};

export default uploadService;
