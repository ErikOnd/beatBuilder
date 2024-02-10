"use client"
import {signOut, signIn, useSession} from "next-auth/react";

function AuthButton() {
    const {data: session} = useSession()
    if (session) {
        return (
            <>
                {session?.user?.name} <br/>
                <button onClick={() => signOut()}>Sign out</button>
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