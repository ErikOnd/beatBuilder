
export default async function addSongs(accessToken: string, playlistId: string, songs: string[]){

    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"uris":songs}
            )
        });

        if (!response.ok) {
            console.error('Error adding song to playlist')
        }
        return await response.json()
    } catch (error) {
        console.error('Error adding song to playlist: ', error);
    }
}