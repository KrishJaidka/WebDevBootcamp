import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children}) =>{

    const [ darkTheme , setDarkTheme ] = useState(false);

    return( 
        <ThemeContext.Provider value={{ darkTheme , setDarkTheme }} >
        {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider , useTheme }
