import { Box, Container, Drawer, useMediaQuery, useTheme } from "@mui/material";
import AppLogo from "../AppLogo";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { useSidebarStore } from "@/store/sidebarStore";

export const drawerWidth = 248;

export default function Sidebar() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleSidebar}
      variant={isMdUp ? "permanent" : "temporary"}
      sx={{ width: drawerWidth, bgcolor: "white" }}
    >
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Box sx={{ py: 1.5, display: "flex", alignItems: "center" }}>
          <AppLogo />
          {!isMdUp && <ToggleSidebarButton />}
        </Box>
      </Container>
    </Drawer>
  );
}
