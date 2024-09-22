import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { create } from "zustand";
import { useTheme } from "@/components/theme-provider";
import { useEffect } from "react";

// Zustand store for managing the current mode
export const useModeToggle = create((set) => ({
  currentMode: "dark",
  setMode: ({mode}:{mode:string}) => set({ currentMode: mode }),  // Setter to update the mode
  toggleMode: () =>
    set(({state}:{state:{currentMode:string}}) => ({
      currentMode: state.currentMode === "dark" ? "light" : "dark",
    })),
  getCurrmode:()=>useModeToggle.getState().currentMode,
}));

export function ModeToggle() {
  const { theme, setTheme } = useTheme(); // From next-themes
  const { currentMode, setMode, toggleMode } = useModeToggle();
  // console.log(currentMode);
  // Sync Zustand with the current theme when component mounts
  useEffect(() => {
    setMode(theme); // Sync Zustand mode with the current theme
  }, [theme, setMode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            setMode("light"); // Sync Zustand mode with theme
          }}
        >
          Light {currentMode === "light" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
            setMode("dark"); // Sync Zustand mode with theme
          }}
        >
          Dark {currentMode === "dark" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
            setMode("system"); // Sync Zustand mode with theme
          }}
        >
          System {currentMode === "system" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
