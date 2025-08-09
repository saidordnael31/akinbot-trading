"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, defaultLanguage } from "@/lib/i18n"
import { translations } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language from localStorage
    try {
      const savedLanguage = localStorage.getItem("agroderi-language") as Language
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.log("Error loading saved language:", error)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    console.log("🔄 LanguageContext: Setting language to", lang)
    setLanguage(lang)
    try {
      localStorage.setItem("agroderi-language", lang)
      console.log("💾 Language saved to localStorage:", lang)
    } catch (error) {
      console.log("❌ Error saving language:", error)
    }
  }

  const t = (key: string): string => {
    // Always return translated text, even during SSR
    try {
      const currentTranslations = translations[language] || translations[defaultLanguage]

      // Simple key lookup
      if (currentTranslations[key]) {
        return currentTranslations[key]
      }

      // Try nested key lookup
      const keys = key.split(".")
      let value: any = currentTranslations

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k]
        } else {
          // Fallback to default language
          let fallbackValue: any = translations[defaultLanguage]
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === "object" && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey]
            } else {
              return key // Return key if translation not found
            }
          }
          return fallbackValue || key
        }
      }

      return typeof value === "string" ? value : key
    } catch (error) {
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
