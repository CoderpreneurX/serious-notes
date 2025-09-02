import EditorSidebar from "@/components/notes/EditorSidebar";
import NotesContainer from "@/components/notes/NotesContainer";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import useNotes from "@/hooks/useNotes";

export default function NotesPage() {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  const { data: notes = [], isLoading, error } = useNotes();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>{error.message}</p>;

  return (
    <Box sx={{ display: "flex", gap: 1, height: "100%", overflowX: "hidden" }}>
      <NotesContainer open={open} notes={notes} />
      <EditorSidebar open={open} toggleOpen={toggleOpen} />
    </Box>
  );
}
