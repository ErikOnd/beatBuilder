// Import statements organized by source
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const spotifyProvider = SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    authorization: {
        params: {
            scope: 'playlist-modify-private', // Define required Spotify scopes
        },
    },
});

const callbacks = {
    async jwt({ token, account }) {
        if (account) {
            token.accessToken = account.access_token;
        }
        return token;
    },

    async session({ session, token }) {
        if (token.accessToken) {
            session.accessToken = token.accessToken;
        }
        return session;
    },
};

export const authOptions = {
    providers: [
        spotifyProvider,
    ],
    callbacks,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
