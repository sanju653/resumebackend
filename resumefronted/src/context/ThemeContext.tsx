import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

type Theme = "light" | "dark";

type AccentColor = "blue" | "dark" | "green" | "purple";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
      accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>( undefined);
   


export function ThemeProvider({ children}: {children: React.ReactNode}) {

  //children:Whatever we put inside <ThemeProvider>...</ThemeProvider>.children = <App />
    const [theme, setThemeState] = useState<Theme>(() => {
        //Why is there a function inside useState?instead of:
        //useState<Theme>("light");
        //Because we want to check localStorage when the state is initialized.Read theme from localStorage

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }

        return "light";
    });
      const [accentColor, setAccentColorState] =
        useState<AccentColor>(() => {

            const savedAccent =
                localStorage.getItem("accentColor");

            if (
                savedAccent === "blue" ||
                savedAccent === "dark" ||
                savedAccent === "green" ||
                savedAccent === "purple"
            ) {
                return savedAccent;
            }

            return "blue";//if there is no saved value?
        });

  // CHANGE THEME
  ///We already have:setThemeState why we created another fun:setTheme=>ecause we want to do two things when the theme changes.
  //Update React:setThemeState(newTheme);=>only changes react sttate,does not store to localstorage
  //Save it:localStorage.setItem("theme", newTheme);
     const setTheme = (newTheme: Theme) => {

        setThemeState(newTheme);

        localStorage.setItem("theme", newTheme);
    };
     const setAccentColor = (
        newColor: AccentColor
    ) => {

        setAccentColorState(newColor);

        localStorage.setItem(
            "accentColor",
            newColor
        );
    };
 // APPLY THEME TO <html>  Connects React state to the actual HTML:
    useEffect(() => {
        //document.documentElement refers to <html>basically means:

///Add/change the data-theme attribute on the <html> element.
        document.documentElement.setAttribute(
            //Why data-theme= because our CSS is listening for it.i has styles (act as classnmae)
            "data-theme",////That's the connection between React and CSS.
            theme
        );
    }, [theme]);//run whenever theme changes
     // APPLY ACCENT TO <html>
    // -----------------------------

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-accent",
            accentColor
        );

    }, [accentColor]);


    return (
        //the Provider="Make these four things available to all components inside me
        <ThemeContext.Provider value={{ theme, setTheme, accentColor,
                setAccentColor }}>
            {/*Render the application inside this provider. */}
             {children} 
        </ThemeContext.Provider>
    );
}

//We created our own custom hook
export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
}