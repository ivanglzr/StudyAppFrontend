import { DOCUMENT_ROUTES } from "@/document/services";

interface Props {
  params: {
    filename: string;
    subjectId: string;
  };
}

export default async function DocumentPage({ params }: Props) {
  const { subjectId, filename } = await params;

  return (
    <iframe
      src={DOCUMENT_ROUTES.GET_DOCUMENT(subjectId, filename)}
      width="100%"
      height="100%"
    />
  );
}
