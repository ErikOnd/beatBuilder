"use client"
import {signOut, signIn, useSession} from "next-auth/react";
import {LargeButton} from "@/app/components/CustomComponents";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AuthButton() {

    const {data: session} = useSession()
    if (session) {
        return (
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Button variant={"contained"} onClick={() => signOut()}>Sign out</Button>
            </Box>
        );
    }
    const signInWithSpotify = () => signIn('spotify', { callbackUrl: 'http://localhost:3000/' });

    return (
        <>
            <LargeButton onClick={signInWithSpotify}>Sign in with Spotify</LargeButton>
        </>
    )
}

