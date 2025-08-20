import { Box, Container, Drawer, useMediaQuery } from "@mui/material";
import AppLogo from "../AppLogo";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { useSidebarStore } from "@/store/sidebarStore";

export const drawerWidth = 248;

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleSidebar}
      variant={isDesktop ? "permanent" : "temporary"}
      sx={{ width: drawerWidth, bgcolor: "white" }}
    >
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Box sx={{ py: 1.5, display: "flex", alignItems: "center" }}>
          <AppLogo />
          {!isDesktop && <ToggleSidebarButton />}
        </Box>
      </Container>
    </Drawer>
  );
}
