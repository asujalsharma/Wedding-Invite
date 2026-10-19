# Cinematic Animated Wedding Invitation Website — Uday & Priti

A luxury digital wedding invitation website inspired by European watercolor garden architecture and bespoke wedding stationery, created for **Uday & Priti** celebrating their wedding on **November 25, 2026**.

**Pure Frontend Application**: No backend server or external database is required. Everything runs directly in the browser with persistent local storage for RSVPs and admin customization.

---

## 🌟 Visual & Cinematic Experience Flow

1. **Scene One: The Romantic "Save the Date" Landscape Announcement**
   - Ornate European stone arch framing the calm turquoise waters of Lake Como / Lake Valley reflecting distant mountain peaks.
   - Romantic garden terrace with classical white stone balustrade and climbing white florals.
   - Elegant cursive names: **Uday & Priti**, subtitle *"are getting married!"*, and date *"Wednesday, November 25, 2026"*.
   - Gentle floating rose petals, soft parallax, and tactile *"Open Sealed Letter"* button that begins romantic acoustic music and transitions into the envelope.

2. **Scene Two: The Animated Handcrafted Envelope & Letter**
   - Powder-blue envelope with gold wax monogram seal (`UP`).
   - 3D envelope flap opens (`rotateX(-180deg)`), lifting the handcrafted ivory letter card upward.
   - Handwritten heading: *"You're invited!"* with delicate blue heart outlines.
   - Personalized letter body:
     > *"Dear Friends and Family,*  
     > *As we get ready to say 'I do,' we feel grateful for the wonderful people in our lives.*  
     > *Your support means the world to us, and we would be honored to have you with us as we begin our life together.*  
     > *With love,*  
     > *Uday & Priti"*
   - Smooth button to *"View Wedding Details"*.

3. **Scene Three: Wedding Details & Interactive Scratch-Off Countdown**
   - **Interactive Scratch-Off Cards**: The wedding date banner and the 4 countdown cards (Days, Hours, Minutes, Seconds) are covered in a realistic metallic gold scratch foil layer.
   - **Tactile Scratching & Reveal**: Guests can use their mouse or touch finger to scratch away the gold foil in real time. Once ~35% is scratched or on clicking "Reveal", the remaining foil dissolves with a gold sparkle burst.
   - **Calendar Integration**: One-click *"Add to Google Calendar"* and *"Download .ICS (Apple & Outlook)"*.
   - **Ceremonies & Itinerary Timeline**:
     - *Haldi Ceremony* (Nov 23, 2026 at 10:00 AM) — Sunshine Courtyard & Olive Grove
     - *Mehendi Soirée* (Nov 24, 2026 at 11:30 AM) — Lakeside Blossom Gazebo
     - *Sangeet & Celebration* (Nov 24, 2026 at 7:00 PM) — Grand Starlight Amphitheater
     - *The Wedding Ceremony (Pheras)* (Nov 25, 2026 at 5:00 PM) — Waterside Mandap & Arch of Roses
     - *The Grand Reception Dinner* (Nov 26, 2026 at 7:30 PM) — Crystal Pavilion & Promenade
   - **Venue Showcase**: Villa del Lago & Botanical Gardens, travel details, and functional *"Get Directions"* Google Maps link.
   - **Editorial Photo Gallery**: High-res portraits & wedding stationery with interactive lightbox modal (zoom, previous/next, captions).
   - **Romantic Music Player**: Floating audio disc in the top corner powered by a custom Web Audio API acoustic piano/strings synthesizer (plays romantic Canon-in-D style arpeggios on user interaction) and supports uploaded audio tracks.

---

## 🛠️ Technology Stack

- React 18, Vite 6, TypeScript
- Tailwind CSS with custom European watercolor palette (`wed-blue`, `wed-ivory`, `wed-sage`, `wed-gold`)
- Framer Motion for 3D gate opening, envelope flap folding, and scene transitions
- Lucide React icons
- Canvas-confetti for celebratory RSVP feedback
- Web Audio API romantic acoustic piano synthesizer
- Browser `localStorage` for persistent offline RSVP storage & admin configurations

---

## 🚀 Running the Project Locally

Run directly from the root directory:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

- **Main Invitation**: `http://localhost:5173/` or `http://localhost:5173/uday-priti`
- **Admin Dashboard**: `http://localhost:5173/admin`
  - **Email**: `admin@wedding.com`
  - **Password**: `weddingadmin123`

---

## 🔐 Admin Dashboard Features (No Backend Needed)

- **Couple & Letter Customization**: Edit names, date, announcement tagline, letter heading, and letter body.
- **Ceremonies & Schedule**: Add, edit, or remove wedding functions.
- **Venue & Directions**: Change venue address, notes, and Google Maps URL.
- **Photo Gallery**: Upload new photos (converted to base64 data URLs) and set custom captions.
- **Interactive Mobile Preview**: Switch between iPhone Mobile Mockup and Desktop view to experience the invitation exactly as guests do.
