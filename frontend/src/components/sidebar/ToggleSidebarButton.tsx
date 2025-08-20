import { useSidebarStore } from "@/store/sidebarStore";
import { Menu } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ToggleSidebarButton() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  return (
    <Button aria-label="toggle sidebar" onClick={toggleSidebar}>
      <Menu />
    </Button>
  );
}
