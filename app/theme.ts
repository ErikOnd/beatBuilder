'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#E6E6E6',
            contrastText: '#373737',
        },
        secondary: {
            main: '#EF9A9A',
        },
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#FFA000',
        },
        info: {
            main: '#7986CB',
        },
        success: {
            main: '#388E3C',
        },
        background: {
            default: '#373737',
            paper: '#424242',
        },
        text: {
            primary: '#E6E6E6',
            secondary: '#FFF59D',
        },
    },
    // Additional theme customizations can go here
});

export default theme;