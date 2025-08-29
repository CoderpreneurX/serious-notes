import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar, { drawerWidth } from "../sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          width: isMdUp ? `calc(100% - ${drawerWidth}px)` : "100%",
          height: "100vh",
        }}
      >
        <Header variant="main" />
        <Box
          sx={{
            p: 1.5,
            height: {
              xs: "calc(100vh - 56.8px)",
              sm: "calc(100vh - 64.8px)",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
