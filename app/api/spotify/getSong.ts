type song = {
    song: string,
    artist: string
}


export default async function getSong(accessToken: string, song:song){

    const endpoint = `https://api.spotify.com/v1/search?q=${song.song}artist:${song.artist}&type=track&limit=1`;
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Error getting song')
        }

        const data = await response.json();
        return data.tracks.items[0].uri;
    } catch (error) {
        console.error('Error getting song: ', error);
    }
}