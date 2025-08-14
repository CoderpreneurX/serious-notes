import { Button } from "@mui/material";
import { GitHubIcon } from "../CustomIcons";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export default function ContinueWithGitHubButton() {
  const showToast = useToastStore((state) => state.showToast);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    showToast("Redirecting to GitHub...", "info");
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
    window.location.href = redirectUrl;
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleClick}
      variant="outlined"
      loadingPosition="start"
      startIcon={<GitHubIcon />}
    >
      Continue with GitHub
    </Button>
  );
}
