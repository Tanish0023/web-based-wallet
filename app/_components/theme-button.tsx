"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {Moon, Sun} from "lucide-react"
import { useTheme } from "next-themes";

const ThemeButton = () => {
    const { setTheme, theme } = useTheme()
    const [themeButton, setThemeButton] = useState("dark");
    // setThemeButton(theme || "dark")

    const changeTheme = () => {
        if (themeButton === "dark") {
        setTheme("light");
        setThemeButton("light"); 
        } else {
        setTheme("dark");
        setThemeButton("dark");
        }
    };

    return ( 
        <Button onClick={changeTheme} variant={"secondary"} size={"lg"}>
            {themeButton === "dark" ? <Moon/> : <Sun/>}
        </Button>
     );
}
 
export default ThemeButton;