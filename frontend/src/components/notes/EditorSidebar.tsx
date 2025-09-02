import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import RichTextEditor from "../rich-text-editor";

interface EditorSidebarProps {
  open: boolean;
  toggleOpen: () => void;
}

export default function EditorSidebar({
  open,
  toggleOpen,
}: EditorSidebarProps) {
  return (
    <Box
      sx={{
        borderLeft: "4px solid #e5eaef",
        translate: open ? 0 : "calc(100% - 12px)",
        position: "relative",
        flexBasis: open ? "70%" : 0,
        transition: "translate 0.5s ease",
        display: { xs: "none", sm: "block" },
        width: open ? "100%" : "12px",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "100%",
        }}
        onClick={toggleOpen}
      >
        {open ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
      <Box sx={{ minWidth: "max-content" }}>
        <RichTextEditor />
      </Box>
    </Box>
  );
}
