import styles from './page.module.css'
import {getServerSession} from "next-auth";
import PromptCreator from "@/app/components/PromptCreator";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Button from '@mui/material/Button'

export default async function Home() {


    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            {
                session?.user?.name ? (
                    <>
                        <div> Hello {session?.user?.name}</div>
                        <Button variant="contained">Hello world</Button>
                        <PromptCreator session={session}/>
                    </>

                ) : (
                    <>
                    </>
                )
            }
        </main>
    )
}
