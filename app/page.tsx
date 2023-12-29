import styles from './page.module.css'
import {getServerSession} from "next-auth";
import MusicList from "@/app/components/MusicList";

export default async function Home() {

  const session = await getServerSession();

  return (
    <main className={styles.main}>
      getServerSession Result
      {
        session?.user?.name ? (
            <div>{session?.user?.name}</div>
        ):(
            <div>Not logged in</div>
        )
      }
      <MusicList />
    </main>
  )
}
