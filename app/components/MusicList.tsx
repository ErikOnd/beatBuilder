import getUserId from "@/app/api/getUserId";
import createEmptyPlaylist from "@/app/api/createEmptyPlaylist";
import getSong from "@/app/api/getSong";
import addSongs from "@/app/api/addSongs";

export async function MusicList({session, songArray}: any) {

    if (!session) {
        console.log('No session found');
        return;
    }

    const accessToken = session?.accessToken;

    const playlist = {
        name: "Neffex Music Playlist BeatBuilder",
        description: "Created by BeatBuilder",
        public: false
    }

    if (accessToken) {
        const user = await getUserId(accessToken)
        console.log("user:", user)

        const userPlaylist = await createEmptyPlaylist(accessToken, user.id, playlist)
        const songUris: string[] = await Promise.all(songArray.map(async (song) => {
            return await getSong(accessToken, song);
        }));
        await addSongs(accessToken, userPlaylist.id, songUris)
        console.log("created playlist!")
    }
}

