🌌 8Bit-Skies (PixelCast)
8Bit-Skies (PixelCast) is a pixel-art inspired, interactive weather dashboard built with Next.js.
It features a cyberpunk cityscape, glowing pixel stars, animated pixel moon, and live weather data—all in a retro 8-bit theme.

Live Weather Search:
Instantly search for any city and get current weather, temperature, humidity, wind, and more.

Pixel-Art UI:
All elements (cards, buttons, backgrounds) are styled in true pixel/8-bit fashion.

Animated Cyberpunk City:
See buildings, pixel people in windows, glowing moon, moving cars, and interactive pixel stars.

Responsive & Accessible:
Works beautifully on desktop and mobile, with keyboard navigation and screen-reader support.

No API keys exposed:
API keys are securely managed via environment variables.

🖥️ Demo
Live demo coming soon!
For now, clone and run locally (see below).

🛠️ Getting Started
1. Clone the repository
```bash
git clone https://github.com/Baranidharanv06/8Bit-Skies.git
cd 8Bit-Skies
```
2. Install dependencies
```bash
npm install
# or
yarn install
```
3. Set up your environment variables
Create a .env.local file in the root directory:

```text
# Example for OpenWeatherMap
WEATHER_API_KEY=your_openweathermap_api_key
```

Note:
Your API key is NOT included in this repo.
Make sure .env.local is in .gitignore (it is, by default).

4. Run the development server
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 in your browser.

🧩 Project Structure
```text
8Bit-Skies/
│
├── components/
│   ├── PixelBackground.jsx        
│   ├── PixelLocationSearch.jsx     
│   └── PixelWeatherCard.jsx       
│
├── pages/
│   ├── api/
│   │   ├── location.js             
│   │   ├── reverse-geocode.js     
│   │   └── weather.js              
│   ├── _app.js                     
│   └── index.js
│
├── public/
│   ├── file.svg                    
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── styles/
│   └── global.css                  
│
├── .gitignore                      
├── README.md                       
├── next-env.d.ts                   
├── next.config.js                  
├── package.json                    
├── package-lock.json               
├── postcss.config.js               
└── ...                            

```
🎮 UI & Design
Pixel-art cyberpunk city with glowing buildings, animated moon, pixel people, and moving cars.
Interactive pixel stars: Hover to see them glow and animate.
Feature cards: Show temperature, humidity, wind, and more, each with pixel borders and retro icons.
Responsive grid: Cards align beautifully on all screen sizes.

💡 Cool Interactive Features
Glowing pixel moon: Hover to see a neon glow
Pixel people in windows: Each window may have a pixel character waving, bobbing, or jumping.
Animated cars: Pixel cars move in both directions on a neon road.
Aurora and fog effects: Subtle animated layers for extra atmosphere.

🛡️ Security
API keys are never exposed in the repo.
All sensitive data is loaded from environment variables.
.env* files are listed in .gitignore by default.

🙌 Credits
Pixel-art UI inspired by classic 8-bit games and cyberpunk cityscapes.
Weather data from OpenWeatherMap.
Built with Next.js, React, and pure CSS.

📄 License
MIT License.
Feel free to fork, remix, and pixelate!

Enjoy the weather, pixel style!

“PixelCast: Where retro pixels meet real-time weather.”
