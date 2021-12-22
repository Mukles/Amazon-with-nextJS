import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
type DarkModeState = 'dark' | 'light';

export default function useDarkMode() {
  const [theme, setTheme] = useState<DarkModeState>(Cookies.get('theme'));
  const colorTheme:DarkModeState = theme ==='dark' ? 'light' : 'dark'; //dark
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    Cookies.set("theme", theme);
  }, [theme, colorTheme])
  return [colorTheme, setTheme] as const;
}
