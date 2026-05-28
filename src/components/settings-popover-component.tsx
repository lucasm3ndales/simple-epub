import { Settings, Moon, Sun, Monitor, FolderOpen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useSettingsStore } from "@/store/settings-store";
import { useTranslation } from "react-i18next";

export function SettingsPopoverComponent() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { outputFolder, setOutputFolder, language, setLanguage } =
    useSettingsStore();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === 'pt' ? 'pt-BR' : 'en');
  };

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-lg">
              <Settings className="size-5" />
              <span className="sr-only">{t('header.settings')}</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('header.settings')}</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold leading-none text-lg">{t('settings.title')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('settings.description')}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="language">{t('settings.language.label')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language">
                  <SelectValue placeholder={t('settings.language.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('settings.language.en')}</SelectItem>
                  <SelectItem value="pt">{t('settings.language.pt')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="theme">{t('settings.theme.label')}</Label>
              <Select
                value={theme}
                onValueChange={(v) =>
                  setTheme(v as "light" | "dark" | "system")
                }
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder={t('settings.theme.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>{t('settings.theme.light')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>{t('settings.theme.dark')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>{t('settings.theme.system')}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="folder">{t('settings.output.label')}</Label>
              <div className="flex gap-2">
                <Input
                  id="folder"
                  value={outputFolder}
                  onChange={(e) => setOutputFolder(e.target.value)}
                  placeholder={t('settings.output.placeholder')}
                />
                <Button
                  variant="outline"
                  size="icon"
                  title={t('settings.output.browse')}
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
