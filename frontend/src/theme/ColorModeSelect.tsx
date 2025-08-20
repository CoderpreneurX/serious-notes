import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";

export default function ColorModeButton() {
  const { mode, setMode, systemMode } = useColorScheme();
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    if (!toggled) {
      // Force opposite of system
      setMode(systemMode === "light" ? "dark" : "light");
    } else {
      // Back to system
      setMode("system");
    }
    setToggled(!toggled);
  };

  const renderIcon = () => {
    if ((mode === "system" && systemMode === "dark") || mode === "dark") {
      return <LightModeIcon />;
    }
    if ((mode === "system" && systemMode === "light") || mode === "light") {
      return <DarkModeIcon />;
    }
  };

  return (
    <Button sx={{ maxWidth: "max-content" }} onClick={handleClick} data-screenshot="toggle-mode" color="inherit">
      {renderIcon()}
    </Button>
  );
}
