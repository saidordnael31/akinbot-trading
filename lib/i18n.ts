export type Language = "pt" | "en" | "es" | "fr" | "de" | "ru" | "zh"

export const languages: Record<Language, { name: string; flag: string }> = {
  pt: { name: "Português", flag: "🇧🇷" },
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  ru: { name: "Русский", flag: "🇷🇺" },
  zh: { name: "中文", flag: "🇨🇳" },
}

export const defaultLanguage: Language = "pt"
