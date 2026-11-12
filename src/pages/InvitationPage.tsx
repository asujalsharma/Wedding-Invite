import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

import { api, WeddingData } from '../services/api';
import { MusicPlayer } from '../components/MusicPlayer';
import { LandscapeAnnouncementScene } from '../components/LandscapeAnnouncementScene';
import { EnvelopeLetterScene } from '../components/EnvelopeLetterScene';
import { CountdownSection } from '../components/CountdownSection';
import { WeddingFunctionsSection } from '../components/WeddingFunctionsSection';
import { VenueSection } from '../components/VenueSection';
import { GallerySection } from '../components/GallerySection';
import { ClosingSection } from '../components/ClosingSection';

export const InvitationPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const activeSlug = slug || 'uday-preeti';

  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scene state: starts directly from Save the Date ('announcement') -> 'envelope' -> 'details'
  const [currentScene, setCurrentScene] = useState<'announcement' | 'envelope' | 'details'>('announcement');

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const inv = await api.getInvitation(activeSlug);
        setData(inv);
      } catch (err: any) {
        console.error('Fetch error:', err);
        // Fallback default for Uday & Preeti if backend isn't reached immediately
        setData({
          slug: 'uday-preeti',
          partnerOne: 'Uday',
          partnerTwo: 'Preeti',
          weddingDate: '2026-11-25T17:00:00.000Z',
          announcementText: 'cordially invite you to celebrate their auspicious wedding union',
          letterHeading: "॥ शुभ विवाह ॥ You're Cordially Invited",
          letterBody: "With the divine blessings of Lord Ganesha and our elders, we joyfully invite you to celebrate the wedding ceremony of Uday & Preeti.\n\nYour gracious presence and heartfelt blessings will add boundless joy and sanctity as we unite in holy matrimony.",
          letterSignoff: "With love & respect,\nUday & Preeti",
          venue: {
            name: "Shri Radhey Paradise Marriage Garden",
            tagline: "Royal Wedding & Reception Venue",
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
              description: 'Join us as Uday & Preeti take the sacred seven vows (Saat Phere) around the holy fire and unite in eternal Vedic matrimony.',
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
              description: 'A warm and affectionate welcome into the family home as Preeti steps into her new life with auspicious Griha Pravesh rituals.',
              icon: 'Flower2',
              image: '/assets/indian_vadhu_aagman.jpg'
            }
          ],
          gallery: [
            {
              id: 'gal-1',
              url: '/assets/indian_panigrahan_saat_phere.jpg',
              caption: 'Sacred Seven Vows & Panigrahan Sanskar — Uday & Preeti',
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
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSlug]);

  const scrollToDetails = () => {
    setCurrentScene('details');
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const replayOpening = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene('announcement');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F0] select-none">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mb-4" />
        <p className="font-devanagari text-[#7E152D] tracking-widest text-base font-bold mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="font-serif italic text-[#8C6718] tracking-wider text-sm">
          Preparing your royal wedding invitation...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FAF7F0]">
        <h2 className="text-2xl font-serif text-[#5C0D1E]">Invitation not found</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#3D0612] overflow-x-hidden">
      {/* Floating Auspicious Music Player */}
      {data.musicTrack.enabled && (
        <MusicPlayer
          customTrackUrl={data.musicTrack.url}
          trackTitle={data.musicTrack.title}
        />
      )}

      {/* Replay Opening & Navigation Floating Controller */}
      {currentScene !== 'announcement' && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
          <button
            onClick={replayOpening}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] text-[#7E152D] border border-[#D4AF37]/60 shadow-md backdrop-blur-md text-[11px] font-sans uppercase tracking-wider font-semibold transition-all"
            title="Replay opening cinematic scenes"
          >
            <RotateCcw className="w-3 h-3 text-[#B8860B]" />
            <span>Replay Opening</span>
          </button>
        </div>
      )}

      {/* Cinematic Animated Scenes Flow */}
      <AnimatePresence mode="wait">
        {/* Scene 1: The Romantic Wedding Announcement (Save the Date) */}
        {currentScene === 'announcement' && (
          <motion.div
            key="scene-announcement"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.8 } }}
          >
            <LandscapeAnnouncementScene
              partnerOne={data.partnerOne}
              partnerTwo={data.partnerTwo}
              announcementText={data.announcementText}
              weddingDate="Wednesday, November 25, 2026"
              onProceedToEnvelope={() => setCurrentScene('envelope')}
            />
          </motion.div>
        )}

        {/* Scene 3: The Blue Envelope and Personal Invitation Letter */}
        {(currentScene === 'envelope' || currentScene === 'details') && (
          <motion.div
            key="scene-envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <EnvelopeLetterScene
              partnerOne={data.partnerOne}
              partnerTwo={data.partnerTwo}
              heading={data.letterHeading}
              body={data.letterBody}
              signoff={data.letterSignoff}
              onScrollToDetails={scrollToDetails}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Complete Wedding Details (Always rendered below Envelope so visitors can scroll down) */}
      <div ref={detailsRef}>
        {/* Real-time Countdown Timer to Nov 25, 2026 */}
        <CountdownSection
          targetDateStr={data.weddingDate}
          partnerOne={data.partnerOne}
          partnerTwo={data.partnerTwo}
        />

        {/* Wedding Ceremonies Timeline (Haldi, Mehendi, Sangeet, Wedding, Reception) */}
        <WeddingFunctionsSection functions={data.functions} />

        {/* Venue & Directions */}
        <VenueSection venue={data.venue} />

        {/* Editorial Photo Gallery with Lightbox */}
        {/* <GallerySection gallery={data.gallery} /> */}

        {/* Closing Note, Share Invitation & Calendar */}
        <ClosingSection
          partnerOne={data.partnerOne}
          partnerTwo={data.partnerTwo}
          weddingDateStr={data.weddingDate}
        />
      </div>
    </div>
  );
};
