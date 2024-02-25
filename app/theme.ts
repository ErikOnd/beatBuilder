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
        },
        text: {
            primary: '#E6E6E6',
        },
    },
});


theme.typography.h2 = {
    fontWeight: 'bold',
    fontSize:"2rem",

    '@media (max-width:600px)': {

    },

    '@media (min-width:600px)': {
        fontSize: '2rem',
    },
    '@media (min-width:900px)': {
        fontSize: '2rem',
    },
    '@media (min-width:1200px)': {
        fontSize: '3rem',
    },
    '@media (min-width:1536px)': {
        fontSize: '4rem',
    },
}

theme.typography.button = {
    fontWeight: 'bold',

    '@media (max-width:600px)': {
        fontSize:"2rem",
        padding: '1rem 2.5rem',
    },
    '@media (min-width:600px)': {
        fontSize: '2rem',
        padding: '1rem 2.5rem',
    },
    '@media (min-width:900px)': {
        fontSize: '2rem',
    },
    '@media (min-width:1200px)': {
        fontSize: '3rem',
    },
    '@media (min-width:1536px)': {
        fontSize: '4rem',
    },
}




export default theme;