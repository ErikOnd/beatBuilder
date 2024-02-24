"use client"
import {signOut, signIn, useSession} from "next-auth/react";
import Button from "@mui/material/Button";

function AuthButton() {
    const {data: session} = useSession()
    if (session) {
        return (
            <>
                {session?.user?.name} <br/>
                <Button variant="contained" onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export default function NavMenu() {
    return (
        <div>
            <AuthButton/>
        </div>
    )
}