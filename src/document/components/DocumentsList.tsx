import { UploadDocumentDialog, DocumentItem } from ".";

interface Props {
  documents: string[];
  subjectId: string;
}

export function DocumentsList({ documents, subjectId }: Props) {
  return (
    <div className="mt-4 pt-2 border-t-2 border-t-background">
      <header className="flex justify-between">
        <h2 className="mb-2 text-2xl">Documents</h2>
        <UploadDocumentDialog subjectId={subjectId} />
      </header>
      {documents.length === 0 ? (
        <span>You don't have any documents</span>
      ) : (
        <ul>
          {documents.map((document) => (
            <DocumentItem
              key={document}
              document={document}
              subjectId={subjectId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
