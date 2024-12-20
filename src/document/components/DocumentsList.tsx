import Link from "next/link";

import { extname } from "node:path";

import { CreateDocumentDialog, Icon } from ".";

interface Props {
  documents: string[];
  subjectId: string;
}

function getStringBeforeDash(input: string) {
  const match = input.match(/^(.*?)-\d+\./);
  return match ? match[1] : null;
}

export function DocumentsList({ documents, subjectId }: Props) {
  return (
    <div className="mt-4 pt-2 border-t-2 border-t-background">
      <header className="flex justify-between">
        <h2 className="mb-2 text-2xl">Documents</h2>
        <CreateDocumentDialog subjectId={subjectId} />
      </header>
      <ul>
        {documents.map((document) => (
          <li key={document}>
            <Link
              href={`/user/library/${subjectId}/document/${document}`}
              className="flex items-center gap-2"
            >
              <Icon ext={extname(document)} width={50} height={50} />
              <span className="text-lg">{getStringBeforeDash(document)}</span>
            </Link>
          </li>
        ))}
        {documents.length === 0 && <span>You don't have any documents</span>}
      </ul>
    </div>
  );
}
