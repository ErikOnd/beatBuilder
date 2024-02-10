"use client"
import MusicList from "@/app/api/auth/spotify/MusicList";
import {useState} from "react";
import {Session} from "../types/session";

type PromptCreatorProps = {
    session: Session;
};

export default function PromptCreator({session}:PromptCreatorProps) {

    const userPrompt = "Return me an array of fitness motivation songs. Take your cue from artists like Neffex and include artists which are similar. 3 Songs should be included."
    const [playlistLink, setplaylistLink] = useState<string | null>(null)
    const handleSubmit = async () => {
        try {
            const response = await fetch('api/openai/getSongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: userPrompt}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const songArray = await response.json();
            console.log("songArray:", songArray)

            setplaylistLink(await MusicList({session: session, songArray: songArray}))


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log("playlistLink:", playlistLink)

    return (
        <div>
            {
                session && (
                    <>
                        <button onClick={handleSubmit}>Create my Playlist</button>
                        <p>Your Playlist:
                            {playlistLink && (<a href={playlistLink} target="_blank">Click here</a>)}
                        </p>
                    </>
                )
            }
        </div>
    );
}
