import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Button, Divider, Typography } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { Mail, PersonOutline } from "@mui/icons-material";
import { api } from "@/lib/api";
import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import type { GenericDetailResponse } from "@/types/auth";
import { useToastStore } from "@/store/toastStore";

const getInitials = (first_name: string, last_name: string) => {
  return first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();
};

export default function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useToastStore((state) => state.showToast);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post<GenericDetailResponse>(
        API_ENDPOINTS.AUTH.LOGOUT
      );

      if (response.success) {
        showToast(response.data.detail, "info");
        logout();
      }
    } catch {
      showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {getInitials(
                user?.first_name as string,
                user?.last_name as string
              )}
            </Avatar>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonOutline fontSize="small" />
            <Typography variant="subtitle2">
              {user?.first_name} {user?.last_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Mail fontSize="small" />
            <Typography variant="body2">{user?.email}</Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
