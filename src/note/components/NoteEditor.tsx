"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import * as MDX from "@mdxeditor/editor";

import { Button, Input } from "@/common/components/ui";

import { postNote, putNote } from "../services/note.service";

import { INote } from "../interfaces";

import "@mdxeditor/editor/style.css";

const plugins = [
  MDX.headingsPlugin(),
  MDX.listsPlugin(),
  MDX.quotePlugin(),
  MDX.thematicBreakPlugin(),
  MDX.directivesPlugin({
    directiveDescriptors: [MDX.AdmonitionDirectiveDescriptor],
  }),
  MDX.frontmatterPlugin(),
  MDX.imagePlugin(),
  MDX.tablePlugin(),
  MDX.thematicBreakPlugin(),
  MDX.listsPlugin(),
  MDX.toolbarPlugin({
    toolbarContents: () => (
      <>
        <MDX.UndoRedo />
        <MDX.BoldItalicUnderlineToggles />
        <MDX.CodeToggle />
        <MDX.CreateLink />
        <MDX.InsertThematicBreak />
        <MDX.ListsToggle />
        <MDX.InsertImage />
        <MDX.InsertFrontmatter />
        <MDX.InsertTable />
        <MDX.InsertAdmonition />
        <MDX.BlockTypeSelect />
      </>
    ),
  }),
];

interface Props {
  subjectId: string;
  noteId?: string;
  initialNote?: INote;
}

export default function NoteEditor({ subjectId, noteId, initialNote }: Props) {
  const [title, setTitle] = useState<string>(initialNote?.title ?? "");

  const editorRef = useRef<MDX.MDXEditorMethods>(null);

  const handleClick = async () => {
    const note = {
      title,
      content: editorRef.current?.getMarkdown() ?? "",
    };

    if (initialNote === undefined || noteId === undefined)
      await postNote(subjectId, note);
    else await putNote(subjectId, noteId, note);
  };

  return (
    <div>
      <Input
        name="title"
        id="title"
        placeholder="Title"
        className="w-1/5 mb-2 border border-primary"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      <MDX.MDXEditor
        ref={editorRef}
        className="border rounded-md"
        markdown={initialNote?.content ?? ""}
        plugins={plugins}
      />
      <Button className="mt-2" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export const DynamicNoteEditor = dynamic(
  () => import("@/note/components/NoteEditor"),
  { ssr: false, loading: () => <span>Loading...</span> }
);
