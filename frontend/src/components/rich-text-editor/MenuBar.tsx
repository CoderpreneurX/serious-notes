import {
  Code,
  DataObject,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
  Redo,
  Undo,
} from "@mui/icons-material";
import { Divider, Button, Tooltip, Typography, Box } from "@mui/material";
import type { Editor } from "@tiptap/react";
import HighlightMenu from "./ToggleHighlightDropdown";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
        borderRadius: 1,
        p: 0.5,
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Headings */}
      <Tooltip title="Heading 1">
        <Button
          size="small"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          sx={{
            bgcolor: editor.isActive("heading", { level: 1 })
              ? "gray"
              : "white",
          }}
        >
          <Typography variant="subtitle2">H1</Typography>
        </Button>
      </Tooltip>
      <Tooltip title="Heading 2">
        <Button
          size="small"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Typography variant="subtitle2">H2</Typography>
        </Button>
      </Tooltip>
      <Tooltip title="Heading 3">
        <Button
          size="small"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Typography variant="subtitle2">H3</Typography>
        </Button>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* Text styles */}
      {[
        {
          title: "Bold",
          icon: <FormatBold />,
          action: () => editor.chain().focus().toggleBold().run(),
          active: editor.isActive("bold"),
        },
        {
          title: "Italic",
          icon: <FormatItalic />,
          action: () => editor.chain().focus().toggleItalic().run(),
          active: editor.isActive("italic"),
        },
        {
          title: "Underline",
          icon: <FormatUnderlined />,
          action: () => editor.chain().focus().toggleUnderline().run(),
          active: editor.isActive("underline"),
        },
        {
          title: "Strikethrough",
          icon: <FormatStrikethrough />,
          action: () => editor.chain().focus().toggleStrike().run(),
          active: editor.isActive("strike"),
        },
      ].map((btn, i) => (
        <Tooltip title={btn.title} key={i}>
          <Button
            size="small"
            onClick={btn.action}
          >
            {btn.icon}
          </Button>
        </Tooltip>
      ))}

      <Divider orientation="vertical" flexItem />

      {/* Highlight */}
      <Tooltip title="Highlight">
        <HighlightMenu editor={editor} />
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* Lists */}
      <Tooltip title="Bullet List">
        <Button
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulleted />
        </Button>
      </Tooltip>
      <Tooltip title="Ordered List">
        <Button
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumbered />
        </Button>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* Code */}
      <Tooltip title="Inline Code">
        <Button
          size="small"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code />
        </Button>
      </Tooltip>
      <Tooltip title="Code Block">
        <Button
          size="small"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <DataObject />
        </Button>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* Alignments */}
      {[
        { title: "Align Left", icon: <FormatAlignLeft />, align: "left" },
        { title: "Align Center", icon: <FormatAlignCenter />, align: "center" },
        { title: "Align Right", icon: <FormatAlignRight />, align: "right" },
        { title: "Justify", icon: <FormatAlignJustify />, align: "justify" },
      ].map((btn, i) => (
        <Tooltip title={btn.title} key={i}>
          <Button
            size="small"
            onClick={() => editor.chain().focus().setTextAlign(btn.align).run()}
          >
            {btn.icon}
          </Button>
        </Tooltip>
      ))}

      <Divider orientation="vertical" flexItem />

      {/* Undo/Redo */}
      <Tooltip title="Undo">
        <Button
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo />
        </Button>
      </Tooltip>
      <Tooltip title="Redo">
        <Button
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo />
        </Button>
      </Tooltip>
    </Box>
  );
}
