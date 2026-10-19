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
import { ClosingSection } from '../components/ClosingSection';

export const InvitationPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const activeSlug = slug || 'uday-priti';

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
        // Fallback default for Uday & Priti if backend isn't reached immediately
        setData({
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F6FA] select-none">
        <div className="w-12 h-12 rounded-full border-2 border-[#73B2D9] border-t-transparent animate-spin mb-4" />
        <p className="font-serif italic text-[#31628A] tracking-wider text-sm">
          Preparing your bespoke invitation...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-gray-800">Invitation not found</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#1F3C55] overflow-x-hidden">
      {/* Floating Romantic Music Player */}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#2A5171] border border-[#C4DCED] shadow-md backdrop-blur-md text-[11px] font-sans uppercase tracking-wider font-medium transition-all"
            title="Replay opening cinematic scenes"
          >
            <RotateCcw className="w-3 h-3 text-[#5297C7]" />
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
