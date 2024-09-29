import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';
import { toast } from 'react-toastify';

export const useDenieDocument = (id : number) => {
  return useMutation({
    mutationKey : ["denieDocument", id],
    mutationFn : () => {
      return client.put(`document/denie/${id}`)
    },
    onSuccess: () => {
      toast.success("Документ отклонен", {position : "top-right"})
    },
    onError: () => {
      toast.error("Не получилось отклонить документ", {position : "top-right"})
    }
  })
}