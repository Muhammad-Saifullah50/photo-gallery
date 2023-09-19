"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon } from 'react-icons/fi'
import { BsSun } from 'react-icons/bs'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button>
      {theme === 'dark'
        ? <BsSun size={25} cursor='pointer' onClick={() => setTheme('light')} />
        : <FiMoon size={25} cursor='pointer' onClick={() => setTheme('dark')} />
      }
    </button>)
}

export default ThemeSwitcher
