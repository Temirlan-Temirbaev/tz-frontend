import { useQuery } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';

export const useGetDocumentsCount = () => {
  return useQuery<{ pages: number }, Error>({
    queryKey: ['getDocumentsCount'],
    queryFn: async () => {
      const response = await client.get<{ pages: number }>(`document/count`);
      return response.data;
    },
  });
};
