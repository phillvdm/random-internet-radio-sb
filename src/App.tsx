import React, { useState, useEffect } from 'react'
import { Radio } from 'lucide-react'

interface RadioStation {
  name: string;
  city: string;
  country: string;
  url: string;
  streamUrl: string;
}

const radioStations: RadioStation[] = [
  { name: "Worldwide FM", city: "London", country: "United Kingdom", url: "https://worldwidefm.net/", streamUrl: "https://worldwidefm.out.airtime.pro/worldwidefm_b" },
  { name: "NTS", city: "London", country: "United Kingdom", url: "https://www.nts.live/", streamUrl: "https://stream-relay-geo.ntslive.net/stream" },
  { name: "dublab", city: "Los Angeles", country: "United States", url: "https://www.dublab.com/", streamUrl: "https://dublab.out.airtime.pro/dublab_a" },
  { name: "Kiosk Radio", city: "Brussels", country: "Belgium", url: "https://kioskradio.com/", streamUrl: "https://kioskradiobxl.out.airtime.pro/kioskradiobxl_b" },
  { name: "Radio Raheem", city: "Milan", country: "Italy", url: "https://www.radioraheem.it/", streamUrl: "https://radioraheem.out.airtime.pro/radioraheem_a" }
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [audio] = useState(new Audio());

  const toggleRadio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setCurrentStation(null);
    } else {
      const randomStation = radioStations[Math.floor(Math.random() * radioStations.length)];
      audio.src = randomStation.streamUrl;
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        alert("Failed to play the station. Please try again or choose another station.");
      });
      setIsPlaying(true);
      setCurrentStation(randomStation);
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Random Radio Player</h1>
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full ${isPlaying ? 'animate-color-pulse' : ''}`}></div>
        <button
          onClick={toggleRadio}
          className={`
            relative z-10
            flex items-center justify-center
            w-64 h-64 rounded-full
            bg-black
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            ${isPlaying ? 'animate-spin-slow' : 'hover:scale-105'}
          `}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-800"></div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-gray-800 to-gray-900"></div>
          <div className="absolute inset-8 rounded-full bg-black flex items-center justify-center">
            <Radio size={64} className="text-white" />
          </div>
        </button>
      </div>
      {currentStation && (
        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-white flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full animate-pulse">
              LIVE
            </span>
            {currentStation.name}
          </p>
          <p className="text-lg text-white mt-2">
            {currentStation.city} | {currentStation.country}
          </p>
        </div>
      )}
    </div>
  )
}

export default App