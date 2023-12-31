import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'playlist-modify-private',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token as JWT & { accessToken: string };
        },
        async session({ session, token }) {
            session.accessToken = (token as JWT & { accessToken: string }).accessToken;
            return session as Session & { accessToken: string };
        },
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
