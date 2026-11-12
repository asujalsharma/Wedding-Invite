# Royal Indian Animated Wedding Invitation Website — Uday & Preeti

A luxury digital wedding invitation website inspired by royal Indian Hindu wedding traditions and bespoke wedding stationery (*Kankotri*), created for **Uday & Preeti** celebrating their wedding on **November 25, 2026**.

**Pure Frontend Application**: No backend server or external database is required. Everything runs directly in the browser with persistent local storage for RSVPs and admin customization.

---

## 🌟 Visual & Cinematic Experience Flow

1. **Scene One: The Romantic "Save the Date" Landscape Announcement**
   - Ornate European stone arch framing the calm turquoise waters of Lake Como / Lake Valley reflecting distant mountain peaks.
   - Romantic garden terrace with classical white stone balustrade and climbing white florals.
   - Elegant cursive names: **Uday & Preeti**, subtitle *"cordially invite you to celebrate their auspicious wedding union"*, and date *"Wednesday, November 25, 2026"*.
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
     > *Uday & Preeti"*
   - Smooth button to *"View Wedding Details"*.

3. **Scene Three: Wedding Details & Interactive Scratch-Off Countdown**
   - **Interactive Scratch-Off Cards**: The wedding date banner and the 4 countdown cards (Days, Hours, Minutes, Seconds) are covered in a realistic metallic gold scratch foil layer.
   - **Tactile Scratching & Reveal**: Guests can use their mouse or touch finger to scratch away the gold foil in real time. Once ~35% is scratched or on clicking "Reveal", the remaining foil dissolves with a gold sparkle burst.
   - **Calendar Integration**: One-click *"Add to Google Calendar"* and *"Download .ICS (Apple & Outlook)"*.
   - **Ceremonies & Itinerary Timeline**:
     - *Mandap Ceremony* (Nov 23, 2026) — Residence Courtyard
     - *Tika & Wedding Ceremony (Panigrahan Sanskar)* (Nov 25, 2026) — Shri Radhey Paradise Marriage Garden
     - *Blessings & Dinner Reception (Aashirwad & Preetibhoj)* (Nov 25, 2026) — Shri Radhey Paradise Marriage Garden
     - *Vadhu Aagman (Griha Pravesh)* (Nov 26, 2026) — Residence Courtyard
   - **Venue Showcase**: Shri Radhey Paradise Marriage Garden, Gwalior, travel details, Baraat note, and functional *"Get Directions"* Google Maps link.
   - **Editorial Photo Gallery**: High-res portraits & wedding ceremonies with interactive lightbox modal (zoom, previous/next, captions).
   - **Auspicious Music Player**: Floating audio disc in the top corner powered by a custom Web Audio API synthesizer playing sacred Raag Bhupali Santoor/Sitar arpeggios on user interaction.

---

## 🛠️ Technology Stack

- React 18, Vite 6, TypeScript
- Tailwind CSS with custom Royal Indian palette
- Framer Motion for 3D envelope flap folding and scene transitions
- Lucide React icons
- Canvas-confetti for celebratory feedback
- Web Audio API sacred Raag synthesizer
- Browser `localStorage` for persistent offline storage & admin configurations

---

## 🚀 Running the Project Locally

Run directly from the root directory:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

- **Main Invitation**: `http://localhost:5173/` or `http://localhost:5173/uday-preeti`
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
