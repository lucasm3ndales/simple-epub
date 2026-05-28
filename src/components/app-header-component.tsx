import { AppLogoComponent } from "./app-logo-component";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitHubIcon } from "./github-icon-component";
import { useTranslation } from "react-i18next";
import { SettingsDialogComponent } from "./settings-dialog-component";

export function AppHeaderComponent() {
  const { t } = useTranslation();

  const handleGithubClick = () => {
    window.open("https://github.com/lucasvtiradentes/simple-epub", "_blank");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <AppLogoComponent />

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-lg" onClick={handleGithubClick} className="cursor-pointer">
                <GitHubIcon className="h-7 w-auto" />
                <span className="sr-only">{t('app.github')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('app.github')}</TooltipContent>
          </Tooltip>

          <SettingsDialogComponent />
        </div>
      </div>
    </header>
  );
}
