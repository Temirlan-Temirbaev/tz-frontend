import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "./";
import { client } from '@/shared/utils/apiClient';

export const useCheckAuth = (refetchEnabled: boolean, token: string) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const user = await client
        .get<User>(`auth/check-login`)
        .catch((e: any) => {
          localStorage.removeItem("tz-token");
          window.location.href = "/auth/login";
          queryClient.cancelQueries({ queryKey: ["check-auth"] });
        });
      return user;
    },
    enabled: refetchEnabled,
  });

  const userData = data?.data;

  return { data, error, isLoading, userData, refetch };
};
