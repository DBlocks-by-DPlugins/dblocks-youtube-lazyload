// PlayContent.js

import React from "react";
import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import { svgIcons } from "./svgIcons";

const PlayContent = ({ url, quality = 'maxresdefault', playButtonSize, playButtonStyle = 0, color, textColor, customSvgContent }) => {
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId, quality);

    // Use custom SVG if provided, otherwise use the default one
    const svgIcon = customSvgContent || svgIcons[playButtonStyle].replace(/{{playBackground}}/g, color).replace(/{{playIcon}}/g, textColor);

    return (
        <>
            <button className="play-button" data-youtube-id={youtubeId}>
                <div className="play-icon-wrap play-icon-custom"
                    style={{ width: playButtonSize, height: playButtonSize }}
                    dangerouslySetInnerHTML={{ __html: svgIcon }} />
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
