export interface WeddingData {
  _id?: string;
  slug: string;
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string | Date;
  announcementText: string;
  letterHeading: string;
  letterBody: string;
  letterSignoff: string;
  venue: {
    name: string;
    tagline?: string;
    address: string;
    city: string;
    state?: string;
    mapUrl: string;
    details?: string;
    image?: string;
  };
  functions: Array<{
    id: string;
    title: string;
    subtitle?: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    dressCode?: string;
    description?: string;
    icon?: string;
    image?: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    caption?: string;
    category?: string;
  }>;
  musicTrack: {
    title: string;
    artist: string;
    url: string;
    enabled: boolean;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    ivory: string;
  };
  isPublished: boolean;
}

export const DEFAULT_INVITATION: WeddingData = {
  slug: 'uday-priti',
  partnerOne: 'Uday',
  partnerTwo: 'Priti',
  weddingDate: '2026-11-25T17:00:00.000Z',
  announcementText: 'cordially invite you to celebrate their auspicious wedding union',
  letterHeading: "॥ शुभ विवाह ॥ You're Cordially Invited",
  letterBody: "With the divine blessings of Lord Ganesha and our elders, we joyfully invite you to celebrate the wedding ceremony of Uday & Priti.\n\nYour gracious presence and heartfelt blessings will add boundless joy and sanctity as we unite in holy matrimony.",
  letterSignoff: "With love & respect,\nUday & Priti",
  venue: {
    name: "Shri Radhey Paradise Marriage Garden",
    tagline: "Wedding & Reception Venue",
    address: "Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road",
    city: "Gwalior (M.P.)",
    mapUrl: "https://maps.google.com/?q=Shri+Radhey+Paradise+Marriage+Garden+Gwalior",
    details: "The Baraat procession will depart on Wednesday, November 25, 2026 at 8:30 PM from Hazira Mallgaddha Police Station towards Shri Radhey Paradise Marriage Garden.",
    image: "/assets/indian_marriage_garden_venue.jpg"
  },
  functions: [
    {
      id: 'func-mandap',
      title: 'Mandap Ceremony',
      subtitle: 'Auspicious Mandap Puja & Vedic Blessings',
      date: 'Monday, November 23, 2026',
      time: 'Morning Auspicious Muhurat',
      venue: 'Residence Courtyard',
      address: 'Gwalior (M.P.)',
      dressCode: 'Festive Ethnic Yellow & Traditional',
      description: 'The auspicious commencement of the wedding rituals with sacred Mandap Puja, Kalash Sthapana and family prayers.',
      icon: 'Sun',
      image: '/assets/indian_mandap_ceremony.jpg'
    },
    {
      id: 'func-panigrahan',
      title: 'Tika & Wedding Ceremony (Panigrahan Sanskar)',
      subtitle: 'Vedic Chants, Tika & Seven Sacred Vows',
      date: 'Wednesday, November 25, 2026',
      time: 'Evening Auspicious Muhurat',
      venue: 'Shri Radhey Paradise Marriage Garden',
      address: 'Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
      dressCode: 'Royal Traditional Festive Attire (Sherwani & Lehengas)',
      description: 'Join us as Uday & Priti take the sacred seven vows (Saat Phere) around the holy fire and unite in eternal Vedic matrimony.',
      icon: 'Heart',
      image: '/assets/indian_panigrahan_saat_phere.jpg'
    },
    {
      id: 'func-aashirwad',
      title: 'Blessings & Dinner Reception (Aashirwad & Preetibhoj)',
      subtitle: 'Grand Dinner Reception & Evening Celebrations',
      date: 'Wednesday, November 25, 2026',
      time: '7:00 PM onwards till your arrival',
      venue: 'Shri Radhey Paradise Marriage Garden',
      address: 'Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
      dressCode: 'Evening Festive Royal / Traditional Elegance',
      description: 'Shower your heartfelt blessings upon the newlyweds and join us for a grand celebratory royal dinner feast.',
      icon: 'Sparkles',
      image: '/assets/indian_reception_celebration.jpg'
    },
    {
      id: 'func-vadhu-aagman',
      title: 'Vadhu Aagman (Welcome of the Bride)',
      subtitle: 'Griha Pravesh & Auspicious Welcome',
      date: 'Thursday, November 26, 2026',
      time: 'Morning Auspicious Welcome',
      venue: 'Residence Courtyard',
      address: 'Gwalior (M.P.)',
      dressCode: 'Traditional Indian Elegance',
      description: 'A warm and affectionate welcome into the family home as Priti steps into her new life with auspicious Griha Pravesh rituals.',
      icon: 'Flower2',
      image: '/assets/indian_vadhu_aagman.jpg'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      url: '/assets/indian_panigrahan_saat_phere.jpg',
      caption: 'Sacred Seven Vows & Panigrahan Sanskar — Uday & Priti',
      category: 'Saat Phere'
    },
    {
      id: 'gal-2',
      url: '/assets/indian_wedding_palace_scenic.jpg',
      caption: 'Royal Palace Jharokha & Sandstone Courtyard',
      category: 'Royal Heritage'
    },
    {
      id: 'gal-3',
      url: '/assets/indian_mandap_ceremony.jpg',
      caption: 'Auspicious Vedic Mandap & Sacred Havan Kund',
      category: 'Mandap'
    },
    {
      id: 'gal-4',
      url: '/assets/indian_reception_celebration.jpg',
      caption: 'Grand Illuminated Evening Reception Stage',
      category: 'Preetibhoj'
    },
    {
      id: 'gal-5',
      url: '/assets/indian_marriage_garden_venue.jpg',
      caption: 'Shri Radhey Paradise Marriage Garden Lawn',
      category: 'Venue'
    },
    {
      id: 'gal-6',
      url: '/assets/indian_vadhu_aagman.jpg',
      caption: 'Auspicious Griha Pravesh & Traditional Welcome',
      category: 'Vadhu Aagman'
    }
  ],
  musicTrack: {
    title: 'Sacred Shehnai & Sitar Melody',
    artist: 'Vedic Raga Ensemble',
    url: '',
    enabled: true
  },
  palette: {
    primary: '#7E152D',
    secondary: '#9E243F',
    accent: '#D4AF37',
    ivory: '#FFFDF9'
  },
  isPublished: true
};

const STORAGE_KEY_PREFIX = 'wedding_invitation_data_';

// 100% Client-Side Service
export const api = {
  async getInvitation(slug: string = 'uday-priti'): Promise<WeddingData> {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + slug);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_INVITATION;
  },

  async updateInvitation(slug: string, data: Partial<WeddingData>, _token?: string): Promise<WeddingData> {
    const current = await this.getInvitation(slug);
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY_PREFIX + slug, JSON.stringify(updated));
    return updated;
  },

  async login(email: string, password: string) {
    if (email.trim().toLowerCase() === 'admin@wedding.com' && password === 'weddingadmin123') {
      const dummyToken = 'client-token-' + Date.now();
      return {
        token: dummyToken,
        admin: {
          id: 'admin-1',
          email: 'admin@wedding.com',
          name: 'Wedding Host'
        }
      };
    }
    throw new Error('Invalid email or password');
  },

  async uploadMedia(file: File, _token?: string): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ url: reader.result as string });
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
};
