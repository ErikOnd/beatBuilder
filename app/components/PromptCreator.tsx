"use client"

import React, {useState, useRef} from 'react';
import MusicList from "@/app/api/spotify/MusicList";
import {Session} from "../types/session";
import {LargeButton} from "@/app/components/CustomComponents";
import Link from "next/link";
import {Alert, CircularProgress} from "@mui/material";
import {SpotifyEmbed} from "spotify-embed";

type PromptCreatorProps = {
    session: Session;
};

export type PlaylistData = {
    playlistLink: string | null,
    playlistId: string | null
}

export default function PromptCreator({session}: PromptCreatorProps) {
    const userPrompt = "Return me an array of fitness motivation songs. Take your cue from artists like  Michael Jackson and include artists which are similar. 10 Songs should be included.";
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(undefined);
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async () => {
        setLoading(true)
        setError(false)
        try {
            const response = await fetch('api/openai/getSongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: userPrompt}),
            });

            if (!response.ok) {
                setLoading(false)
                setError(true)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const songArray = await response.json();
            const playlistDataResponse = await MusicList({session: session, songArray: songArray});
            setPlaylistData(playlistDataResponse);
            setLoading(false)
        } catch (error) {
            setLoading(false)

            console.error("Error fetching data:", error);
            setError(true)
        }
    };

    return (
        <div>
            {session && (
                <>
                    <LargeButton onClick={handleSubmit}>Create my Playlist</LargeButton>
                    <p>Your Playlist:
                        {playlistData?.playlistLink && (
                            <Link href={playlistData.playlistLink} target="_blank" rel="noopener noreferrer">Click
                                here</Link>)}
                    </p>
                    {error && <Alert severity="error">An error occurred while creating your playlist</Alert>}
                    {loading && <CircularProgress/>}
                </>
            )}
        </div>
    );
}
