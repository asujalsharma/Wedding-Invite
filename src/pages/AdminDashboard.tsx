import React, { useState, useEffect } from 'react';
import {
  Lock,
  Save,
  Eye,
  LogOut,
  Calendar,
  Image,
  MapPin,
  Trash2,
  Plus,
  CheckCircle2,
  Smartphone,
  Monitor,
  Upload,
  RefreshCw
} from 'lucide-react';
import { api, WeddingData } from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('wedding_admin_token'));
  const [email, setEmail] = useState('admin@wedding.com');
  const [password, setPassword] = useState('weddingadmin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [invitation, setInvitation] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'events' | 'venue' | 'gallery'>('content');

  // Preview Mode
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Check login & load data
  useEffect(() => {
    if (token) {
      loadInvitationData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await api.login(email, password);
      localStorage.setItem('wedding_admin_token', res.token);
      setToken(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wedding_admin_token');
    setToken(null);
  };

  const loadInvitationData = async () => {
    setLoading(true);
    try {
      const data = await api.getInvitation('uday-preeti');
      setInvitation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInvitation = async () => {
    if (!invitation || !token) return;
    setLoading(true);
    try {
      const updated = await api.updateInvitation(invitation.slug, invitation, token);
      setInvitation(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert('Error updating invitation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetKey: string) => {
    const file = e.target.files?.[0];
    if (!file || !token || !invitation) return;

    try {
      const res = await api.uploadMedia(file, token);
      if (targetKey === 'venue') {
        setInvitation({
          ...invitation,
          venue: { ...invitation.venue, image: res.url }
        });
      } else if (targetKey === 'gallery') {
        const newItem = {
          id: 'gal-' + Date.now(),
          url: res.url,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Uploaded'
        };
        setInvitation({
          ...invitation,
          gallery: [...invitation.gallery, newItem]
        });
      }
      alert('File uploaded successfully!');
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    }
  };

  // If not logged in, show Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl p-8 border border-[#D4AF37]/45 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] text-[#7E152D] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif text-center font-bold text-[#5C0D1E]">
            Wedding Host Portal
          </h2>
          <p className="text-xs text-center text-[#8C6718] mt-1 mb-6">
            Log in to manage Uday & Preeti's royal wedding invitation
          </p>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-sans font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-sans font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7E152D] to-[#9E243F] hover:from-[#5C0D1E] hover:to-[#7E152D] text-white text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-lg border border-[#D4AF37]/50 transition-all"
            >
              {loginLoading ? 'Signing In...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-[#FAF5EB] rounded-xl border border-[#D4AF37]/25 text-[11px] text-[#8C6718] text-center">
            Default credentials: <span className="font-mono text-[#7E152D]">admin@wedding.com</span> / <span className="font-mono text-[#7E152D]">weddingadmin123</span>
          </div>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <RefreshCw className="w-8 h-8 text-[#B8860B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-gray-800 pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] text-[#7E152D] border border-[#D4AF37]/40 flex items-center justify-center font-bold font-serif">
            UP
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#5C0D1E]">
              {invitation.partnerOne} & {invitation.partnerTwo} — Royal Invitation Suite
            </h1>
            <p className="text-[11px] text-gray-500">
              Live link: <a href={`/${invitation.slug}`} target="_blank" rel="noreferrer" className="text-[#7E152D] underline font-medium">/{invitation.slug}</a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FAF3E0] text-[#7E152D] hover:bg-[#F3E6C4] border border-[#D4AF37]/35 text-xs font-semibold transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="hidden sm:inline">Mobile Preview</span>
          </button>

          <button
            onClick={handleSaveInvitation}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#7E152D] to-[#9E243F] hover:from-[#5C0D1E] hover:to-[#7E152D] text-white text-xs font-semibold shadow-sm border border-[#D4AF37]/50 transition-all"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Save Changes</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'content', label: 'Couple & Invitation', icon: Calendar },
            { id: 'events', label: 'Ceremony Schedule', icon: Calendar },
            { id: 'venue', label: 'Venue & Map', icon: MapPin },
            { id: 'gallery', label: 'Photo Gallery', icon: Image },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[#7E152D] text-white shadow-sm border border-[#D4AF37]/50'
                    : 'bg-[#FFFDF9] text-[#5C0D1E] hover:bg-[#FAF3E0] border border-[#D4AF37]/35'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Couple & Invitation Letter Content */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1F3C55]">
                Couple Names & Wedding Date
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Partner One
                  </label>
                  <input
                    type="text"
                    value={invitation.partnerOne}
                    onChange={(e) => setInvitation({ ...invitation, partnerOne: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Partner Two
                  </label>
                  <input
                    type="text"
                    value={invitation.partnerTwo}
                    onChange={(e) => setInvitation({ ...invitation, partnerTwo: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Announcement Tagline
                </label>
                <input
                  type="text"
                  value={invitation.announcementText}
                  onChange={(e) => setInvitation({ ...invitation, announcementText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Wedding Ceremony Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={new Date(invitation.weddingDate).toISOString().slice(0, 16)}
                  onChange={(e) => setInvitation({ ...invitation, weddingDate: new Date(e.target.value).toISOString() })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Custom URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-xs text-gray-500">
                    /
                  </span>
                  <input
                    type="text"
                    value={invitation.slug}
                    onChange={(e) => setInvitation({ ...invitation, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    className="w-full px-3.5 py-2 rounded-r-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Letter Customization */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1F3C55]">
                Powder Blue Envelope Letter
              </h3>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Letter Heading
                </label>
                <input
                  type="text"
                  value={invitation.letterHeading}
                  onChange={(e) => setInvitation({ ...invitation, letterHeading: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#73B2D9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Personalized Invitation Letter Body
                </label>
                <textarea
                  rows={6}
                  value={invitation.letterBody}
                  onChange={(e) => setInvitation({ ...invitation, letterBody: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-serif leading-relaxed focus:border-[#73B2D9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                  Letter Signoff
                </label>
                <textarea
                  rows={2}
                  value={invitation.letterSignoff}
                  onChange={(e) => setInvitation({ ...invitation, letterSignoff: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-serif focus:border-[#73B2D9] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Events & Schedule */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F3C55]">
                  Ceremony Schedule ({invitation.functions.length} Events)
                </h3>
                <p className="text-xs text-gray-500">Edit Haldi, Mehendi, Sangeet, Wedding Ceremony, and Reception details</p>
              </div>

              <button
                onClick={() => {
                  const newEvent = {
                    id: 'func-' + Date.now(),
                    title: 'New Celebration',
                    subtitle: 'Celebration subtitle',
                    date: 'Thursday, Nov 26, 2026',
                    time: '6:00 PM',
                    venue: 'Villa Terraces',
                    address: 'Villa del Lago',
                    dressCode: 'Formal Elegance',
                    description: 'Celebrate together with dinner and music.',
                    icon: 'Sparkles',
                    image: '/assets/couple_terrace.jpg'
                  };
                  setInvitation({
                    ...invitation,
                    functions: [...invitation.functions, newEvent]
                  });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1F3C55] text-white text-xs font-semibold hover:bg-[#2A5171]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {invitation.functions.map((fn, index) => (
                <div key={fn.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#73B2D9]">
                      Ceremony #{index + 1}
                    </span>
                    <button
                      onClick={() => {
                        setInvitation({
                          ...invitation,
                          functions: invitation.functions.filter(f => f.id !== fn.id)
                        });
                      }}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={fn.title}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].title = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Date</label>
                      <input
                        type="text"
                        value={fn.date}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].date = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Time</label>
                      <input
                        type="text"
                        value={fn.time}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].time = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Venue</label>
                      <input
                        type="text"
                        value={fn.venue}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].venue = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Dress Code</label>
                      <input
                        type="text"
                        value={fn.dressCode || ''}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].dressCode = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={fn.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...invitation.functions];
                          updated[index].subtitle = e.target.value;
                          setInvitation({ ...invitation, functions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-[11px] uppercase font-semibold text-gray-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={fn.description || ''}
                      onChange={(e) => {
                        const updated = [...invitation.functions];
                        updated[index].description = e.target.value;
                        setInvitation({ ...invitation, functions: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-sm font-serif"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Venue & Map */}
        {activeTab === 'venue' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm max-w-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1F3C55]">
              Venue & Navigation Settings
            </h3>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Venue Name</label>
              <input
                type="text"
                value={invitation.venue.name}
                onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, name: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Tagline</label>
              <input
                type="text"
                value={invitation.venue.tagline || ''}
                onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, tagline: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={invitation.venue.address}
                onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, address: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Google Maps URL</label>
              <input
                type="text"
                value={invitation.venue.mapUrl}
                onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, mapUrl: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Travel & Parking Details</label>
              <textarea
                rows={3}
                value={invitation.venue.details || ''}
                onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, details: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-serif"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Venue Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={invitation.venue.image || ''}
                  onChange={(e) => setInvitation({ ...invitation, venue: { ...invitation.venue, image: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
                />
                <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'venue')} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F3C55]">
                  Photo Gallery ({invitation.gallery.length} Images)
                </h3>
                <p className="text-xs text-gray-500">Curate photographs of Uday and Preeti displayed in the editorial grid</p>
              </div>

              <label className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1F3C55] text-white text-xs font-semibold hover:bg-[#2A5171] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'gallery')} />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {invitation.gallery.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-3">
                  <img src={item.url} alt={item.caption || ''} className="w-full h-44 object-cover rounded-xl mb-3" />
                  <input
                    type="text"
                    value={item.caption || ''}
                    placeholder="Caption..."
                    onChange={(e) => {
                      const updated = [...invitation.gallery];
                      updated[idx].caption = e.target.value;
                      setInvitation({ ...invitation, gallery: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs mb-2"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">#{idx + 1}</span>
                    <button
                      onClick={() => {
                        setInvitation({
                          ...invitation,
                          gallery: invitation.gallery.filter(g => g.id !== item.id)
                        });
                      }}
                      className="text-rose-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Mobile / Desktop Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-gray-800">Live Invitation Preview</span>
                <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-xl">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${
                      previewDevice === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile (iPhone)</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${
                      previewDevice === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Desktop</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold"
              >
                Close ✕
              </button>
            </div>

            {/* Preview Frame Body */}
            <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center overflow-auto">
              {previewDevice === 'mobile' ? (
                /* Mobile Phone Mockup */
                <div className="w-[390px] h-[780px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-gray-800 relative flex flex-col shrink-0">
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50" />
                  <div className="w-full h-full rounded-[40px] overflow-hidden bg-white">
                    <iframe
                      src={`/${invitation.slug}`}
                      title="Mobile Invitation Preview"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              ) : (
                /* Desktop Preview Frame */
                <div className="w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  <iframe
                    src={`/${invitation.slug}`}
                    title="Desktop Invitation Preview"
                    className="w-full h-full border-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
