import { Document } from '../';
import { DocumentCard } from './';

export const DocumentsList = ({ documents }: { documents: Document[] }) => {
  return <div className={"flex flex-wrap flex-row justify-center w-full h-[75%] gap-[40px]"}>
    {documents.map(doc => {
      return <DocumentCard document={doc} key={`document-${doc.document_id}`} />;
    })}
  </div>;
};