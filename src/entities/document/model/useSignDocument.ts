import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/utils/apiClient';

interface Data {
  p12File: File;
  password: string;
  document_id: number;
}

export const useSignDocument = () => {
  return useMutation({
    mutationKey: ['signDocument'],
    mutationFn: (data: Data) => {
      const formData = new FormData();
      formData.append('p12File', data.p12File);
      formData.append('password', data.password);
      formData.append('document_id', String(data.document_id));
      return client.put('document/sign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};