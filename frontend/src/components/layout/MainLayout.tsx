import { Box, Container, useMediaQuery } from "@mui/material";
import Sidebar, { drawerWidth } from "../sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%" }}
      >
        <Header variant="main" />
        <Container sx={{ p: 1.5 }}>{children}</Container>
      </Box>
    </Box>
  );
}
