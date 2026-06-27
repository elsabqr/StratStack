export const WALLPAPER_SECTIONS = [
  { id: "counter-strike", title: "Counter-Strike" },
];

export const WALLPAPERS = [
  {
    id: "ak47-fire-serpent",
    category: "counter-strike",
    label: "AK47 Fire Serpent",
    url: "/wallpapers/AK47-Fire-Serpent.png",
  },
  {
    id: "ancient",
    category: "counter-strike",
    label: "Ancient",
    url: "/wallpapers/Ancient.png",
  },
  {
    id: "chilling-on-inferno",
    category: "counter-strike",
    label: "Chilling on Inferno",
    url: "/wallpapers/Chilling-on-Inferno.png",
  },
  {
    id: "cs-creation",
    category: "counter-strike",
    label: "CS Creation",
    url: "/wallpapers/CS-Creation.png",
  },
  {
    id: "flipknife-marblefade",
    category: "counter-strike",
    label: "Flip Knife Marble Fade",
    url: "/wallpapers/FlipKnife-MarbleFade.jpg",
  },
  {
    id: "ibuypower",
    category: "counter-strike",
    label: "iBuyPower",
    url: "/wallpapers/IbuyPower.jpg",
  },
  {
    id: "inferno",
    category: "counter-strike",
    label: "Inferno",
    url: "/wallpapers/Inferno.png",
  },
  {
    id: "pick-a-map",
    category: "counter-strike",
    label: "Pick a Map",
    url: "/wallpapers/Pick-a-Map.jpg",
  },
  {
    id: "stickers",
    category: "counter-strike",
    label: "Stickers",
    url: "/wallpapers/Stickers.jpg",
  },
  {
    id: "t-vs-ct",
    category: "counter-strike",
    label: "T vs CT",
    url: "/wallpapers/T-vs-CT.jpg",
  },
  {
    id: "the-deagle",
    category: "counter-strike",
    label: "The Deagle",
    url: "/wallpapers/The-Deagle.png",
  },
  {
    id: "vulcan",
    category: "counter-strike",
    label: "Vulcan",
    url: "/wallpapers/Vulcan.png",
  },
];

export function frameStyleFromUrl(url) {
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

export function getWallpaperById(id) {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
}