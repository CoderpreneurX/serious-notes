import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      minHeight="100vh"
    >
      <CircularProgress size={30} />
      <Typography variant="h5">One Moment Please...</Typography>
    </Box>
  );
}
