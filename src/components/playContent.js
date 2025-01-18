import React from "react";
import { extractYoutubeId, getPlaceholderImageUrl } from "../utils/youtubeHelpers";
import { svgIcons } from "./svgIcons";

const PlayContent = ({
    url,
    quality = "maxresdefault",
    playButtonSize,
    playButtonStyle = 0,
    color,
    textColor,
    svgContent,
}) => {
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId, quality);

    const svgIcon = svgIcons[playButtonStyle]
        .replace(/{{playBackground}}/g, color)
        .replace(/{{playIcon}}/g, textColor);

    return (
        <>
            <button className="play-button" data-youtube-id={youtubeId}>
                <div
                    className="play-icon-wrap play-icon-custom"
                    style={{
                        width: playButtonSize,
                        height: playButtonSize,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: svgContent || svgIcon, // Use svgContent if available, fallback to svgIcon
                    }}
                />
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
