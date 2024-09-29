import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';

export const useReadNotification = () => {
  return useMutation({
    mutationKey : ["readNotification"],
    mutationFn : (id: number) => {
      return client.put(`notification/${id}`)
    }
  })
}