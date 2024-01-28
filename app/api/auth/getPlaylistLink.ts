

export default async function getPlaylistLink(accessToken: string, playlistId: string){

    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;
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
        return data.external_urls.spotify
    } catch (error) {
        console.error('Error getting song: ', error);
    }
}