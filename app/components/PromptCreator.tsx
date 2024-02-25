"use client"

import React, { useState, useRef } from 'react';
import MusicList from "@/app/api/spotify/MusicList";
import { Session } from "../types/session";
import {LargeButton} from "@/app/components/CustomComponents";

type PromptCreatorProps = {
    session: Session;
};

export type PlaylistData = {
    playlistLink: string | null,
    playlistId: string | null
}

export default function PromptCreator({ session }: PromptCreatorProps) {
    const userPrompt = "Return me an array of fitness motivation songs. Take your cue from artists like Nickelback and include artists which are similar. 10 Songs should be included.";
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(undefined);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    //make including artist experimental and try same prompt without artist if it wasn't successful

    const handleSubmit = async () => {
        try {
            const response = await fetch('api/openai/getSongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userPrompt }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const songArray = await response.json();
            const playlistDataResponse = await MusicList({ session: session, songArray: songArray });
            setPlaylistData(playlistDataResponse);

            if (playlistDataResponse?.playlistId && iframeRef.current) {
                iframeRef.current.src = `https://open.spotify.com/embed/playlist/${playlistDataResponse.playlistId}?utm_source=generator`;
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            {session && (
                <>
                    <LargeButton onClick={handleSubmit}>Create my Playlist</LargeButton>
                    <p>Your Playlist:
                        {playlistData?.playlistLink && (<a href={playlistData.playlistLink} target="_blank" rel="noopener noreferrer">Click here</a>)}
                    </p>
                    <iframe ref={iframeRef} className="border-radius-12px" style={{borderRadius: '12px'}} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </>
            )}
        </div>
    );
}
