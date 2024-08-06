"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable = true
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const {edgestore} = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url;
    }


    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? JSON.parse(initialContent) as PartialBlock[]
            : undefined,
        // Add other options as needed
        defaultStyles: true,
        uploadFile: handleUpload,
    });

    const handleChange = (): void => {
        onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    };

    return (
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            editable={editable}
            onChange={handleChange}
        />
    );
}

export default Editor;