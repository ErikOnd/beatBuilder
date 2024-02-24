'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const colors = {
    vibrantBlue: '#0A17A7',
    sparklerOrange: '#FFA500',
    crowdSilhouetteBlack: '#000000',
    highlightSilver: '#C0C0C0',
    concertWhite: '#FFFFFF',
};

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: colors.vibrantBlue,
            contrastText: colors.concertWhite,
        },
        secondary: {
            main: colors.sparklerOrange,
            contrastText: colors.concertWhite,
        },
        error: {
            main: colors.crowdSilhouetteBlack,
        },
        warning: {
            main: colors.highlightSilver,
        },
        info: {
            main: colors.vibrantBlue,
        },
        success: {
            main: colors.sparklerOrange,
        },
        background: {
            default: colors.crowdSilhouetteBlack,
            paper: colors.crowdSilhouetteBlack,
        },
        text: {
            primary: colors.concertWhite,
            secondary: colors.highlightSilver,
        },
    },
});

export default theme;