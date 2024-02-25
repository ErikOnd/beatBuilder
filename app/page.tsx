import styles from './page.module.css'
import {getServerSession} from "next-auth";
import PromptCreator from "@/app/components/PromptCreator";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AuthButton from "@/app/components/AuthButton";
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';


export default async function Home() {


    const session = await getServerSession(authOptions);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
            {
                session?.user?.name ? (
                    <>
                        <PromptCreator session={session}/>
                        <AuthButton />
                    </>

                ) : (
                    <>
                        <Typography variant="h2" textAlign="center">Deine Playlist, dein Stil</Typography>
                        <Typography variant="h2" textAlign="center" mb={10}>Bei Spotify anmelden und starten!</Typography>
                        <AuthButton />
                    </>
                )
            }
        </Box>
    )
}

//https://developer.spotify.com/documentation/web-api/reference/search
// get artist and song info