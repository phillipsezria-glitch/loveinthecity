/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_URL: string
  readonly VITE_TELEGRAM_SUPPORT: string
  readonly VITE_WHATSAPP_URL: string
  readonly VITE_WHATSAPP_SUPPORT: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_FACEBOOK_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_TIKTOK_URL: string
  readonly VITE_YOUTUBE_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_WEBSITE_URL: string
  readonly VITE_EMAIL_SUPPORT: string
  readonly VITE_EMAIL_CONTACT: string
  readonly VITE_GEMINI_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
