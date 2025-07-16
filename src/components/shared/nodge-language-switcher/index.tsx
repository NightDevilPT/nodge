"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/config";

interface LanguageSwitcherProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showFlag?: boolean;
  showText?: boolean;
  className?: string;
  align?: "center" | "start" | "end";
}

export function LanguageSwitcher({
  variant = "ghost",
  size = "default",
  showFlag = true,
  showText = true,
  className,
  align = "end",
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");

  // Sync language with i18n instance
  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng") as SupportedLanguage;
    const validLang = storedLang && SUPPORTED_LANGUAGES[storedLang] 
      ? storedLang 
      : "en";
    
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang);
    }
    setCurrentLang(validLang);
  }, [i18n]);

  const currentLanguage = SUPPORTED_LANGUAGES[currentLang];

  const handleLanguageChange = (languageCode: SupportedLanguage) => {
    i18n.changeLanguage(languageCode);
    setCurrentLang(languageCode);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between gap-2",
            size === "icon" ? "w-10 px-0" : "px-3",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {size !== "icon" && <Globe className="h-4 w-4 shrink-0" />}
            {showFlag && <span>{currentLanguage.flag}</span>}
            {showText && size !== "icon" && (
              <span className="truncate">{currentLanguage.name}</span>
            )}
          </div>
          {size !== "icon" && (
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[200px] p-0" 
        align={align}
        sideOffset={5}
      >
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No language found</CommandEmpty>
            <CommandGroup>
              {Object.entries(SUPPORTED_LANGUAGES).map(
                ([code, { name, flag }]) => (
                  <CommandItem
                    key={code}
                    value={`${code}-${name}`}
                    onSelect={() => handleLanguageChange(code as SupportedLanguage)}
                    className="cursor-pointer gap-2"
                  >
                    <span className="text-lg">{flag}</span>
                    <span>{name}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentLang === code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}