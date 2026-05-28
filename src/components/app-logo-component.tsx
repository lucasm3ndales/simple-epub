import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppLogoComponent() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-4 select-none">
      <Tooltip>
        <TooltipTrigger asChild>
          <h1 className="text-xl font-bold tracking-tight">{t('app.title')}</h1>
        </TooltipTrigger>
        <TooltipContent>{t('app.description')}</TooltipContent>
      </Tooltip>
    </div>
  );
}
