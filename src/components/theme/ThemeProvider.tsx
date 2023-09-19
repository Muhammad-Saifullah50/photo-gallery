"use client"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react";

export const MyThemeProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) { // if component is not mounted , returning children
        return <>{children}</>;
    }
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>)

}
