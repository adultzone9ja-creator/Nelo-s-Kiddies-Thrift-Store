import React, { createContext, useContext, useState, useEffect } from 'react';

type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  whatsappNumber: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  contactLocation: string;
  contactPhone: string;
  contactCEO: string;
};

type Testimonial = {
  id: string;
  name: string;
  review: string;
  image: string;
};

type SiteContextType = {
  settings: SiteSettings | null;
  testimonials: Testimonial[];
  refreshData: () => void;
};

const SiteContext = createContext<SiteContextType>({ settings: null, testimonials: [], refreshData: () => {} });

export const useSiteData = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const refreshData = async () => {
    try {
      const [settingsRes, testimonialsRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/testimonials')
      ]);
      const [settingsData, testimonialsData] = await Promise.all([
        settingsRes.json(),
        testimonialsRes.json()
      ]);
      setSettings(settingsData);
      setTestimonials(testimonialsData);
    } catch (err) {
      console.error('Failed to fetch site data:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, testimonials, refreshData }}>
      {children}
    </SiteContext.Provider>
  );
};
