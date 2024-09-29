import { useQuery } from '@tanstack/react-query';
import { Document } from '@/entities/document';
import { client } from '@/shared/utils/apiClient';

export const useGetDocumentsByPage = (page: number) => {
  return useQuery<Document[], Error>({
    queryKey: ['getDocumentsByPage', page],
    queryFn: async () => {
      const response = await client.get<Document[]>(`document/page/${page}`);
      return response.data;
    },
  });
}