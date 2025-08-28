import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import Card from "../ui/Card";
import { Divider } from "@mui/material";

const lowlight = createLowlight(common);

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Click here to start typing...",
      }),
    ],
  });

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        height: "calc(100vh - 94px)",
      }}
    >
      <MenuBar editor={editor} />
      <Divider />
      <EditorContent
        style={{ height: "100%", display: "grid", overflowY: "auto" }}
        editor={editor}
      />
    </Card>
  );
}
