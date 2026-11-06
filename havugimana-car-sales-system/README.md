# HAVUGIMANA CHIZO FELEX DEV – Car Sales Management System

React + Vite frontend prototype for a car sales business located in Nyamagabe District, Southern Province, Rwanda.

## Features
- Home page and dealership introduction
- Live vehicle inventory search across name, make, model, year, color, type, fuel, transmission, mileage, condition, location and description
- Search results update immediately while typing; all filters can be cleared with one click
- Entire vehicle cards and feature tiles are clickable shortcuts to the relevant details/pages
- Vehicle detail pages with specs and enquiry form
- Vehicle listings and favorites saved in browser local storage and retained after refresh in the same browser
- Inventory syncs between tabs of the same browser when local storage changes
- Uploaded photos are resized/compressed before browser storage to reduce storage use
- Admin login and dashboard
- Admin can add, edit, delete vehicles and change listing status
- Admin can upload a vehicle photo or paste an image URL
- Responsive layout for desktop and mobile
- Dark-blue header and violet accent branding

## Run on Windows
1. Extract this ZIP.
2. Open the `havugimana-car-sales-system` folder in VS Code.
3. Open Terminal and run:

```powershell
npm install
npm run dev
```

4. Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Demo admin login
- Username: `admin`
- Password: `Chizo@2026`

Change these demo credentials in `src/App.jsx` if you are only testing locally.

## Important security and storage notice
This is a frontend-only demonstration. The demo admin password is stored in browser JavaScript and is NOT secure for a real business. Browser local storage can be edited or cleared by visitors, and uploaded images/listings are stored only in the current browser on that device. They do not automatically sync to another phone or computer. A production system needs a backend API, database, server-side password hashing, proper admin authorization, and image storage. Do not use real customer information or rely on this demo login to protect a live business.

## Business details to complete
Before publishing, add the real business phone number, WhatsApp number, email, exact address, and verified vehicle photos/prices. Sample listings and sample images are for demonstration only.

## Updated vehicle inventory and instant search

- Includes 12 starter vehicle listings across Toyota, Hyundai, Nissan, Mercedes-Benz, BMW, Honda and Audi. Starter prices and vehicle details are demonstration data; replace them with verified dealership information before publishing.
- Search updates as the user types and searches across vehicle name, make, model, year, color, type, fuel, transmission, mileage, condition, location and description.
- Partial words are supported (for example `Toy`, `RAV`, `Merce`) and a small typo tolerance is included for longer words.
- Search suggestions show matching cars with thumbnail, year, color and price. Selecting a suggestion opens the vehicle details immediately.
- Existing browser inventory is migrated to `hcfd_cars_v2`; starter cars are merged with older custom listings on first upgrade. Future changes are saved in the same browser's local storage.
- Browser local storage is device/browser-specific and is not a shared online database. Use a secured backend and database for multi-device use and production admin authentication.
