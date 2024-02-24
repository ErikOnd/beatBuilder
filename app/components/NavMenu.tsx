"use client"
import {signOut, signIn, useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import { CustomTypography, CustomButton } from './CustomComponents';

function AuthButton() {

    const {data: session} = useSession()
    if (session) {
        return (
            <>
                <CustomButton variant="outlined" onClick={() => signOut()}>Sign out</CustomButton>
            </>
        );
    }
    return (
        <>
            <CustomButton onClick={() => signIn()}>Sign in</CustomButton>
        </>
    )
}

export default function NavMenu() {
    return (
        <Box paddingX={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
            <CustomTypography>Deine Playlist, dein Stil</CustomTypography>
            <CustomTypography mb={10}>Mit Spotify anmelden und starten!</CustomTypography>
            <AuthButton/>
        </Box>
    )
}