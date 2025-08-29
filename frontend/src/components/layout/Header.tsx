import { AppBar, Box, TextField, Toolbar, useMediaQuery } from "@mui/material";
import ColorModeButton from "@/theme/ColorModeSelect";
import ToggleSidebarButton from "../sidebar/ToggleSidebarButton";
import AppLogo from "@/components/AppLogo";
import UserMenu from "../UserMenu";

type HeaderVariant = "auth" | "main";

interface HeaderProps {
  variant: HeaderVariant;
}

function AuthHeader() {
  return (
    <>
      <AppBar
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #e5eaef",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <AppLogo />
          <ColorModeButton />
        </Toolbar>
      </AppBar>
    </>
  );
}

function MainHeader() {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #e5eaef",
        }}
      >
        <Toolbar sx={{ gap: 0 }}>
          {!isDesktop && <ToggleSidebarButton />}
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              placeholder="Search Notes..."
              sx={{ flexGrow: 1, width: "100%", maxWidth: 425 }}
            />
          </Box>
          <ColorModeButton />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default function Header({ variant }: HeaderProps) {
  return variant === "auth" ? <AuthHeader /> : <MainHeader />;
}
