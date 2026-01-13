# UI நவீனமயமாக்கல் செயல்படுத்தல் திட்டம் (UI Modernization Implementation Plan)

## குறிக்கோள் விளக்கம் (Goal Description)
Fermire திட்டத்தின் முகப்பை (UI) நவீன மற்றும் "பிரீமியம்" (Premium) தோற்றத்திற்கு மாற்றுவதே முக்கிய நோக்கமாகும். மொழி மாற்றம் செய்யப்படாது (ஆங்கிலம் தொடரும்), ஆனால் வடிவமைப்பு மற்றும் வண்ணங்கள் மேம்படுத்தப்படும். புதிய வண்ணத் தட்டு (Color Palette) மற்றும் Tailwind CSS மூலம் இது செய்யப்படும். பழைய CSS கோப்புகள் நீக்கப்படும்.

## முன்மொழியப்பட்ட மாற்றங்கள் (Proposed Changes)

### வடிவமைப்பு அமைப்பு (Design System)
#### [மாற்றம்] [tailwind.config.ts](file:///c:/Users/User/Desktop/Fermire-Project/tailwind.config.ts)
- `theme.extend.colors` இல் "Premium Nature" வண்ணத் தட்டைச் சேர்த்தல்:
  - முதன்மை (Primary): `#0f5132` (அடர்ந்த பச்சை)
  - இரண்டாம் நிலை (Secondary): `#2ecc71` (புதிய பச்சை)
  - சிறப்பு (Accent): `#d4af37` (தங்கம்)
- அனைத்து வண்ணக் குறிப்புகளும் புதிய தட்டுடன் பொருந்துவதை உறுதி செய்தல்.

#### [மாற்றம்] [globals.css](file:///c:/Users/User/Desktop/Fermire-Project/src/app/globals.css)
- பழைய பாணிகளை (Legacy Styles) நீக்குதல்.
- Tailwind வழிமுறைகள் மற்றும் அடிப்படை மீட்டமைப்புகள் (Resets) மட்டுமே இருப்பதை உறுதி செய்தல்.

### கூறுகள் (Components)

#### [மாற்றம்] [Navbar.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Navbar/Navbar.tsx)
- Glassmorphism (கண்ணாடி போன்ற) விளைவைச் செயல்படுத்துதல்.
- Tailwind பயன்பாட்டு வகுப்புகளைப் (Utility Classes) பயன்படுத்தி இடைவெளி மற்றும் அமைப்பை மேம்படுத்துதல்.

#### [மாற்றம்] [Hero.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Hero/Hero.tsx)
- `import './Hero.css'` ஐ நீக்குதல்.
- பின்னணிகள், பொத்தான்கள் மற்றும் தலைப்புகளுக்கு Tailwind வகுப்புகளைப் பயன்படுத்துதல்.
- **[நீக்கு]** `Hero.css`.

#### [மாற்றம்] [Product.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Product/Product.tsx)
- `import './Product.css'` ஐ நீக்குதல்.
- நவீன வடிகட்டி வடிவமைப்பு (Filter Design) மற்றும் கட்ட அமைப்பை (Grid Layout) Tailwind மூலம் செயல்படுத்துதல்.
- தேடல் மற்றும் வடிகட்டி பொத்தான்களின் வடிவமைப்பை மேம்படுத்துதல்.
- **[நீக்கு]** `Product.css`.

#### [மாற்றம்] [Cart.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Cart/Cart.tsx)
- அட்டைகளுக்கு (Cards) நிழல்கள் மற்றும் ஊடாடும் விளைவுகளை (Hover Effects) Tailwind மூலம் மேம்படுத்துதல்.
- **[நீக்கு]** `Cart.css`.

#### [மாற்றம்] [Footer.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Footer/Footer.tsx)
- `import './Footer.css'` ஐ நீக்குதல்.
- "Dark Premium" தோற்றத்தைப் பயன்படுத்துதல்.
- எழுத்துருக்கள் மற்றும் இடைவெளியைச் சரிசெய்தல்.
- **[நீக்கு]** `Footer.css`.

## சரிபார்ப்புத் திட்டம் (Verification Plan)

### தானியங்கி சோதனைகள் (Automated Tests)
- CSS கோப்புகளை நீக்கிய பிறகு, பிழைகள் ஏதுமில்லை என்பதை உறுதிப்படுத்த `npm run build` ஐ இயக்குதல்.

### நேரடிச் சரிபார்ப்பு (Manual Verification)
- பயன்பாட்டைப் பார்வையிட்டு உறுதி செய்தல்:
  - புதிய வண்ணத் தட்டு (அடர்ந்த பச்சை மற்றும் தங்கம்) சரியாகப் பயன்படுத்தப்பட்டுள்ளது.
  - கூறுகள் (Navbar, Hero, Product, Cart, Footer) "பிரீமியம்" தோற்றத்தில் உள்ளன.
  - உடைத்த பாணிகள் (Broken Styles) இல்லை.
- பொத்தான்கள், இணைப்புகள் மற்றும் வடிகட்டிகள் சரியாகச் செயல்படுவதை உறுதி செய்தல்.
