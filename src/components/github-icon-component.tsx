import { useTheme } from "./theme-provider";
import githubLogoWhite from "@assets/github-logos/GitHub_Invertocat_White_Clearspace.svg";
import githubLogoBlack from "@assets/github-logos/GitHub_Invertocat_Black_Clearspace.svg";

export function GitHubIcon({ className }: { className?: string }) {
  const { theme } = useTheme();
  
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <img
      src={isDark ? githubLogoWhite : githubLogoBlack}
      alt="GitHub"
      className={className}
    />
  );
}
