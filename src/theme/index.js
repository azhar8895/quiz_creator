/**
 * @function Theme
 * @params {jsx} children
 * @returns theme of an applicaion.
 */

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Theme = (props) => {
    const theme = createTheme({
        palette: {
            primary: {
                // light: "yellow",
                main: "#00A89A",
                // dark: "white",
                contrastText: "white",
            },
            secondary: {
                // light: "#ff7961",
                main: "#3a3a45",
                // dark: "white",
                contrastText: "white",
            },
        },
    });
    return (
        <>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </>
    );
};

export default Theme;
