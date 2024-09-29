import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';

export const useUploadDocument = () => {
  return useMutation({
    mutationKey: ['uploadDocument'],
    mutationFn: ({ document }: { document: File }) => {
      const formData = new FormData();
      formData.append('document', document);
      return client.post('document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  });
};