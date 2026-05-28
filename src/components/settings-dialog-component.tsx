import { Settings, Moon, Sun, Monitor, FolderOpen, Smartphone, Cpu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function SettingsDialogComponent() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { outputFolder, setOutputFolder, language, setLanguage } =
    useSettingsStore();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === 'pt' ? 'pt-BR' : 'en');
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="cursor-pointer">
              <Settings className="size-5" />
              <span className="sr-only">{t('header.settings')}</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('header.settings')}</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{t('settings.title')}</DialogTitle>
          <DialogDescription>
            {t('settings.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Monitor className="size-4" />
              {t('settings.sections.general')}
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="folder">{t('settings.output.label')}</Label>
              <div className="flex gap-2">
                <Input
                  id="folder"
                  value={outputFolder}
                  onChange={(e) => setOutputFolder(e.target.value)}
                  placeholder={t('settings.output.placeholder')}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  title={t('settings.output.browse')}
                  className="shrink-0"
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Cpu className="size-4" />
              {t('settings.sections.conversion')}
            </h4>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="preset" className="flex items-center gap-2">
                  <Smartphone className="size-3" />
                  {t('settings.presets.label')}
                </Label>
                <Select disabled>
                  <SelectTrigger id="preset">
                    <SelectValue placeholder={t('settings.presets.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kindle">Kindle Paperwhite (300 DPI)</SelectItem>
                    <SelectItem value="kobo">Kobo Libra/Sage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="compression">{t('settings.compression.label')}</Label>
                <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs" disabled>{t('settings.compression.low')}</Button>
                  <Button variant="secondary" size="sm" className="flex-1 text-xs font-bold" disabled>{t('settings.compression.medium')}</Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs" disabled>{t('settings.compression.high')}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
