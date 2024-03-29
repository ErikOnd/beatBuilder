import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {getServerSession} from "next-auth";
import SessionProvider from "./components/SessionProvider";
import theme from "@/app/theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';



const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await getServerSession();
    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    )
}
