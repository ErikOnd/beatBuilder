import React from 'react';
import Box from '@mui/material/Box'; // Import Box component from MUI

interface SpotifyIframeProps {
    playlistId: string;
}

const SpotifyIframe: React.FC<SpotifyIframeProps> = ({ playlistId }) => {
    return (
            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
                width="100%"
                height="100%"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{
                    border: '0',
                }}
            ></iframe>
    );
};

export default SpotifyIframe;
