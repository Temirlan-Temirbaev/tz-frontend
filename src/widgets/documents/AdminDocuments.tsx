'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/entities/user';
import { DocumentsList } from '@/entities/document';
import { useGetDocumentsByPage, useGetDocumentsCount } from '@/entities/document';

export const AdminDocuments = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  const [currentPage, setCurrentPage] = useState(1);

  const { data: documentsCount } = useGetDocumentsCount();
  const totalPages = documentsCount?.pages || 1;
  console.log(currentPage);
  const { data: documents, isLoading } = useGetDocumentsByPage(currentPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && !(page > totalPages)) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <div>Loading documents...</div>;
  if (!documents) return <div>No documents found.</div>;

  return (
    <div>
      <DocumentsList documents={documents} />

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600"
        >
          Предыдущая
        </button>

        <span className="px-4 py-2 text-lg">
          Страница {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Следующая
        </button>
      </div>
    </div>
  );
};
