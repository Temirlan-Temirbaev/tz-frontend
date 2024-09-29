import { useMutation } from '@tanstack/react-query';
import { client } from "@/shared/utils/apiClient";
import { ErrorResponse, SuccessAuthResponse } from "@/types";
import { toast } from "react-toastify";

interface LoginData {
  p12File: File;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData): Promise<SuccessAuthResponse> => {
      const formData = new FormData();
      formData.append("p12File", data.p12File);
      formData.append("password", data.password);

      const response = await client.post("/auth/login", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (response: SuccessAuthResponse) => {
      localStorage.setItem("tz-token", response.token);
      location.href = "/";
    },
    onError: ({ response }: ErrorResponse) => {
      toast.error(`${response.data.message} (${response.data.error})`, { position: "top-right" });
    }
  });
};
