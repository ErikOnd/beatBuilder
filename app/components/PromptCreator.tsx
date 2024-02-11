"use client"

import React, { useState, useRef } from 'react';
import MusicList from "@/app/api/spotify/MusicList";
import { Session } from "../types/session";

type PromptCreatorProps = {
    session: Session;
};

export type PlaylistData = {
    playlistLink: string | null,
    playlistId: string | null
}

export default function PromptCreator({ session }: PromptCreatorProps) {
    const userPrompt = "Return me an array of fitness motivation songs. Take your cue from artists like Neffex and include artists which are similar. 3 Songs should be included.";
    const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

            // Update iframe src here after state update
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
                    <button onClick={handleSubmit}>Create my Playlist</button>
                    <p>Your Playlist:
                        {playlistData?.playlistLink && (<a href={playlistData.playlistLink} target="_blank" rel="noopener noreferrer">Click here</a>)}
                    </p>
                    <iframe ref={iframeRef} className="border-radius-12px" style={{borderRadius: '12px'}} width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </>
            )}
        </div>
    );
}
