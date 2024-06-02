// PlayContent.js

import React from "react";
import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import { svgIcons } from "./svgIcons";

const PlayContent = ({ url, quality = 'maxresdefault', playButtonSize, playButtonStyle = 0 }) => {
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId, quality);

    return (
        <>
            <button className="play-button" data-youtube-id={youtubeId}>
                <div className="play-icon-wrap" style={{ width: playButtonSize, height: playButtonSize }}
                    dangerouslySetInnerHTML={{ __html: svgIcons[playButtonStyle] }} />
            </button>
            <img
                src={placeholderImageUrl}
                alt="YouTube Video Placeholder"
                className="youtube-placeholder-image"
            />
        </>
    );
};

export default PlayContent;
