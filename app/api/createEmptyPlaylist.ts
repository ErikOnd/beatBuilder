
type playlist = {
    name:string;
    description:string;
    public: boolean;
}

export default async function createEmptyPlaylist(accessToken: string, userId: string, playlist: playlist){
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        });

        if (!response.ok) {
            console.error('Error creating playlist')
        }

        return await response.json()
    } catch (error) {
        console.error('Error creating playlist: ', error);
    }
}