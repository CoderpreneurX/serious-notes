import type { Note } from "@/types/notes";
import { Box, Typography } from "@mui/material";
import { htmlToPlainText } from "@/utils/helpers";
import Card from "../ui/Card";

interface NotesContainerProps {
  open: boolean;
  notes: Note[];
}

export default function NotesContainer({ open, notes }: NotesContainerProps) {
  return (
    <Box
      sx={{
        flexBasis: open ? "30%" : "100%",
        flexGrow: 1,
        minWidth: "320px",
        textAlign: "justify",
      }}
    >
      {notes.map((note) => (
        <Card key={note.id} variant="outlined">
          <Typography variant="h4">{note.title}</Typography>
          <Typography variant="body2">
            {htmlToPlainText(note.content)}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
