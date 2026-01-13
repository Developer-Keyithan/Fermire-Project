# திட்ட நிலை முதன்மை ஆவணம் (Project Status Master Document)

இந்த ஆவணம் **UI நவீனமயமாக்கல் திட்டம்** மற்றும் **முடிக்கப்படாத தள அம்சங்கள்** ஆகிய இரண்டையும் (தமிழில்) ஒருங்கிணைக்கிறது.

---

# பகுதி 1: UI நவீனமயமாக்கல் செயல்படுத்தல் திட்டம் (UI Modernization Implementation Plan)

## குறிக்கோள் விளக்கம்
Fermire திட்டத்தின் முகப்பை (UI) நவீன மற்றும் "பிரீமியம்" (Premium) தோற்றத்திற்கு மாற்றுவதே முக்கிய நோக்கமாகும். மொழி மாற்றம் செய்யப்படாது (ஆங்கிலம் தொடரும்), ஆனால் வடிவமைப்பு மற்றும் வண்ணங்கள் மேம்படுத்தப்படும். புதிய வண்ணத் தட்டு (Color Palette) மற்றும் Tailwind CSS மூலம் இது செய்யப்படும். பழைய CSS கோப்புகள் நீக்கப்படும்.

## முன்மொழியப்பட்ட மாற்றங்கள்

### வடிவமைப்பு அமைப்பு (Design System)
#### [மாற்றம்] [tailwind.config.ts](file:///c:/Users/User/Desktop/Fermire-Project/tailwind.config.ts)
- `theme.extend.colors` இல் "Premium Nature" வண்ணத் தட்டைச் சேர்த்தல்:
  - முதன்மை (Primary): `#0f5132` (அடர்ந்த பச்சை)
  - இரண்டாம் நிலை (Secondary): `#2ecc71` (புதிய பச்சை)
  - சிறப்பு (Accent): `#d4af37` (தங்கம்)

#### [மாற்றம்] [globals.css](file:///c:/Users/User/Desktop/Fermire-Project/src/app/globals.css)
- பழைய பாணிகளை (Legacy Styles) நீக்குதல்.
- Tailwind வழிமுறைகள் மற்றும் அடிப்படை மீட்டமைப்புகள் (Resets) மட்டுமே இருப்பதை உறுதி செய்தல்.

### கூறுகள் (Components)

#### [மாற்றம்] [Navbar.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Navbar/Navbar.tsx)
- Glassmorphism (கண்ணாடி போன்ற) விளைவைச் செயல்படுத்துதல்.
- Tailwind பயன்பாட்டு வகுப்புகளைப் (Utility Classes) பயன்படுத்தி இடைவெளி மற்றும் அமைப்பை மேம்படுத்துதல்.

#### [மாற்றம்] [Hero.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Hero/Hero.tsx)
- `Hero.css` ஐ நீக்குதல் மற்றும் Tailwind வகுப்புகளைப் பயன்படுத்துதல்.

#### [மாற்றம்] [Product.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Product/Product.tsx)
- `Product.css` ஐ நீக்குதல்.
- நவீன வடிகட்டி வடிவமைப்பு மற்றும் கட்ட அமைப்பை (Grid Layout) Tailwind மூலம் செயல்படுத்துதல்.

#### [மாற்றம்] [Cart.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Cart/Cart.tsx)
- அட்டைகளுக்கு (Cards) நிழல்கள் மற்றும் ஊடாடும் விளைவுகளை (Hover Effects) சேர்த்தல்.
- `Cart.css` ஐ நீக்குதல்.

#### [மாற்றம்] [Footer.tsx](file:///c:/Users/User/Desktop/Fermire-Project/src/app/Components/Footer/Footer.tsx)
- `Footer.css` ஐ நீக்குதல்.
- "Dark Premium" தோற்றத்தைப் பயன்படுத்துதல்.

---

# பகுதி 2: முடிக்கப்படாத தள அம்சங்கள் (Unfinished Platform Features)

இயங்குதளத்தில் (Platform) பின்வரும் முக்கிய செயல்பாடுகள் இன்னும் முழுமையாக செயல்படுத்தப்படவில்லை:

## 1. தேடல் மற்றும் வடிகட்டுதல் (Search & Filtering)
- [ ] **தேடல் பட்டி (Search Bar):** `SearchBar` கூறு `/products?search=...` URL-க்கு அனுப்பினாலும், பொருட்கள் பக்கத்தில் தேடல் வார்த்தையைப் படித்து முடிவுகள் வடிகட்டப்படுவதில்லை.
- [ ] **உள் தேடல் (Inner Search):** `Product.tsx` இல் உள்ள தேடல் படிவம் செயல்படவில்லை.
- [ ] **வகை வடிகட்டி (Category Filter):** காய்கறிகள், பழங்கள் போன்ற பொத்தான்கள் காட்சிக்கு மட்டுமே உள்ளன; கிளிக் செய்தால் வடிகட்டப்படாது.
- [ ] **விலை வரம்பு (Price Range):** விலை வரம்பு ஸ்லைடர் (Slider) விலையின் அடிப்படையில் பொருட்களை வடிகட்டாது.

## 2. பயனர் அங்கீகாரம் மற்றும் சுயவிவரம் (Authentication & Profile)
- [ ] **கடவுச்சொல் மீட்பு (Password Recovery):** "கடவுச்சொல்லை மறந்துவிட்டீர்கள்" (Forgot Password) பக்கம் மற்றும் மின்னஞ்சல் வசதி இல்லை.
- [ ] **கடவுச்சொல் மாற்றம் (Change Password):** பயனர் சுயவிவரப் (Profile) பக்கத்தில் கடவுச்சொல்லை மாற்றுவதற்கான வசதி இல்லை.

## 3. பயனர் அனுபவம் மற்றும் அம்சங்கள் (User Experience & Features)
- [ ] **விருப்பப் பட்டியல் (Wishlist):** பொருட்களைப் பின்னர் வாங்குவதற்காக சேமித்து வைக்கும் "விருப்பப் பட்டியல்" வசதி இல்லை.
- [ ] **ஆர்டர் அறிவிப்புகள் (Notifications):** ஆர்டர் உறுதிப்படுத்தப்பட்டதற்கான மின்னஞ்சல் அல்லது SMS அனுப்பும் அமைப்பு இல்லை.
- [ ] **ஆர்டர் கண்காணிப்பு (Order Tracking):** ஆர்டர் எங்கு உள்ளது (Shipping Status) என்பதைப் பார்க்கும் வசதி இல்லை.

## 4. பின்தள ஒருங்கிணைப்பு (Backend Integration)
- [ ] **API வடிகட்டுதல்:** `/api/product` அனைத்துப் பொருட்களையும் அனுப்புகிறதே தவிர, தேடல் அல்லது வடிகட்டுதல் அளவுருக்களை கையாள்வதில்லை.
