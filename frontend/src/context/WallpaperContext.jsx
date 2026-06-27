import { createContext, useContext, useEffect, useState } from "react";
import { frameStyleFromUrl, getWallpaperById } from "../data/wallpapers";

const STORAGE_KEY = "chat-wallpaper-id";

// 1. Initialize and export the Context directly in this file
export const WallpaperContext = createContext(null);

function readStoredWallpaperId() {
  const wallpaperId = localStorage.getItem(STORAGE_KEY);
  if (wallpaperId) return wallpaperId;

  // Fallback to your first Counter-Strike wallpaper ID instead of the old sonoma one
  return "ak47-fire-serpent"; 
}

export function WallpaperProvider({ children }) {
  const [wallpaperId, setWallpaperIdState] = useState(readStoredWallpaperId);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, wallpaperId);
  }, [wallpaperId]);

  const wallpaper = getWallpaperById(wallpaperId);

  const setWallpaperId = (id) => {
    setWallpaperIdState(id);
  };

  const frameStyle = frameStyleFromUrl(wallpaper.url);

  return (
    <WallpaperContext.Provider value={{ wallpaperId, setWallpaperId, wallpaper, frameStyle }}>
      {children}
    </WallpaperContext.Provider>
  );
}

// 2. Define and export the custom hook that AuthPage.jsx is begging for
export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
}