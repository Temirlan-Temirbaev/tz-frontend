import { useQuery } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';
import { Notification } from './';

export const useGetNotifications = () => {
  return useQuery<Notification[], Error>({
    queryKey: ['getMyNotifications'],
    queryFn: async () => {
      const response = await client.get<Notification[]>(`notification`);
      return response.data;
    },
  });
};
