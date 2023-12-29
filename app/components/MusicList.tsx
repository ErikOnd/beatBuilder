"use client"
import {useSession} from "next-auth/react";
import getUserId from "@/app/api/getUserId";
import createEmptyPlaylist from "@/app/api/createEmptyPlaylist";
import getSong from "@/app/api/getSong";
import addSongs from "@/app/api/addSongs";

export default function MusicList() {
    const {data: session} = useSession();
    const createPlaylist = async () => {
        if (!session) {
            console.log('No session found');
            return;
        }

        const accessToken = session?.accessToken;

        const playlist = {
            name: "Workout Playlist BeatBuilder",
            description: "Created by BeatBuilder",
            public: false
        }

        const songArray = [
            { artist: '50 Cent', song: 'In Da Club' },
            { artist: 'Travis Scott', song: 'SICKO MODE' },
            { artist: 'Nipsey Hussle', song: 'Hussle & Motivate' },
            { artist: 'Kendrick Lamar', song: 'HUMBLE.' },
            { artist: 'Drake', song: 'Nonstop' },
            { artist: 'Meek Mill', song: 'Dreams and Nightmares' },
            { artist: 'Jay Z', song: 'N**gas in Paris' },
            { artist: 'Cardi B', song: 'Bodak Yellow' },
            { artist: 'Travis Scott', song: 'goosebumps' },
            { artist: 'Nipsey Hussle', song: "Last Time That I Checc'd" }
        ]

        if (accessToken) {
            const user = await getUserId(accessToken)
             const userPlaylist = await createEmptyPlaylist(accessToken, user.id, playlist)
            const songUris : string[] = await Promise.all(songArray.map(async (song) => {
                return await getSong(accessToken, song);
            }));
            await addSongs(accessToken, userPlaylist.id, songUris)
        }
    }
    return (
        <div>
            {session?.user?.name ? (
                <div>
                    <div>{session?.user?.name}</div>
                    <button onClick={createPlaylist}>Create Spotify Playlist</button>
                </div>
            ) : (
                <div>Not logged in</div>
            )}
        </div>
    );
}
