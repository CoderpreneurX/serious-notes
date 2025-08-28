import React, { useState } from "react";
import { IconButton, Tooltip, Menu, Box } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import type { Editor } from "@tiptap/react";

const highlightColors = ["yellow", "lightgreen", "pink", "lightblue", "orange"];

export default function HighlightMenu({ editor }: { editor: Editor | null }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!editor) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
    handleClose();
  };

  if (!editor) return null;

  return (
    <>
      <Tooltip title="Highlight">
        <IconButton
          onClick={handleClick}
          color={editor.isActive("highlight") ? "primary" : "default"}
        >
          <HighlightIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            px: 2,
            py: 1,
          }}
        >
          {highlightColors.map((c) => (
            <Tooltip title={c} key={c}>
              <IconButton
                key={c}
                onClick={() => handleColorSelect(c)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "1px solid #ccc",
                }}
              />
            </Tooltip>
          ))}

          {/* Optional: clear highlight button */}
          <Tooltip title="Clear Highlight">
            <IconButton
              onClick={() => {
                editor.chain().focus().unsetHighlight().run();
                handleClose();
              }}
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px dashed #999",
              }}
            />
          </Tooltip>
        </Box>
      </Menu>
    </>
  );
}
