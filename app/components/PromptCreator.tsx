"use client"

import React, {useState, useRef} from 'react';
import MusicList from "@/app/api/spotify/MusicList";
import {Session} from "../types/session";
import {LargeButton} from "@/app/components/CustomComponents";
import Link from "next/link";
import {Alert, CircularProgress} from "@mui/material";
import SpotifyIframe from "@/app/components/SpotifyIframe";
import Box from "@mui/material/Box";

type PromptCreatorProps = {
    session: Session;
};

export type PlaylistData = {
    playlistLink: string | null,
    playlistId: string | null
}

export default function PromptCreator({session}: PromptCreatorProps) {
    const userPrompt = "Return me an array of motivational workout songs. Take your cue from artists like Connor Price include songs from Conner Price and include also music from other artists that are similar. 20 Songs should be included.";
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(undefined);
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [showPlaylistBtn, setShowPlaylistBtn] = useState<boolean>(true)
    const handleSubmit = async () => {
        setShowPlaylistBtn(false)
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
            setTimeout(async () => {
                setPlaylistData(playlistDataResponse);
                setLoading(false);
            }, 2000);
            console.log("playlistData:", playlistData)

        } catch (error) {
            setLoading(false)

            console.error("Error fetching data:", error);
            setError(true)
        }
    };

    return (
        <div>
            {session && (
                <Box height={"70vh"} width={"90vw"} maxHeight={700} maxWidth={1000}>
                    {showPlaylistBtn &&
                        <LargeButton onClick={handleSubmit}>Create my Playlist</LargeButton>
                    }
                        {(playlistData?.playlistLink && playlistData?.playlistId) && (
                            <>
                                Your Playlist:
                                <Link href={playlistData.playlistLink} target="_blank" rel="noopener noreferrer">Click
                                    here</Link>
                                <SpotifyIframe playlistId={playlistData?.playlistId}/>
                            </>

                        )}
                    {error && <Alert severity="error">An error occurred while creating your playlist</Alert>}
                    {loading && <CircularProgress/>}
                </Box>
            )}
        </div>
    );
}
