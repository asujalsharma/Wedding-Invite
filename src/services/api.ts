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
  announcementText: 'are getting married!',
  letterHeading: "You're invited!",
  letterBody: "Dear Friends and Family,\n\nAs we get ready to say 'I do,' we feel grateful for the wonderful people in our lives.\n\nYour support means the world to us, and we would be honored to have you with us as we begin our life together.",
  letterSignoff: "With love,\nUday & Priti",
  venue: {
    name: "Shri Radhey Paradise Marriage Garden",
    tagline: "Wedding & Reception Venue",
    address: "Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road",
    city: "Gwalior (M.P.)",
    mapUrl: "https://maps.google.com/?q=Shri+Radhey+Paradise+Marriage+Garden+Gwalior",
    details: "The Baraat procession will depart on Wednesday, November 25, 2026 at 8:30 PM from Hazira Mallgaddha Police Station towards Shri Radhey Paradise Marriage Garden.",
    image: "/assets/venue_villa.jpg"
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
      description: 'The auspicious commencement of the wedding rituals with sacred Mandap Puja and family prayers.',
      icon: 'Sun',
      image: '/assets/rings_stationery.jpg'
    },
    {
      id: 'func-panigrahan',
      title: 'Tika & Wedding Ceremony (Panigrahan Sanskar)',
      subtitle: 'Vedic Chants, Tika & Seven Sacred Vows',
      date: 'Wednesday, November 25, 2026',
      time: 'Evening Auspicious Muhurat',
      venue: 'Shri Radhey Paradise Marriage Garden',
      address: 'Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
      dressCode: 'Royal Traditional Festive Attire',
      description: 'Join us as Uday & Priti take the sacred seven vows (Saat Phere) and unite in eternal matrimony.',
      icon: 'Heart',
      image: '/assets/couple_terrace.jpg'
    },
    {
      id: 'func-aashirwad',
      title: 'Blessings & Dinner Reception (Aashirwad & Preetibhoj)',
      subtitle: 'Grand Dinner Reception & Evening Celebrations',
      date: 'Wednesday, November 25, 2026',
      time: '7:00 PM onwards till your arrival',
      venue: 'Shri Radhey Paradise Marriage Garden',
      address: 'Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
      dressCode: 'Evening Formal / Festive Elegance',
      description: 'Shower your heartfelt blessings upon the newlyweds and join us for a celebratory dinner feast.',
      icon: 'Sparkles',
      image: '/assets/lake_arch_scenic.jpg'
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
      description: 'A warm and affectionate welcome into the family home as Priti steps into her new life.',
      icon: 'Flower2',
      image: '/assets/couple_terrace.jpg'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      url: '/assets/couple_terrace.jpg',
      caption: 'Sunset on the Lake Terrace — Uday & Priti',
      category: 'Portraits'
    },
    {
      id: 'gal-2',
      url: '/assets/lake_arch_scenic.jpg',
      caption: 'Framed by Stone Arches and Quiet Waters',
      category: 'Scenery'
    },
    {
      id: 'gal-3',
      url: '/assets/rings_stationery.jpg',
      caption: 'The Rings & Handcrafted Botanical Invitation',
      category: 'Details'
    },
    {
      id: 'gal-4',
      url: '/assets/venue_villa.jpg',
      caption: 'Villa del Lago Estate & Lakeside Promenades',
      category: 'Venue'
    },
    {
      id: 'gal-5',
      url: '/assets/garden_gate.jpg',
      caption: 'The Garden Gate Opening to Forever',
      category: 'Gate'
    }
  ],
  musicTrack: {
    title: 'Romantic Piano & Strings Serenade',
    artist: 'Classical Ensemble',
    url: '',
    enabled: true
  },
  palette: {
    primary: '#73B2D9',
    secondary: '#3D7BAA',
    accent: '#D4AF37',
    ivory: '#FDFCF7'
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
