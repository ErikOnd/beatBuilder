export default async function getUserId(accessToken: string){

    const endpoint = `https://api.spotify.com/v1/me`;
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Error getting user id')
        }

        return await response.json()
    } catch (error) {
        console.error('Error getting user id: ', error);
    }

}