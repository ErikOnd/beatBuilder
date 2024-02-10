import getUserId from "@/app/api/spotify/getUserId";
import createEmptyPlaylist from "@/app/api/spotify/createEmptyPlaylist";
import getSong from "@/app/api/spotify/getSong";
import addSongs from "@/app/api/spotify/addSongs";
import getPlaylistLink from "@/app/api/auth/getPlaylistLink";
import {Session} from "@/app/types/session";
import {SongArray} from "@/app/types/songArray";

type MusicListProps = {
    session: Session,
    songArray: SongArray
}

export default async function MusicList({session, songArray}: MusicListProps) {

    if (!session) {
        console.log('No session found');
        return;
    }

    const accessToken = session?.accessToken;

    const playlist = {
        name: "Music Playlist by Melobrag",
        description: "Created by Melobrag",
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
        return await getPlaylistLink(accessToken, userPlaylist.id)
    }
}

