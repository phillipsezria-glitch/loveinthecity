// Social media links utility using environment variables

export interface SocialLinks {
  telegram: string;
  telegramSupport: string;
  whatsapp: string;
  whatsappSupport: string;
  instagram: string;
  facebook: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  website: string;
  emailSupport: string;
  emailContact: string;
}

export const socialLinks: SocialLinks = {
  telegram: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/TrueLove_Official01',
  telegramSupport: import.meta.env.VITE_TELEGRAM_SUPPORT || 'https://t.me/TrueLove_Official01',
  whatsapp: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/14089140908',
  whatsappSupport: import.meta.env.VITE_WHATSAPP_SUPPORT || 'https://wa.me/14089140908',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || '#',
  facebook: import.meta.env.VITE_FACEBOOK_URL || '#',
  twitter: import.meta.env.VITE_TWITTER_URL || '#',
  tiktok: import.meta.env.VITE_TIKTOK_URL || '#',
  youtube: import.meta.env.VITE_YOUTUBE_URL || '#',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '#',
  website: import.meta.env.VITE_WEBSITE_URL || '#',
  emailSupport: import.meta.env.VITE_EMAIL_SUPPORT || 'support@truelovecity.com',
  emailContact: import.meta.env.VITE_EMAIL_CONTACT || 'contact@truelovecity.com',
};

// Helper functions for common social media actions
export const generateTelegramLink = (username: string) => {
  return `https://t.me/${username.replace('@', '')}`;
};

export const generateWhatsAppLink = (phone: string) => {
  return `https://wa.me/${phone.replace(/[^\d]/g, '')}`;
};

export const generateEmailLink = (email: string, subject?: string) => {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${params}`;
};

export const generatePhoneLink = (phone: string) => {
  return `tel:${phone.replace(/[^\d]/g, '')}`;
};

// Social media sharing functions
export const shareOnTwitter = (text: string, url?: string) => {
  const baseUrl = 'https://twitter.com/intent/tweet';
  const params = new URLSearchParams({
    text: text,
    ...(url && { url }),
  });
  return `${baseUrl}?${params.toString()}`;
};

export const shareOnFacebook = (url: string) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
};

export const shareOnWhatsApp = (text: string) => {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

export const shareOnTelegram = (text: string, url?: string) => {
  const message = url ? `${text} ${url}` : text;
  return `https://t.me/share/url?url=${encodeURIComponent(url || '')}&text=${encodeURIComponent(text)}`;
};
