"use client"
import {MusicList} from "@/app/components/MusicList";
import {useState} from "react";

export default function PromptCreator({session}) {
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
            setplaylistLink(await MusicList({session: session, songArray: songArray}))


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
console.log("playlistLink:", playlistLink)

    return (
        <div>
            <button onClick={handleSubmit}>Send to server</button>
            <p>Your Playlist:
                {playlistLink && (<a href={playlistLink} target="_blank">Click here</a>)}
            </p>
        </div>
    );
}
