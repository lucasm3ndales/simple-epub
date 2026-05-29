import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppLogoComponent() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-2 select-none">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="size-8 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Simple<span className="text-brand">EPUB</span>
            </h1>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start">{t('app.description')}</TooltipContent>
      </Tooltip>
    </div>
  );
}
