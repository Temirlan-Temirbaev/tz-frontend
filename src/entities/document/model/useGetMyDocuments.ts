import { useQuery } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';
import { Document } from './document.interface';

export const useGetMyDocuments = (id: string) => {
  return useQuery<Document[], Error>({
    queryKey: ['getMyDocuments', id],
    queryFn: async () => {
      const response = await client.get<Document[]>(`document/owner/${id}`);
      return response.data;
    },
  });
};
