"use client"
import {signOut, signIn, useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

function AuthButton() {

    const {data: session} = useSession()
    if (session) {
        return (
            <>
                <Button variant="contained" onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }
    return (
        <>
            <Button variant="contained" onClick={() => signIn()}>Sign in</Button>
        </>
    )
}

export default function WelcomePage() {
    return (
        <Box paddingX={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center"
             height="100vh">
            <Typography variant="h2" textAlign="center">Deine Playlist, dein Stil</Typography>
            <Typography variant="h2" textAlign="center" mb={10}>Mit Spotify anmelden und starten!</Typography>
            <AuthButton/>
        </Box>
    )
}